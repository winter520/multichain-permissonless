import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { injected } from '@/connectors'
import {
  ENV_NODE_CONFIG
} from '@/config/constant'
import {
  useWalletAddress
} from "@/state/address/hooks"
// import { useConnectedWallet } from '@terra-money/wallet-provider'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: any } {
  const context = useWeb3ReactCore<Web3Provider>()
  return context
}

export function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore() // 特别是使用useWeb3ReactCore，因为这个钩子的作用
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          setTried(true)
        }
      }
    })
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

/**
 * 用于网络和注入-在检查用户所在的网络后，将用户登录和注销
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate, chainId, account } = useWeb3ReactCore() // 特别是使用useWeb3React，因为这个钩子的作用
  const {setAccount} = useWalletAddress()
  useEffect(() => {
    if (chainId) {
      window.localStorage.setItem(ENV_NODE_CONFIG, chainId.toString())
    }
    setAccount(chainId, account)
  }, [chainId, account])

  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = (chainID:any) => {
        // console.log(chainID)
        // console.log(parseInt(chainID))
        if (chainID) {
          window.localStorage.setItem(ENV_NODE_CONFIG, chainID)
          history.go(0)
        }
        // eat errors
        
        activate(injected, undefined, true).catch(error => {
          console.error('Failed to activate after chain changed', error)
        })
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch(error => {
            console.error('Failed to activate after accounts changed', error)
          })
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, activate])
}
