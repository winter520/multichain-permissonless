
import {useMemo} from 'react'
import {
  useUserSelectChainId
} from '@/state/user/hooks'
import {
  useWalletAddress
} from '@/state/address/hooks'
import {INIT_NODE} from '@/config/constant'

export function useActiveReact () {
  const {selectNetworkInfo} = useUserSelectChainId()
  const {getAccount} = useWalletAddress()

  const useChainId = useMemo(() => {
    let chainId = selectNetworkInfo?.chainId
    if (!chainId) {
      chainId = INIT_NODE
    }
    return chainId
  }, [selectNetworkInfo])

  const useAccount = useMemo(() => {
    return getAccount(useChainId)
  }, [useChainId])

  return {
    account: useAccount,
    chainId: useChainId,
    library: ''
  }
}