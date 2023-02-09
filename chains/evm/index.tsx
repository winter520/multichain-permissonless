import {useCallback} from "react"

import { isBrowser } from "@/config/constant"

export function useLoginEvm () {
  const loginEvm = useCallback((
    walletType?: string,
    type?:string
  ) => {
    if (isBrowser) {
      const {ethereum} = window
      if (ethereum) {
        let evmWallet:any = ethereum
        if (walletType && ethereum?.[walletType]) {
          evmWallet = ethereum?.[walletType]
        }
        evmWallet.request({
          method: "eth_requestAccounts",
        }).then((account:any) => {
          console.log(account)
        }).catch((error:any) => {
          console.log(error)
        })
      } else if (!type) {
        let walletName = 'Metamask'
        let walletLink = 'https://metamask.io/download/'
        if (walletType === 'BinanceChain') {
          walletName = 'BNB Chain'
          walletLink = 'https://www.bnbchain.org/en/wallets'
        }
        if (confirm(`Please install ${walletName} Wallet.`) === true) {
          window.open(walletLink)
        }
      }
    }
  }, [])

  return {loginEvm}
}