
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
} from '@/hooks'

export function useActiveReact () {
  const {selectNetworkInfo} = useUserSelectChainId()
  const {account} = useWalletAddress()
  // const {account} = useActiveWeb3React()

  const useChainId = useMemo(() => {
    let chainId = selectNetworkInfo?.chainId
    if (!chainId) {
      chainId = INIT_NODE
    }
    return chainId
  }, [selectNetworkInfo])

  // const useAccount = useMemo(() => {
  //   // if (isNaN(useChainId)) {

  //   //   return getAccount(useChainId)
  //   // } else if (account && !isNaN(useChainId)) {
  //   //   return account
  //   // }
  //   return getAccount(useChainId)
  // }, [useChainId, account])
  // console.log(account)
  return {
    account: account,
    chainId: useChainId,
    library: ''
  }
}