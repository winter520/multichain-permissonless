import React, { useMemo } from 'react'
// import styled from 'styled-components'
import { CheckCircle, Triangle } from 'react-feather'

import {useTxnsDtilOpen} from '@/state/application/hooks'
import {useActiveReact} from '@/hooks/useActiveReact'
import { getEtherscanLink } from '../../utils'
// import { ExternalLink } from '../../theme'
import { useAllTransactions } from '@/state/transactions/hooks'

import {
  // useModalOpen,
  // useWalletModalToggle,
  useWalletModalClose
} from '@/state/application/hooks'
// import { ApplicationModal } from '@/state/application/actions'
// import { RowFixed } from '../Row'
// import Loader from '../Loader'
import {Status, getStatus} from '@/config/status'

import {
  Loading,
  Text,
  styled,
  Row,
  theme
} from "@nextui-org/react"
import Link from 'next/link'

const TransactionWrapper = styled('div', {})

const TransactionStatusText = styled('div', {

})
// const TransactionStatusText = styled.div`
//   margin-right: 0.5rem;
//   display: flex;
//   align-items: center;
//   color: ${({ theme }) => theme.text1};
//   :hover {
//     text-decoration: underline;
//   }
// `

const TransactionState = styled(Link, {
  textDecoration: 'none !important',
  padding: '0.25rem 0rem',
})
// const TransactionState = styled(ExternalLink)<{ pending: boolean; success?: boolean }>`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   text-decoration: none !important;
//   border-radius: 0.5rem;
//   padding: 0.25rem 0rem;
//   font-weight: 500;
//   font-size: 0.825rem;
//   color: ${({ theme }) => theme.primary1};
// `

const TransactionState1 = styled('div', {
  cursor:'pointer',
  padding: '0.25rem 0rem',
})
// const TransactionState1 = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   text-decoration: none !important;
//   border-radius: 0.5rem;
//   padding: 0.25rem 0rem;
//   font-weight: 500;
//   font-size: 0.825rem;
//   color: ${({ theme }) => theme.primary1};
//   cursor:pointer;
// `

const IconWrapper = styled('div', {

})
// const IconWrapper = styled.div<{ pending: boolean; success?: boolean }>`
//   color: ${({ pending, success, theme }) => (pending ? theme.primary1 : success ? theme.green1 : theme.red1)};
// `

export default function Transaction({ hash }: { hash: string }) {

  const { chainId } = useActiveReact()
  const {onChangeViewDtil} = useTxnsDtilOpen()
  const closeWalletModal = useWalletModalClose()
  // const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const allTransactions = useAllTransactions()
  // console.log(allTransactions)
  const tx = allTransactions?.[hash]
  const summary = tx?.summary
  const fromStatus = useMemo(() => {
    if (tx) {
      if (!tx.receipt) {
        return Status.Pending
      } else if (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined') {
        return Status.Success
      } else {
        return Status.Failure
      }
    } else {
      return Status.Null
    }
  }, [tx])
  const toStatus:any = useMemo(() => {
    // console.log(tx)
    if (tx) {
      if (fromStatus === Status.Failure) {
        return Status.Failure
      } else if (!tx.info) {
        return null
      }  else {
        const status = tx.info?.status
        const statusType = getStatus(status, tx?.info?.confirmations)
        return statusType
        // return Status.Failure
      }
    } else {
      return null
    }
  }, [tx, fromStatus])
  // const pending = !tx?.receipt
  const pending = useMemo(() => {
    if (tx?.version) {
      // if (!toStatus || [Status.Pending, Status.Confirming, Status.Crosschaining].includes(toStatus)) {
      //   return true
      // }
      // return false
      if (toStatus && [Status.Failure, Status.Success].includes(toStatus)) {
        return false
      }
      return true
    } else {
      return !tx?.receipt
    }
  }, [tx, toStatus])
  // const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')
  const success = useMemo(() => {
    if (tx?.version) {
      if (toStatus === Status.Success) {
        return true
      }
      return false
    } else {
      return !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')
    }
  }, [toStatus])
  // console.log(tx)
  if (!chainId) return null

  return (
    <TransactionWrapper>
      {
        tx?.version ? (
          <TransactionState1 onClick={() => {
            // console.log(walletModalOpen)
            // if (!walletModalOpen) {
            // }
            closeWalletModal()
            onChangeViewDtil(hash, true)
          }}>
            <Row justify='space-between' align='center'>
              {/* <RowFixed>
                <TransactionStatusText>{summary ?? hash} ↗</TransactionStatusText>
              </RowFixed> */}
              <Text size="small" color='primary'>
                {summary ?? hash} ↗
              </Text>
              <IconWrapper>
              {/* <IconWrapper pending={pending} success={success}> */}
                {/* {pending ? <Loader stroke="#5f6bfb" /> : success ? <CheckCircle size="16" /> : <Triangle size="16" />} */}
                {pending ? <Loading size='xs' color="primary" /> : success ? <CheckCircle size="16" style={{stroke: theme.colors.success.value}} /> : <Triangle size="16" style={{stroke: theme.colors.warning.value}} />}
              </IconWrapper>
            </Row>
          </TransactionState1>
        ) : (
          <TransactionState href={getEtherscanLink(chainId, hash, 'transaction')} target="_blank">
            <Row justify='space-between' align='center'>
              {/* <TransactionState href={getEtherscanLink(chainId, hash, 'transaction')} pending={pending} success={success}> */}
                {/* <RowFixed>
                  <TransactionStatusText>{summary ?? hash} ↗</TransactionStatusText>
                </RowFixed> */}
                <Text size="small" color='primary'>
                  {summary ?? hash} ↗
                </Text>
                {/* <IconWrapper pending={pending} success={success}> */}
                <IconWrapper>
                  {/* {pending ? <Loading stroke="#5f6bfb" /> : success ? <CheckCircle size="16" /> : <Triangle size="16" />} */}
                  {pending ? <Loading size='xs' color="primary" /> : success ? <CheckCircle size="16" style={{stroke: theme.colors.success.value}} /> : <Triangle size="16" style={{stroke: theme.colors.warning.value}} />}
                </IconWrapper>
            </Row>
          </TransactionState>
        )
      }
    </TransactionWrapper>
  )
}
