import { useCallback } from 'react'
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

export function useWalletAddress () {
  const account:any = useSelector<AppState, AppState['address']>(state => state.address)
  // console.log(account)
  // console.log(chainId)
  const getAccount = useCallback((chainId:ChainId) => {
    if (account?.[chainId]?.address) {
      return account?.[chainId]?.address
    }
    return undefined
  }, [])
  
  return {
    getAccount,
    account
  }
}