import { useCallback } from "react";

export function useGetTokenlist () {
  const getTokenlist = useCallback((chainId:any) => {
    return new Promise(resolve => {
      const url = `https://l2api.anyswap.exchange/v4/tokenlist/usdc/${chainId}`
      fetch(url).then(res => res.json()).then(res => {
        console.log(res)
        resolve(res)
      }).catch((error) => {
        console.log(error)
        resolve('')
      })
    })
  }, [])
  return {
    getTokenlist
  }
}