import { useCallback, useMemo } from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  AppState,
  AppDispatch
} from '../../state'

import {
  allInitToken,
  // usdcList
} from './actions'

export function useUSDCTokenList(chainId:any): any {
  const usdcList:any = useSelector<AppState, AppState['lists']>(state => state.lists.usdcList)
  // console.log(lists)
  const init = {}
  return useMemo(() => {
    if (!chainId) return init
    const current = usdcList?.[chainId]?.tokenList
    // console.log(current)
    if (!current) return init
    return current
  }, [usdcList, chainId])
}

export function useInitUserSelectCurrency(chainId?: any) {
  const userInit:any = useSelector<AppState, AppState['lists']['allInitToken']>(state => state.lists.allInitToken)
  const dispatch = useDispatch<AppDispatch>()
  const setUserFromSelect = useCallback(({useChainId, token, toChainId, tokenKey}: {useChainId?: any, token?:any, toChainId?:any, tokenKey?:any}) => {
    const id = useChainId
    dispatch(allInitToken({chainId: id, token, toChainId, tokenKey}))
  }, [dispatch])

  const setUserToSelect = useCallback(({useChainId, token, toChainId, tokenKey}: {useChainId?: any, token?:any, toChainId?:any, tokenKey?:any}) => {
    const id = useChainId
    dispatch(allInitToken({chainId: id, token, toChainId, tokenKey}))
  }, [dispatch])

  return {
    userInit: userInit && chainId && userInit[chainId] ? userInit[chainId] : {},
    setUserFromSelect,
    setUserToSelect,
  }
}