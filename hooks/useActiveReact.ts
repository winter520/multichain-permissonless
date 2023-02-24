
import {useMemo} from 'react'
import {
  useUserSelectChainId
} from '@/state/user/hooks'
import {
  useWalletAddress
} from '@/state/address/hooks'
import {INIT_NODE} from '@/config/constant'
import {
  useActiveWeb3React
} from './index'

export function useActiveReact () {
  const {selectNetworkInfo} = useUserSelectChainId()
  const {account} = useWalletAddress()
  const {library, chainId} = useActiveWeb3React()
  // console.log(account)
  const useChainId = useMemo(() => {
    let chainId = selectNetworkInfo?.chainId
    if (!chainId) {
      chainId = INIT_NODE
    }
    return chainId
  }, [selectNetworkInfo])

  return useMemo(() => {
    // console.log(library, useChainId, chainId, chainId?.toString() === useChainId?.toString())
    // console.log(library && useChainId && chainId && chainId.toString() === useChainId.toString() ? library : undefined)
    return {
      account: account,
      chainId: useChainId,
      library: library && useChainId && chainId && chainId.toString() === useChainId.toString() ? library : undefined
      // library: library
    }
  }, [account, useChainId, library, chainId])
}