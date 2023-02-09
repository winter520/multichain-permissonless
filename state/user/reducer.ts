
import { createReducer } from '@reduxjs/toolkit'
import {
  updateUserExpertMode,
  selectNetwork,
  starChain,
  starToken,
  addTokenToWallet,
  removeTokenToWallet,
  changeStarTab,
  updateInterfaceMode
} from './actions'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  userExpertMode: boolean
  userInterfaceMode: boolean
  timestamp: number
  selectNetwork: any
  starChain: any
  starToken: any
  addTokenToWallet: any
  changeStarTab: any
}


export const initialState: UserState = {
  userExpertMode: false,
  userInterfaceMode: false,
  timestamp: currentTimestamp(),
  selectNetwork: {},
  starChain: {},
  starToken: {},
  addTokenToWallet: '',
  changeStarTab: {},
}

export default createReducer(initialState, builder =>
  builder
    .addCase(addTokenToWallet, (state, { payload: { chainId, tokenInfo} }) => {
      state.addTokenToWallet = {
        chainId,
        ...tokenInfo
      }
    })
    .addCase(changeStarTab, (state, { payload: {type, index} }) => {
      if (!state.changeStarTab) state.changeStarTab = {}
      state.changeStarTab[type] = index
    })
    .addCase(removeTokenToWallet, (state, { payload: {} }) => {
      state.addTokenToWallet = ''
    })
    .addCase(starToken, (state, { payload: { chainId, token} }) => {
      chainId = chainId ? chainId : 'all'
      if (!state.starToken) state.starToken = {}
      if (!state.starToken[chainId]) state.starToken[chainId] = {}
      if (state?.starToken?.[chainId]) {
        if (state?.starToken?.[chainId]?.[token]) {
          delete state.starToken[chainId][token]
        } else {
          state.starToken[chainId] = {
            ...(state.starToken[chainId] ? state.starToken[chainId] : {}),
            [token]: {timestamp: Date.now()}
          }
        }
      } else {
        state.starToken = {
          ...(state?.starToken ? state?.starToken : {}),
          [chainId]: {
            ...(state.starToken[chainId] ? state.starToken[chainId] : {}),
            [token]: {timestamp: Date.now()}
          }
        }
      }
    })
    .addCase(starChain, (state, { payload: { account, chainId} }) => {
      account = account ? account : 'all'
      if (!state.starChain) state.starChain = {}
      if (!state.starChain[account]) state.starChain[account] = {}
      if (state?.starChain?.[account]) {
        if (state?.starChain?.[account]?.[chainId]) {
          delete state.starChain[account][chainId]
        } else {
          state.starChain[account] = {
            ...(state.starChain[account] ? state.starChain[account] : {}),
            [chainId]: {timestamp: Date.now()}
          }
        }
      } else {
        state.starChain = {
          ...(state?.starChain ? state?.starChain : {}),
          [account]: {
            ...(state.starChain[account] ? state.starChain[account] : {}),
            [chainId]: {timestamp: Date.now()}
          }
        }
      }
    })
    .addCase(selectNetwork, (state, { payload: { chainId, label } }) => {
      state.selectNetwork = {
        chainId, label
      }
    })
    .addCase(updateInterfaceMode, (state, action) => {
      state.userInterfaceMode = action.payload.userInterfaceMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserExpertMode, (state, action) => {
      state.userExpertMode = action.payload.userExpertMode
      state.timestamp = currentTimestamp()
    })
)
