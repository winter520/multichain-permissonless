import { createAction } from '@reduxjs/toolkit'

export enum ApplicationModal {
  WALLET,
  ACCOUNT,
  NETWORK
}

export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const updateBlockNumber = createAction<{ chainId: number | string; blockNumber: number }>('application/updateBlockNumber')

export const viewTxnsDtils = createAction<{ hash: any, isOpenModal: any }>('application/viewTxnsDtils')
export const viewTxnsErrorTip = createAction<{ errorTip: any, isOpenModal: any }>('application/viewTxnsErrorTip')