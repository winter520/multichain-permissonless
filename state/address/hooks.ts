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

import { ChainId } from '@/config/chainConfig/chainId'

import {
  useUserSelectChainId
} from "@/state/user/hooks"

export function useWalletAddress () {
  const {chainId} = useUserSelectChainId()
  const account:any = useSelector<AppState, AppState['address']>(state => state.address)
  const dispatch = useDispatch<AppDispatch>()
  // console.log(account)
  // console.log(chainId)
  const setAccount = useCallback((chainId:any, address: any) => {
    dispatch(setAddress({chainId, address}))
  }, [])

  const getAccount = useCallback((chainId:ChainId) => {
    if (account?.[chainId]?.address) {
      return account?.[chainId]?.address
    }
    return undefined
  }, [])

  const useAccount = useMemo(() => {
    return account?.[chainId]?.address
  }, [chainId, account])
  
  return {
    setAccount,
    getAccount,
    account: useAccount
  }
}