import {
  USE_VERSION,
  isBrowser
} from '../constant'
import { ChainId } from './chainId'

const LOCAL_RPC = 'LOCAL_RPC'
export function getLocalRPC (chainId:ChainId | string, initRpc:string) {
  if (!isBrowser) return initRpc
  const lStr = window.localStorage.getItem(USE_VERSION + '_' + LOCAL_RPC)
  if (lStr) {
    const lObj = JSON.parse(lStr)
    if (lObj[chainId]) {
      return lObj[chainId]
    } else {
      return initRpc
    }
  } else {
    return initRpc
  }
}

export function setLocalRPC (chainId:ChainId, initRpc:string) {
  const lStr = window.localStorage.getItem(USE_VERSION + '_' + LOCAL_RPC)
  let lObj:any ={}
  if (lStr) {
    lObj = JSON.parse(lStr)
    lObj[chainId] = initRpc
  } else {
    lObj[chainId] = initRpc
  }
  window.localStorage.setItem(USE_VERSION + '_' + LOCAL_RPC, JSON.stringify(lObj))
}