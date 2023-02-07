import { createAction } from '@reduxjs/toolkit'

export enum ApplicationModal {
  NO_WALLET,
  WALLET,
  SETTINGS,
  SELF_CLAIM,
  ADDRESS_CLAIM,
  CLAIM_POPUP,
  MENU,
  DELEGATE,
  VOTE,
  NETWORK,
  NAV_TOP,
  NAV_BOTTOM,
}

export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')