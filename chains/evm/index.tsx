import {useCallback} from "react"

import { isBrowser } from "@/config/constant"

import {
  useBatchData
} from '@/hooks/useBatchData'

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

export function getEvmHashStatus (chainId:any, hash:string):Promise<void> {
  return new Promise(resolve => {
    let data:any = {
      msg: '',
      info: ''
    }
    useBatchData({chainId, calls: [{
      property: 'eth',
      methods: 'getTransactionReceipt',
      input: [hash]
    }]}).then(res => {
      // console.log(res)
      if (res?.returnData) {
        const d = res?.returnData[0]
        if (['0x1', false].includes(d?.status)) {
          data.msg = 'Success'
          data.info = d
        } else if (['0x0', false].includes(d?.status)) {
          data.msg = 'Failure'
        } else {
          data.msg = 'Null'
        }
      } else {
        data = {
          msg: 'Null',
          info: ''
        }
      }
      // console.log(data)
      resolve(data)
    })
  })
}

// getEvmHashStatus('1', '0x28276235a86fd182e3c4666b812b8cabff2e75c36201c043953fb58f7fab99ed')