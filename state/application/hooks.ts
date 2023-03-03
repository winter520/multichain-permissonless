import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {setOpenModal, ApplicationModal} from '@/state/application/actions'
import { AppDispatch, AppState } from '@/state/index'

import {
  useActiveReact
} from "@/hooks/useActiveReact"

import {
  viewTxnsDtils,
  removePopup,
  addPopup,
  PopupContent
} from './actions'

export function useBlockNumber(initChainId?:any): number | undefined {
  const { chainId } = useActiveReact()
  const useChainId = initChainId ? initChainId : chainId
  // console.log(useChainId)
  return useSelector((state: AppState) => {
    // console.log(state.application)
    return state.application.blockNumber[useChainId ?? -1]
  })
}

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

export function useTxnsDtilOpen(): any {
  const viewTxnsDtilsData = useSelector((state: AppState) => state.application.viewTxnsDtils)
  const dispatch = useDispatch<AppDispatch>()
  const onChangeViewDtil = useCallback(
    (hash: any, isOpenModal: any) => {
      // console.log(field)
      // console.log(typedValue)
      // console.log(typeInput({ field, typedValue }))
      dispatch(viewTxnsDtils({ hash, isOpenModal }))
    },
    [dispatch]
  )

  return {
    ...(viewTxnsDtilsData ? viewTxnsDtilsData : {
      hash: '',
      isOpenModal: ''
    }),
    onChangeViewDtil
  }
}

export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter(item => item.show), [list])
}

export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch]
  )
}
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch()

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }))
    },
    [dispatch]
  )
}