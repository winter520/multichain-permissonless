import { createReducer } from '@reduxjs/toolkit'
import { usdcList, allInitToken,updateTokenlistTime } from './actions'

// import config from '../../config'

export interface ListsState {
  readonly usdcList: any
  readonly updateTokenlistTime: any
  readonly allInitToken: {
    readonly [chainId: string]: {
      readonly token: string | null
      readonly toChainId: string | null
      readonly tokenKey: string | null
    }
  }
}

// type ListState = ListsState['byUrl'][string]

// const NEW_LIST_STATE: ListState = {
//   error: null,
//   current: null,
//   loadingRequestId: null,
//   pendingUpdate: null
// }

// type Mutable<T> = { -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? U[] : T[P] }

const initialState: ListsState = {
  usdcList: {},
  updateTokenlistTime: '',
  allInitToken: {},
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateTokenlistTime, (state, { payload: {  } }) => {
      state.updateTokenlistTime = Date.now()
    })
    .addCase(usdcList, (state, { payload: { chainId, tokenList, version } }) => {
      // console.log(state)
      if (state?.usdcList) {
        state.usdcList = {
          [chainId]: {tokenList, timestamp: Date.now(), version}
        }
      } else {
        state.usdcList = {
          [chainId]: {tokenList, timestamp: Date.now(), version}
        }
      }
    })
    .addCase(allInitToken, (state, { payload: { chainId, token, toChainId, tokenKey } }) => {
      // console.log(state)
      if (chainId) {
        if (!state.allInitToken) state.allInitToken = {}
        if (!state.allInitToken[chainId]) state.allInitToken[chainId] = {
          token: '',
          toChainId: '',
          tokenKey: '',
        }
        if (token) {
          state.allInitToken[chainId].token = token
        }
        if (toChainId) {
          state.allInitToken[chainId].toChainId = toChainId
        }
        if (tokenKey) {
          state.allInitToken[chainId].tokenKey = tokenKey
        }
      }
    })
)
