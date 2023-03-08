import { useCallback } from "react";
import { ChainId } from "@/config/chainConfig/chainId";
import config from "@/config";
import {
  USE_VERSION,
  VERSION
} from '@/config/constant'
import axios from 'axios'

export function getZKhash (hash:string) {
  return new Promise(resolve => {
    const baseUrl = 'https://zktestnetapi.multichain.org'
    // fetch(`${baseUrl}/checkTransactionStatus/${hash}?key=b2362a491edb655be31315981110c3f6c68c914f63442db91481993725576c71`).then(res => res.json()).then(data => {
    //   console.log(data)
    // })
    Promise.all([
      axios.get(`${baseUrl}/checkTransactionStatus/${hash}?key=b2362a491edb655be31315981110c3f6c68c914f63442db91481993725576c71`),
      axios.get(`${baseUrl}/getTargetTransaction/${hash}?key=b2362a491edb655be31315981110c3f6c68c914f63442db91481993725576c71`),
    ]).then((res:any) => {
      // console.log(res)
      const sRes = res[0]
      const data:any = {}
      if (sRes?.data) {
        // data.status = sRes?.data
        switch (sRes?.data?.toString()) {
          case  '1':
            data.status = 0
            break;
          case  '2':
            data.status = 8
            break;
          case  '3':
            data.status = 9
            break;
          case  '4':
            data.status = 10
            break;
        }
      }

      const hRes = res[1]
      if (hRes?.data) {
        data.swaptx = hRes?.data
      }
      resolve({
        msg: 'Success',
        info: data
      })
    }).catch((error:any) => {
      resolve({
        msg: 'Error',
        error: error
      })
    })
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