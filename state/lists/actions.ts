import { createAction } from '@reduxjs/toolkit'

export const usdcList = createAction<{chainId: any, tokenList:any, version: any}>('lists/usdcList')

export const allInitToken = createAction<{chainId: any, token?:any, toChainId?:any, tokenKey?:any}>('lists/allInitToken')

export const updateTokenlistTime = createAction<{}>('lists/updateTokenlistTime')