import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useContract,
} from '@/hooks/useContract'
import {
  tryParseAmount
} from '@/utils'
import { MaxUint256 } from '@ethersproject/constants'
import useInterval from "@/hooks/useInterval";

const zkrouter_abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "chainId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "bindAddress",
        "type": "address"
      }
    ],
    "name": "swapout",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export function useSwapCallback (
  selectCurrency:any,
  selectDestCurrency:any,
  typedValue:any,
  recipient:any,
  selectChain:any,
) {
  const contract = useContract(selectCurrency?.address, zkrouter_abi)
  const inputAmount = useMemo(() => tryParseAmount(typedValue, selectCurrency?.decimals), [selectCurrency, typedValue])
  // console.log(inputAmount)
  // console.log(selectCurrency)
  return useMemo(() => {
    // console.log(contract)
    // console.log(inputAmount)
    // console.log(recipient)
    // console.log(selectChain)
    if (!contract || !inputAmount || !recipient || !selectChain) return {}
    return {
      excute: async () => {
        try {
          const params = [inputAmount, selectChain, recipient]
          console.log(params)
          const txResut = await contract.swapout(...params)
          console.log(txResut)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }, [contract, inputAmount, recipient, selectDestCurrency, selectChain])
}