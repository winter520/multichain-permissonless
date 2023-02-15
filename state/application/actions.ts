import { createAction } from '@reduxjs/toolkit'

export enum ApplicationModal {
  WALLET,
  ACCOUNT,
  NETWORK
}

export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const updateBlockNumber = createAction<{ chainId: string; blockNumber: number }>('application/updateBlockNumber')