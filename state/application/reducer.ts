import { createReducer } from '@reduxjs/toolkit'
import {setOpenModal, ApplicationModal, updateBlockNumber, viewTxnsDtils, viewTxnsErrorTip} from '@/state/application/actions'
// import { ChainId } from '@/config/chainConfig/chainId'

export interface ApplicationState {
  readonly openModal: ApplicationModal | null
  readonly blockNumber: { readonly [chainId: string]: number }
  readonly viewTxnsDtils: any
  readonly viewTxnsErrorTip: any
}

const initialState: ApplicationState = {
  openModal: null,
  blockNumber: {},
  viewTxnsDtils: {
    hash: '',
    isOpenModal: ''
  },
  viewTxnsErrorTip: {
    errorTip: '',
    isOpenModal: ''
  }
}

export default createReducer(initialState, builder =>
  builder
  .addCase(setOpenModal, (state, action) => {
    state.openModal = action.payload
  })
  .addCase(updateBlockNumber, (state, action) => {
    const { chainId, blockNumber } = action.payload
    if (typeof state.blockNumber[chainId] !== 'number') {
      state.blockNumber[chainId] = blockNumber
    } else {
      state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
    }
  })
  .addCase(viewTxnsDtils, (state, { payload: { hash, isOpenModal } }) => {
    state.viewTxnsDtils = {
      hash,
      isOpenModal
    }
  })
  .addCase(viewTxnsErrorTip, (state, { payload: { errorTip, isOpenModal } }) => {
    state.viewTxnsErrorTip = {
      errorTip,
      isOpenModal
    }
  })
)
