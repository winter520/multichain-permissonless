import { createReducer } from '@reduxjs/toolkit'
import {
  setAddress
} from './actions'

interface AddressStats {
  readonly address: any
}

export const initialState: AddressStats = {
  address: {},
}

export default createReducer<AddressStats>(initialState, builder =>
  builder
    .addCase(setAddress, (state, { payload: { chainId, address} }) => {
      if (!state.address) state.address = {}
      state.address[chainId] = {address}
    })
)
