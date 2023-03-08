import { useCallback } from "react";

import {
  useTransactionAdder
} from "@/state/transactions/hooks"
import config from "@/config";

export enum SENDTXTYPE {
  CLAIM,
  SWAP
}

interface SendTractionProps {
  callback: () => Promise<void>,
  type: SENDTXTYPE,
  toChainId?: string
  recipient?: string
  inputAmount?: string
  selectCurrency?: any
  selectDestCurrency?: any
}

export function useSendTraction () {
  const addTransaction = useTransactionAdder()
  // const sendTraction = useCallback((callback: () => Promise<void>) => {
  const sendTraction = useCallback(({
    callback,
    type,
    toChainId,
    recipient,
    inputAmount,
    selectCurrency,
    selectDestCurrency
  }: SendTractionProps) => {
    return new Promise(resolve => {
      // console.log(callback)
      callback().then((res:any) => {
        console.log(res)
        if (type === SENDTXTYPE.CLAIM) {
          addTransaction(res, {
            summary: `Claim  10 ZKR.`,
          })
        } else {
          addTransaction(res, {
            summary: `Cross bridge txns ${inputAmount} ${selectCurrency?.symbol}`,
            value: inputAmount,
            toChainId: toChainId,
            toAddress: recipient?.indexOf('0x') === 0 ? recipient?.toLowerCase() : recipient,
            symbol: selectCurrency?.symbol,
            version: selectDestCurrency?.type,
            routerToken: selectDestCurrency?.router,
            token: selectCurrency?.address,
            logoUrl: selectCurrency?.logoUrl,
            isLiquidity: selectDestCurrency?.isLiquidity,
          })
        }
        resolve({msg: 'Success', info: res})
      }).catch((error:any) => {
        console.log(error)
        resolve({msg: 'Error', error: error})
      })
    })
  }, [addTransaction])

  return {
    sendTraction
  }
}