import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {setOpenModal, ApplicationModal} from '@/state/application/actions'
import { AppDispatch, AppState } from '@/state/index'

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal])
}

export function useCloseModals(): () => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(null)), [dispatch])
}

export function useAccountModalToggle(): () => void {
  return useToggleModal(ApplicationModal.ACCOUNT)
}
export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}
export function useNetworkModalToggle(): () => void {
  return useToggleModal(ApplicationModal.NETWORK)
}