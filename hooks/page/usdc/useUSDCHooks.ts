import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useContract,
  useTokenContract
} from '@/hooks/useContract'
import {
  tryParseAmount
} from '@/utils'
import { MaxUint256 } from '@ethersproject/constants'
import useInterval from "@/hooks/useInterval";

const config_abi = [
  {
    "inputs": [{
      "internalType": "string",
      "name": "_appID",
      "type": "string"
    }, {
      "internalType": "uint256",
      "name": "_toChainID",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_dataLength",
      "type": "uint256"
    }],
    "name": "calcSrcFees",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }
]

export function useFeeCallback (selectDestCurrency:any) {
  const contract = useContract(selectDestCurrency?.configToken, config_abi)

  const getConfigFee = useCallback((selectDestChain: any) => {
    return new Promise(resolve => {
      if (contract && selectDestChain) {
        contract.calcSrcFees('', selectDestChain, 196).then((res:any) => {
          // console.log(res.toString())
          if (res) {
            resolve(res.toString())
          } else {
            resolve('')
          }
        }).catch((error:any) => {
          console.log(error)
          resolve('')
        })
      }
    })
  }, [contract])

  return {
    getConfigFee
  }
}

const anycall_abi = [
  {
    "inputs": [{
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
    }, {
      "internalType": "uint32",
      "name": "_destinationDomain",
      "type": "uint32"
    }, {
      "internalType": "address",
      "name": "_mintRecipient",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "_burnToken",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "_toChainId",
      "type": "uint256"
    }, {
      "internalType": "bool",
      "name": "_payFeeOnSrc",
      "type": "bool"
    }],
    "name": "callout",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

export function useSwapCallback (
  selectCurrency:any,
  selectDestCurrency:any,
  srcFee:any,
  typedValue:any,
  recipient:any,
  selectChain:any,
) {
  const contract = useContract(selectDestCurrency?.router, anycall_abi)
  const inputAmount = useMemo(() => tryParseAmount(typedValue, selectCurrency?.decimals), [selectCurrency, typedValue])
  return useMemo(() => {
    // console.log(inputAmount)
    // console.log(srcFee)
    // console.log(srcFee?.getAmount())
    if (!contract || !inputAmount || !recipient || !selectChain || !srcFee) return {}
    return {
      excute: async () => {
        try {
          const params = [inputAmount, selectDestCurrency.usdcdomain, recipient, selectDestCurrency?.fromanytoken?.address, selectChain, 1]
          console.log(params)
          const txResut = await contract.callout(...params, {value: srcFee})
          console.log(txResut)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }, [contract, srcFee, inputAmount, recipient, selectDestCurrency, selectChain])
}

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED
}

export function useApproveCallback(
  account: string,
  spender: string,
  typedValue: string,
  selectCurrency: any
) {
  const contract = useTokenContract(selectCurrency?.address)
  const inputAmount = useMemo(() => tryParseAmount(typedValue, selectCurrency?.decimals), [selectCurrency, typedValue])

  const [allowance, setAllowance] = useState()
  const [approvelPending, setApprovelPending] = useState(false)

  const getApprovel = useCallback(() => {
    // console.log(contract, spender, account)
    if(contract && spender && account) {
      contract.allowance(account, spender).then((res:any) => {
        // console.log(res)
        setAllowance(res.toString())
      })
    }
  }, [contract, spender, account])

  useEffect(() => {
    setApprovelPending(false)
    getApprovel()
  }, [contract, spender, account, getApprovel])
  useInterval(getApprovel, 1000 * 3)

  const approvelState: ApprovalState = useMemo(() => {
    // console.log(allowance)
    if (approvelPending) {
      return ApprovalState.PENDING
    } else if (inputAmount) {
      if (Number(inputAmount) >= Number(allowance)) {
        return ApprovalState.NOT_APPROVED
      } else {
        return ApprovalState.APPROVED
      }
    } else {
      return ApprovalState.UNKNOWN
    }
  }, [allowance, inputAmount, approvelPending])

  return useMemo(() => {
    // console.log(approvelState)
    if (!contract || !spender) return {}
    return {
      approvelState: approvelState,
      approve: async () => {
        setApprovelPending(true)
        try {
          const tsResult = await contract.approve(spender, MaxUint256)
          console.log(tsResult)
        } catch (error) {
          
        }
        setApprovelPending(false)
      }
    }
  }, [approvelState, contract, spender])
}

export default null