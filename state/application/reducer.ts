import { createReducer } from '@reduxjs/toolkit'
import {setOpenModal, ApplicationModal, updateBlockNumber} from '@/state/application/actions'
// import { ChainId } from '@/config/chainConfig/chainId'

export interface ApplicationState {
  readonly openModal: ApplicationModal | null
  readonly blockNumber: { readonly [chainId: string]: number }
}

const initialState: ApplicationState = {
  openModal: null,
  blockNumber: {}
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
)
