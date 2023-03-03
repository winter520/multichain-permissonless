import { useCallback } from "react";
import { ChainId } from "@/config/chainConfig/chainId";
import config from "@/config";

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