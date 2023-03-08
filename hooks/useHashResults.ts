import { useCallback } from "react";
import { ChainId } from "@/config/chainConfig/chainId";
import config from "@/config";
import {
  USE_VERSION,
  VERSION
} from '@/config/constant'

export function getZKhash (hash:string) {
  return new Promise(resolve => {
    const baseUrl = 'http://18.138.122.22:9999'
    // fetch(`${baseUrl}/checkTransactionStatus/checkTransactionStatus/${hash}?key=b2362a491edb655be31315981110c3f6c68c914f63442db91481993725576c71`).then(res => res.json()).then(data => {
    //   console.log(data)
    // })
    // Promise.all([
    //   fetch(`${baseUrl}/checkTransactionStatus/checkTransactionStatus/${hash}?key=b2362a491edb655be31315981110c3f6c68c914f63442db91481993725576c71`),
    //   fetch(`${baseUrl}/getTargetTransaction/${hash}?key=b2362a491edb655be31315981110c3f6c68c914f63442db91481993725576c71`),
    // ]).then((res:any) => {
    //   console.log(res)
    // })
  })
}

export function getHashCrosschain (hash:any) {
  return new Promise(resolve => {
    const url = `${config.bridgeApi}/v2/history/details/latest?params=${hash}`
    fetch(url).then(res => res.json()).then(data => {
      // console.log(data)
      if (data) {
        resolve(data)
      } else {
        resolve('')
      }
    })
  })
}

export function getHashStateOnServer (hash:any) {
  if (USE_VERSION === VERSION.ZK_DEMO) {
    return getZKhash(hash)
  } else {
    return getHashCrosschain(hash)
  }
}