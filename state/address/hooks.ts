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
    // console.log('evmAccount' ,evmAccount)
    if (isNaN(chainId)) {
      if (account?.[chainId]?.address) {
        return account?.[chainId]?.address
      }
    } else {
      return evmAccount
    }
    return undefined
  }, [evmAccount, account])

  const useAccount = useMemo(() => {
    return getAccount(chainId)
  }, [chainId, getAccount])
  
  return {
    setAccount,
    getAccount,
    account: useAccount
  }
}