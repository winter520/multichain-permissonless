import { createAction } from '@reduxjs/toolkit'

export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateInterfaceMode = createAction<{ userInterfaceMode: boolean }>('user/updateInterfaceMode')

export const selectNetwork = createAction<{ chainId: string, label: string }>('user/selectNetwork')

export const starChain = createAction<{ account: any, chainId: any }>('application/starChain')
export const starToken = createAction<{ chainId: any, token: any }>('application/starToken')
export const addTokenToWallet = createAction<{ chainId: any, tokenInfo: any }>('application/addTokenToWallet')
export const removeTokenToWallet = createAction<{}>('application/removeTokenToWallet')
export const changeStarTab = createAction<{ type: any, index: any }>('application/changeStarTab')