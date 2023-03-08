
import {
  useAllTransactions
} from '@/state/transactions/hooks'
import {
  useTxnsDtilOpen
} from '@/state/application/hooks'
import { useEffect } from 'react'
import TransactionDetail from './details'
import Progress from './progress'
import {
  useActiveReact
} from '@/hooks/useActiveReact'


export default function Transactions () {
  const { chainId } = useActiveReact()
  const allTransactions = useAllTransactions()
  const {hash} = useTxnsDtilOpen()
  const tx = allTransactions?.[hash]
  useEffect(() => {
    console.log(hash)
    console.log(allTransactions)
  }, [hash, allTransactions])

  return (<>
    <TransactionDetail
      from={tx?.from}
      to={tx?.from}
      txid={tx?.hash}
      swaptx={tx?.info?.swaptx}
      fromChain={chainId}
      toChain={tx?.toChainId}
      logoUrl={tx?.logoUrl}
      symbol={tx?.symbol}
      value={tx?.value}
    />
    <Progress
      state={1}
    />
  </>)
}