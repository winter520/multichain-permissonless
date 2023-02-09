import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@/config/chainConfig/chainId'
export const setAddress = createAction<{ chainId: ChainId, address: string | null }>('address/setAddress')