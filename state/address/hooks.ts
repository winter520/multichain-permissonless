import { useCallback, useMemo } from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  AppState,
  AppDispatch
} from '../../state'
import {setAddress} from './actions'

import {
  useUserSelectChainId
} from "@/state/user/hooks"

import {
  useActiveWeb3React
} from "@/hooks"

export function useWalletAddress () {
  const {chainId} = useUserSelectChainId()
  const {account: evmAccount} = useActiveWeb3React()
  const account:any = useSelector<AppState, AppState['address']>(state => state.address)
  const dispatch = useDispatch<AppDispatch>()
  // console.log(account)
  // console.log(chainId)
  const setAccount = useCallback((chainId:any, address: any) => {
    if (isNaN(chainId)) {
      dispatch(setAddress({chainId, address}))
    }
  }, [])

  const getAccount = useCallback((chainId:any) => {
    if (isNaN(chainId)) {
      if (account?.[chainId]?.address) {
        return account?.[chainId]?.address
      }
    } else {
      return evmAccount
    }
    return undefined
  }, [evmAccount])

  const useAccount = useMemo(() => {
    if (isNaN(chainId)) {
      return account?.[chainId]?.address
    } else {
      return evmAccount
    }
  }, [chainId, account, evmAccount])
  
  return {
    setAccount,
    getAccount,
    account: useAccount
  }
}