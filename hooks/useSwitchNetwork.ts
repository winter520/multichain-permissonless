import { ChainId } from "@/config/chainConfig/chainId";
import { useCallback } from "react";
import config from "@/config";
// import {
//   useUserSelectChainId
// } from '@/state/user/hooks'
const toHex = (num:any) => {
  return "0x" + num.toString(16);
};

export async function useSwitchNetworks() {
  // const {setUserSelectNetwork} = useUserSelectChainId()
  const switchNetwork = useCallback((chainId:ChainId, type:any) => {
    return new Promise(resolve => {
      const { ethereum } = window
      if (ethereum && !isNaN(Number(chainId))) {
        const useChainId = toHex(chainId)
        const {chainInfo} = config
        ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: useChainId }],
        }).then(() => {
          // setUserSelectNetwork({chainId: chainId, label: chainId})
          if (!type) {
            history.go(0)
          }
          resolve({
            msg: 'Success'
          })
        }).catch((switchError: any) => {
          console.log(switchError)
          if (switchError.code === 4902) {
            const data = {
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: useChainId, // A 0x-prefixed hexadecimal string
                  chainName: chainInfo[chainId]?.walletName ?? chainInfo[chainId].networkName,
                  nativeCurrency: {
                    name: chainInfo[chainId].name,
                    symbol: chainInfo[chainId].symbol, // 2-6 characters long
                    decimals: 18,
                  },
                  rpcUrls: [chainInfo[chainId].nodeRpc],
                  blockExplorerUrls: chainInfo[chainId].explorer && chainInfo[chainId].explorer.indexOf('https') === 0 ? [chainInfo[chainId].explorer] : null,
                  iconUrls: null // Currently ignored.
                }
              ],
            }
            console.log(data)
            ethereum.request(data).then((res: any) => {
              // console.log(chainId)
              console.log(res)
              // setUserSelectNetwork({chainId: chainId, label: chainId})
              if (!type) {
                history.go(0)
              }
              resolve({
                msg: 'Success'
              })
            }).catch((err: any) => {
              console.log(err)
              resolve({
                msg: 'Error'
              })
            })
          } else {
            resolve({
              msg: 'Error'
            })
          }
        })
      } else {
        resolve({
          msg: 'Error'
        })
      }
    })
  }, [])

  return {
    switchNetwork
  }
}
