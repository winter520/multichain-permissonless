import { Interface, FunctionFragment } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  // useAddPopup,
  useBlockNumber
} from '@/state/application/hooks'
import {
  useActiveReact
} from "@/hooks/useActiveReact"

import {
  Call,
  toCallKey,
  parseCallKey,
  ListenerOptions,
  addMulticallListeners,
  removeMulticallListeners
} from './actions'

import {
  AppState,
  AppDispatch
} from '@/state'

export interface Result extends ReadonlyArray<any> {
  readonly [key: string]: any
}

type MethodArg = string | number | BigNumber
type MethodArgs = Array<MethodArg | MethodArg[]>

type OptionalMethodInputs = Array<MethodArg | MethodArg[] | undefined> | undefined
interface CallResult {
  readonly valid: boolean
  readonly data: string | undefined
  readonly blockNumber: number | undefined
}

interface CallState {
  readonly valid: boolean
  // the result, or undefined if loading or errored/no data
  readonly result: Result | undefined
  // true if the result has never been fetched
  readonly loading: boolean
  // true if the result is not for the latest block
  readonly syncing: boolean
  // true if the call was made and is synced, but the return data is invalid
  readonly error: boolean
}


const INVALID_CALL_STATE: CallState = { valid: false, result: undefined, loading: false, syncing: false, error: false }
const LOADING_CALL_STATE: CallState = { valid: true, result: undefined, loading: true, syncing: true, error: false }
const INVALID_RESULT: CallResult = { valid: false, blockNumber: undefined, data: undefined }

function isMethodArg(x: unknown): x is MethodArg {
  return ['string', 'number'].indexOf(typeof x) !== -1
}

function isValidMethodArgs(x: unknown): x is MethodArgs | undefined {
  return (
    x === undefined ||
    (Array.isArray(x) && x.every(xi => isMethodArg(xi) || (Array.isArray(xi) && xi.every(isMethodArg))))
  )
}

function toCallState(
  callResult: CallResult | undefined,
  contractInterface: Interface | undefined,
  fragment: FunctionFragment | undefined,
  latestBlockNumber: number | undefined
): CallState {
  if (!callResult) return INVALID_CALL_STATE
  const { valid, data, blockNumber } = callResult
  if (!valid) return INVALID_CALL_STATE
  if (valid && !blockNumber) return LOADING_CALL_STATE
  if (!contractInterface || !fragment || !latestBlockNumber) return LOADING_CALL_STATE
  const success = data && data.length > 2
  const syncing = (blockNumber ?? 0) < latestBlockNumber
  let result: Result | undefined = undefined
  if (success && data) {
    try {
      result = contractInterface.decodeFunctionResult(fragment, data)
    } catch (error) {
      console.debug('Result data parsing failed', fragment, data)
      return {
        valid: true,
        loading: false,
        error: true,
        syncing,
        result
      }
    }
  }
  return {
    valid: true,
    loading: false,
    syncing,
    result: result,
    error: !success
  }
}

// the lowest level call for subscribing to contract data
function useCallsData(calls: (Call | undefined)[], options?: ListenerOptions, initChainId?:any): CallResult[] {
  const { chainId } = useActiveReact()
  const useChainId = initChainId ? initChainId : chainId
  const callResults = useSelector<AppState, AppState['evm']['callResults']>(state => state.evm.callResults)
  const dispatch = useDispatch<AppDispatch>()

  const serializedCallKeys: string = useMemo(
    () =>
      JSON.stringify(
        calls
          ?.filter((c): c is Call => Boolean(c))
          ?.map(toCallKey)
          ?.sort() ?? []
      ),
    [calls]
  )

  // 当实际更改持续至少100毫秒时更新侦听器
  useEffect(() => {
    // console.log(chainId)
    const callKeys: string[] = JSON.parse(serializedCallKeys)
    if (!useChainId || callKeys.length === 0) return undefined
    const calls = callKeys.map(key => parseCallKey(key))
    // console.log(calls)
    // console.log(callKeys)
    // console.log(serializedCallKeys)
    dispatch(
      addMulticallListeners({
        chainId: useChainId,
        calls,
        options
      })
    )

    return () => {
      dispatch(
        removeMulticallListeners({
          chainId: useChainId,
          calls,
          options
        })
      )
    }
  }, [chainId, dispatch, options, serializedCallKeys])

  return useMemo(
    () =>
      calls.map<CallResult>(call => {
        if (!useChainId || !call) return INVALID_RESULT

        const result = callResults[useChainId]?.[toCallKey(call)]
        let data
        if (result?.data && result?.data !== '0x') {
          data = result.data
        }

        return { valid: true, data, blockNumber: result?.blockNumber }
      }),
    [callResults, calls, useChainId]
  )
}


export function useSingleCallResult(
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs,
  options?: ListenerOptions,
  chainId?: any
): CallState {
  const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [contract, methodName])

  const calls = useMemo<Call[]>(() => {
    return contract && fragment && isValidMethodArgs(inputs)
      ? [
          {
            address: contract.address,
            callData: contract.interface.encodeFunctionData(fragment, inputs)
          }
        ]
      : []
  }, [contract, fragment, inputs])

  const result = useCallsData(calls, options, chainId)[0]
  const latestBlockNumber = useBlockNumber()

  return useMemo(() => {
    return toCallState(result, contract?.interface, fragment, latestBlockNumber)
  }, [result, contract, fragment, latestBlockNumber])
}

export function useSingleContractMultipleData(
  contract: Contract | null | undefined,
  methodName: string,
  callInputs: OptionalMethodInputs[],
  options?: ListenerOptions,
  chainId?: any
): CallState[] {
  const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [contract, methodName])

  const calls = useMemo(
    () =>
      contract && fragment && callInputs && callInputs.length > 0
        ? callInputs.map<Call>(inputs => {
            return {
              address: contract.address,
              callData: contract.interface.encodeFunctionData(fragment, inputs)
            }
          })
        : [],
    [callInputs, contract, fragment]
  )
  const results = useCallsData(calls, options, chainId)
          // console.log(results)
  const latestBlockNumber = useBlockNumber()
          // console.log(latestBlockNumber)
  return useMemo(() => {
    return results.map(result => toCallState(result, contract?.interface, fragment, latestBlockNumber))
  }, [fragment, contract, results, latestBlockNumber])
}