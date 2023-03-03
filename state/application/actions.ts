import { createAction } from '@reduxjs/toolkit'
export type PopupContent =
  | {
      txn: {
        hash: string
        success: boolean
        summary?: string
      }
    }
  | {
      listUpdate: {
        listUrl: string
        oldList: any
        newList: any
        auto: boolean
      }
    }
export enum ApplicationModal {
  WALLET,
  ACCOUNT,
  NETWORK
}

export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const updateBlockNumber = createAction<{ chainId: number | string; blockNumber: number }>('application/updateBlockNumber')

export const viewTxnsDtils = createAction<{ hash: any, isOpenModal: any }>('application/viewTxnsDtils')
export const viewTxnsErrorTip = createAction<{ errorTip: any, isOpenModal: any }>('application/viewTxnsErrorTip')
export const removePopup = createAction<{ key: string }>('application/removePopup')
export const addPopup = createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>(
  'application/addPopup'
)