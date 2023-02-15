import { useCallback } from "react";
import { ChainId } from "@/config/chainConfig/chainId";
import config from "@/config";

export function useHashResults () {
  const getHashResult = useCallback((hash:string, chainId?: ChainId) => {
    return new Promise(resolve => {
      console.log(hash)
      resolve(chainId)
    })
  }, [])
  return {
    getHashResult
  }
}

export function getHashCrosschain (hash:any) {
  return new Promise(resolve => {
    const url = `${config.bridgeApi}/v2/history/details/latest?params=${hash}`
    fetch(url).then(res => res.json()).then(data => {
      resolve(data)
    })
    // axios.get(url).then((res:any) => {
    //   const {status, data} = res
    //   if (status === 200) {
    //     resolve(data)
    //   } else {
    //     resolve('')
    //   }
    // }).catch((err:any) => {
    //   console.log(err)
    //   resolve('')
    // })
  })
}