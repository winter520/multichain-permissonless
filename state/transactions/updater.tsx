// import { useCallback, useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveWeb3React } from '../../hooks'

// import {updateTerraHash} from '../../hooks/terra'
// import {updateNasHash} from '../../hooks/nas'

// import {getHashInfo} from '../../nonevm/getHash'

import { useActiveReact } from '../../hooks/useActiveReact'
import { 
  useAddPopup,
  useBlockNumber
} from '../application/hooks'
import { AppDispatch, AppState } from '../index'
import { checkedTransaction, finalizeTransaction, updateTransaction } from './actions'


import {getHashStateOnServer} from '@/hooks/useHashResults'
import useInterval from '@/hooks/useInterval'

// import {TERRA_MAIN_CHAINID} from '../../config/chainConfig/terra'
// import {NAS_MAIN_CHAINID} from '../../config/chainConfig/nas'

import {END_STATUS} from '@/config/constant'

import {
  getHashStatus
} from '@/chains/getHashStatus'

export function shouldCheck(
  lastBlockNumber: number,
  tx: { addedTime: number; receipt?: {}; lastCheckedBlockNumber?: number; info?:any }
): boolean {
  if (tx.info && END_STATUS.includes(tx.info.status)) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  } else {
    // otherwise every block
    return true
  }
}
export default function Updater(): null {
  const { library } = useActiveWeb3React()
  const { chainId } = useActiveReact()

  const lastBlockNumber = useBlockNumber()

  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector<AppState, AppState['transactions']>(state => state.transactions)

  const transactions = chainId ? state[chainId] ?? {} : {}

  // show popup on confirm
  const addPopup = useAddPopup()

  const updateNonEVMTxns = useCallback(() => {
    // console.log(chainId)
    // console.log(transactions)
    if (!chainId || Object.keys(transactions).length <= 0 ) return
    Object.keys(transactions)
      .filter(hash => {
        const tx = transactions[hash]
        if (tx.info && END_STATUS.includes(tx.info.status)) return false
        return true
      })
      .forEach(hash => {
        // console.log(hash)
        const tx = transactions[hash]
        if (!tx.receipt) {
        // if (tx.receipt) {
          getHashStatus(chainId, hash)?.then((receipt:any) => {
            console.log(receipt)
            if (receipt.msg === 'Success' || receipt.msg === 'Failure') {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: '',
                    blockNumber: receipt.height,
                    contractAddress: '',
                    from: tx.from,
                    status: receipt.msg === 'Success' ? 1 : 0,
                    to: tx.toAddress,
                    transactionHash: hash,
                    transactionIndex: ''
                  }
                })
              )
              if (!tx?.version) {
              // if (tx?.version) {
                addPopup(
                  {
                    txn: {
                      hash,
                      success: receipt.msg === 'Success' ? true : false,
                      summary: transactions[hash]?.summary
                    }
                  },
                  hash
                )
              }
            }
          })
        } else if (
          !(tx.info && END_STATUS.includes(tx?.info?.status))
          && (tx.receipt.status === 1 || typeof tx.receipt?.status === 'undefined')
          && tx?.version
        )  {
          getHashStateOnServer(hash).then((receipt:any) => {
            console.log(receipt)
            if (receipt && receipt.msg === 'Success' && receipt.info) {
              dispatch(
                updateTransaction({
                  chainId,
                  hash,
                  info: {
                    ...receipt.info
                  }
                })
              )
            }
          })
        }
      })


    // if (isNaN(chainId)) {
    //   Object.keys(transactions)
    //   .filter(hash => {
    //     const tx = transactions[hash]
    //     if (tx.info && END_STATUS.includes(tx.info.status)) return false
    //     return true
    //   })
    //   .forEach(hash => {
    //     // console.log(hash)
    //     const tx = transactions[hash]
    //     if (!tx.receipt) {
    //       getHashResult(hash, chainId).then((receipt:any) => {
    //         // console.log(receipt)
    //         if (receipt.msg === 'Success' || receipt.msg === 'Failure') {
    //           dispatch(
    //             finalizeTransaction({
    //               chainId,
    //               hash,
    //               receipt: {
    //                 blockHash: '',
    //                 blockNumber: receipt.height,
    //                 contractAddress: '',
    //                 from: tx.from,
    //                 status: receipt.msg === 'Success' ? 1 : 0,
    //                 to: tx.toAddress,
    //                 transactionHash: hash,
    //                 transactionIndex: ''
    //               }
    //             })
    //           )
    //           if (!tx?.version) {
    //             // addPopup(
    //             //   {
    //             //     txn: {
    //             //       hash,
    //             //       success: receipt.msg === 'Success' ? true : false,
    //             //       summary: transactions[hash]?.summary
    //             //     }
    //             //   },
    //             //   hash
    //             // )
    //           }
    //         }
    //       })
    //     } else if (
    //       !(tx.info && END_STATUS.includes(tx?.info?.status))
    //       && (tx.receipt.status === 1 || typeof tx.receipt?.status === 'undefined')
    //       && tx?.version
    //     )  {
    //       getHashStateOnServer(hash).then((receipt:any) => {
    //         if (receipt && receipt.msg === 'Success' && receipt.info) {
    //           dispatch(
    //             updateTransaction({
    //               chainId,
    //               hash,
    //               info: {
    //                 ...receipt.info
    //               }
    //             })
    //           )
    //         }
    //       })
    //     }
    //   })
    
    // } else {
    //   if (!chainId || !library || !lastBlockNumber || isNaN(chainId)) return
    //   Object.keys(transactions)
    //     .filter(hash => shouldCheck(lastBlockNumber, transactions[hash]))
    //     .forEach(hash => {
    //       const tx = transactions[hash]
    //       if (!tx.receipt) {
    //         library
    //           .getTransactionReceipt(hash)
    //           .then(receipt => {
    //             if (receipt) {
    //               dispatch(
    //                 finalizeTransaction({
    //                   chainId,
    //                   hash,
    //                   receipt: {
    //                     blockHash: receipt.blockHash,
    //                     blockNumber: receipt.blockNumber,
    //                     contractAddress: receipt.contractAddress,
    //                     from: receipt.from,
    //                     status: receipt.status,
    //                     to: receipt.to,
    //                     transactionHash: receipt.transactionHash,
    //                     transactionIndex: receipt.transactionIndex
    //                   }
    //                 })
    //               )
    //               // if (!tx?.version) {
    //               //   addPopup(
    //               //     {
    //               //       txn: {
    //               //         hash,
    //               //         success: receipt.status === 1,
    //               //         summary: transactions[hash]?.summary
    //               //       }
    //               //     },
    //               //     hash
    //               //   )
    //               // }
    //             } else {
    //               dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }))
    //             }
    //           })
    //           .catch(error => {
    //             console.error(`failed to check transaction hash: ${hash}`, error)
    //           })
    //       } else if (
    //         !(tx.info && END_STATUS.includes(tx?.info?.status))
    //         && (tx.receipt.status === 1 || typeof tx.receipt?.status === 'undefined')
    //         && tx?.version
    //       )  {
    //         getHashStateOnServer(hash).then((receipt:any) => {
    //           if (receipt && receipt.msg === 'Success' && receipt.info) {
    //             dispatch(
    //               updateTransaction({
    //                 chainId,
    //                 hash,
    //                 info: {
    //                   ...receipt.info
    //                 }
    //               })
    //             )
    //           }
    //         })
    //       }
    //     })
    // }
  }, [chainId, library, transactions, lastBlockNumber, dispatch])

  useInterval(updateNonEVMTxns, 1000 * 10)

  return null
}
