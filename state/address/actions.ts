import { createAction } from '@reduxjs/toolkit'
// import { ChainId } from '@/config/chainConfig/chainId'
export const setAddress = createAction<{ chainId: any, address: string | null }>('address/setAddress')