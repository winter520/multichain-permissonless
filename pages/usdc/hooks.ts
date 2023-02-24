import { useCallback } from "react";
import {
  useContract
} from '@/hooks/useContract'

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
      // console.log(contract)
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
  }, [selectDestCurrency, contract])
  return {
    getConfigFee
  }
}

export function useSwapCallback ({

}) {
  
}