import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useActiveReact } from '@/hooks/useActiveReact'
 
// import useInterval from '@/hooks/useInterval'

import { AppDispatch } from '../index'

import config from '@/config'

import {
  usdcList
} from './actions'

// function getVersion () {
//   return new Promise(resolve => {
//     const url = `${config.multiBridgeApi}/token/version`
//     fetch(url).then(res => res.text()).then((version:any) => {
//       resolve(version)
//     })
//   })
// }

// function fetchTokenlist () {
//   return new Promise(resolve => {

//   })
// }

export default function Updater () {
  const { chainId } = useActiveReact()

  const updateCount = useRef(0)

  const dispatch = useDispatch<AppDispatch>()

  const useChain = useMemo(() => {
    if (chainId) {
      return chainId
    } else if (config.chainInfo[chainId].chainID) {
      return config.chainInfo[chainId].chainID
    }
    return undefined
  }, [chainId])

  const getTokenlist = useCallback(() => {
    const url = `https://l2api.anyswap.exchange/v4/tokenlistV4/${chainId}`
    // const url = `https://l2api.anyswap.exchange/v4/tokenlist/usdc/${chainId}`
    fetch(url).then(res => res.json()).then((result:any) => {
      console.log(result)
      dispatch(usdcList({ chainId: useChain, tokenList: result, version: 1 }))
      updateCount.current = 0
    }).catch((error) => {
      console.log(error)
      updateCount.current = 0
    })
  }, [useChain])

  useEffect(() => {
    // console.log(useChain)
    // console.log(updateCount.current)
    if (useChain && updateCount.current === 0) {
      updateCount.current = 1
      getTokenlist()
    }
  }, [useChain])

  return null
}