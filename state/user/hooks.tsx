import { useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'
import { useActiveReact } from '@/hooks/useActiveReact'

import { AppDispatch, AppState } from '../index'
import {
  updateUserExpertMode,
  selectNetwork,
  starChain,
  starToken,
  addTokenToWallet,
  removeTokenToWallet,
  changeStarTab,
  updateInterfaceMode
} from './actions'

// import config from '@/config'
import { ChainId } from '@/config/chainConfig/chainId'



export function useIsExpertMode(): boolean {
  return useSelector<AppState, AppState['user']['userExpertMode']>(state => state.user.userExpertMode)
}

export function useExpertModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const expertMode = useIsExpertMode()

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
  }, [expertMode, dispatch])

  return [expertMode, toggleSetExpertMode]
}

export function useInterfaceModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userInterfaceMode = useSelector<AppState, AppState['user']['userInterfaceMode']>(state => state.user.userInterfaceMode)

  const toggleSetInterfaceMode = useCallback(() => {
    dispatch(updateInterfaceMode({ userInterfaceMode: !userInterfaceMode }))
  }, [userInterfaceMode, dispatch])

  return [userInterfaceMode, toggleSetInterfaceMode]
}


export function useUserSelectChainId() {
  const dispatch = useDispatch<AppDispatch>()
  const selectNetworkInfo:any = useSelector<AppState, AppState['user']['selectNetwork']>(state => {
    return state.user.selectNetwork
  })

  const setUserSelectNetwork = useCallback(
    ({chainId, label}: {
      chainId: ChainId
      label:any
    }) => {
      dispatch(selectNetwork({chainId, label}))
    },
    [dispatch]
  )

  return {
    selectNetworkInfo,
    chainId: selectNetworkInfo?.chainId,
    label: selectNetworkInfo?.label,
    setUserSelectNetwork
  }
}


export function useStarChain(): any {
  const { account } = useActiveReact()
  const starChainResult = useSelector((state: AppState) => state.user.starChain)
  const dispatch = useDispatch<AppDispatch>()
  const onChangeStarChain = useCallback(
    (chainId: any) => {
      dispatch(starChain({ account, chainId }))
    },
    [dispatch]
  )
    // console.log(starChainResult)
  return {
    // starChainList: account && starChainResult?.[account] ? starChainResult[account] : (starChainResult?.['all'] ? starChainResult['all'] : {}),
    starChainList: account && starChainResult?.[account] ? starChainResult[account] : {},
    onChangeStarChain
  }
}

export function useStarToken(): any {
  const { chainId } = useActiveReact()
  const starTokenResult = useSelector((state: AppState) => state.user.starToken)
  const dispatch = useDispatch<AppDispatch>()
  const onChangeStarToken = useCallback(
    (token: any) => {
      dispatch(starToken({ chainId, token }))
    },
    [dispatch]
  )
    // console.log(starChainResult)
  return {
    starTokenList: chainId && starTokenResult?.[chainId] ? starTokenResult[chainId] : (starTokenResult?.['all'] ? starTokenResult['all'] : {}),
    onChangeStarToken
  }
}

export function useChangeTokenOnWallet(): any {
  // const { chainId } = useActiveReact()
  const addTokenToWalletResult = useSelector((state: AppState) => state.user.addTokenToWallet)
  const dispatch = useDispatch<AppDispatch>()
  const onAddToken = useCallback(
    (chainId:any, tokenInfo: any) => {
      dispatch(addTokenToWallet({ chainId, tokenInfo }))
    },
    [dispatch]
  )
  const onRemoveToken = useCallback(
    () => {
      dispatch(removeTokenToWallet({}))
    },
    [dispatch]
  )
    // console.log(starChainResult)
  return {
    tokeninfo: addTokenToWalletResult,
    onAddToken,
    onRemoveToken
  }
}

export function useChangeStarTab(type:any): any {
  // const { chainId } = useActiveReact()
  const changeStarTabResult = useSelector((state: AppState) => state.user.changeStarTab)
  const dispatch = useDispatch<AppDispatch>()
  const onChangeStarTab = useCallback(
    (index: any) => {
      dispatch(changeStarTab({ type, index }))
    },
    [dispatch]
  )
  return {
    starTabIndex: changeStarTabResult?.[type] || changeStarTabResult?.[type] === 0 ? changeStarTabResult?.[type] : 1,
    onChangeStarTab
  }
}

export function useURLWarningVisible(): boolean {
  return useSelector((state: AppState) => state.user.URLWarningVisible)
}