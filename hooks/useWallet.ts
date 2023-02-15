import {useCallback, useMemo} from 'react'

import { ChainId } from '@/config/chainConfig/chainId'
import config from '@/config'

import {
  useLoginEvm
} from '@/chains/evm'

import {
  useUserSelectChainId,
} from "@/state/user/hooks"

export function useConnectWallet () {
  const connectWallet = useCallback((chainId:ChainId) => {
    const {loginEvm} = useLoginEvm()
    if (chainId === ChainId.TERRA) {
      // if (connect) {
      //   try {
      //     // connect(ConnectType.CHROME_EXTENSION)
      //     if (!account) {
      //       connect(ConnectType.CHROME_EXTENSION)
      //     } else {
      //       toggleWalletModal()
      //       // dispatch(setOpenModal(ApplicationModal.WALLET))
      //     }
      //   } catch (error) {
      //     alert('Please install Terra Station!')
      //   }
      // } else {
      //   alert('Please install Terra Station!')
      // }
    } else if ([ChainId.BTC, ChainId.BTC_TEST].includes(chainId) && config?.chainInfo?.[chainId]?.chainType !== 'NOWALLET') {
      // if (!account) {
      //   loginBtc(chainId)
      // } else {
      //   toggleWalletModal()
      //   // dispatch(setOpenModal(ApplicationModal.WALLET))
      // }
    } else if (chainId === ChainId.NAS) {
      // if (!account) {
      //   loginNas(chainId)
      // } else {
      //   toggleWalletModal()
      //   // dispatch(setOpenModal(ApplicationModal.WALLET))
      // }
    } else if ( [ChainId.NEAR, ChainId.NEAR_TEST].includes(chainId) ) {
      // if (!account) {
      //   login()
      // } else {
      //   toggleWalletModal()
      //   // dispatch(setOpenModal(ApplicationModal.WALLET))
      // }
    } else if ([ChainId.XLM, ChainId.XLM_TEST].includes(chainId)) {
      // if (!account) {
      //   loginXlm()
      // } else {
      //   toggleWalletModal()
      //   // dispatch(setOpenModal(ApplicationModal.WALLET))
      // }
    } else if ([ChainId.TRX, ChainId.TRX_TEST].includes(chainId)) {
      // if (!account) {
      //   loginTrx()
      // } else {
      //   toggleWalletModal()
      // }
    } else if ([ChainId.ADA, ChainId.ADA_TEST].includes(chainId)) {
      // if (!account) {
      //   loginAda()
      // } else {
      //   toggleWalletModal()
      // }
    } else if ([ChainId.FLOW, ChainId.FLOW_TEST].includes(chainId)) {
      // if (!account) {
      //   loginFlow()
      // } else {
      //   toggleWalletModal()
      // }
    } else if ([ChainId.APT, ChainId.APT_TEST].includes(chainId)) {
      // if (!account) {
      //   loginAptos(chainId)
      // } else {
      //   toggleWalletModal()
      // }
    } else if ([ChainId.ATOM_SEI, ChainId.ATOM_SEI_TEST, ChainId.ATOM_DCORE, ChainId.ATOM_DCORE_TEST].includes(chainId)) {
      // if (!account) {
      //   loginAtom(chainId)
      // } else {
      //   toggleWalletModal()
      // }
    } else if ([ChainId.SOL, ChainId.SOL_TEST].includes(chainId)) {
      // if (!account) {
      //   loginSol()
      // } else {
      //   toggleWalletModal()
      // }
    } else if ([ChainId.REEF, ChainId.REEF_TEST].includes(chainId)) {
      // if (!account) {
      //   loginReef(chainId)
      // } else {
      //   toggleWalletModal()
      // }
    } else {
      loginEvm()
      // toggleWalletModal()
    }
  }, [])

  return {
    connectWallet
  }
}

export function useLogoutWallet () {
  const {selectNetworkInfo} = useUserSelectChainId()
  // const {logoutFlow} = useLoginFlow()
  const useChainId = useMemo(() => {
    return selectNetworkInfo?.chainId
  }, [selectNetworkInfo])
  const logoutWallet = useCallback(() => {
    if ([ChainId.FLOW, ChainId.FLOW_TEST].includes(useChainId)) {
      // logoutFlow()
    }
  }, [useChainId])

  const isSupportLogout = useMemo(() => {
    if ([ChainId.FLOW, ChainId.FLOW_TEST].includes(useChainId)) {
      return true
    }
    return false
  }, [useChainId])

  return {
    logoutWallet,
    isSupportLogout
  }
}