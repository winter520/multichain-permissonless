import {
  Card,
  Col,
  Grid,
  Row,
  styled,
  Text
} from '@nextui-org/react'
import {t} from 'i18next'
import {
  useAllTransactions
} from '@/state/transactions/hooks'
import {
  useTxnsDtilOpen
} from '@/state/application/hooks'
import { useEffect } from 'react'
import { shortenAddress } from '@/utils'
import TokenLogo from '../TokenLogo'
import config from '@/config'

import CopyHelper from '../AccountDetails/copy'

const ContentLabel = styled(Text, {
  textAlign: 'left',
  fontSize: '$sm'
})
const ContentText = styled(Text, {
  textAlign: 'right',
  fontSize: '$sm'
})

export default function TransactionDetail ({
  from,
  to,
  txid,
  swaptx,
  fromChain,
  toChain,
  logoUrl,
  symbol,
  value
}: any) {
  return (<>
    <Card variant="bordered">
      <Card.Header>
        <Text b>{t('From')}</Text>
      </Card.Header>
      <Card.Body css={{paddingTop: '0'}}>
        <Row justify='space-between' align='center'>
          <Col span={4}>
            <Row justify='flex-start' align='center'>
              <TokenLogo symbol={config.chainInfo?.[fromChain]?.symbol} size="xs"></TokenLogo>
              <ContentLabel b css={{marginLeft: '10px'}}>{config.chainInfo?.[fromChain]?.name}</ContentLabel>
            </Row>
          </Col>
          <Col span={8}><ContentText>- {value} {symbol}</ContentText></Col>
        </Row>
        <Row justify='space-between' align='center'>
          <Col span={4}><ContentLabel>Tx Hash:</ContentLabel></Col>
          <Col span={8}>
            <Row justify='flex-end' align='center'>
              <ContentText color='secondary'>{shortenAddress(txid, 6)}</ContentText>
              <CopyHelper toCopy='txid' />
            </Row>
          </Col>
        </Row>
        <Row justify='space-between' align='center'>
          <Col span={4}><ContentLabel>{t('From')}:</ContentLabel></Col>
          <Col span={8}><ContentText color='secondary'>{from ? shortenAddress(from, 6) : '-'}</ContentText></Col>
        </Row>
      </Card.Body>
    </Card>
    <Card variant="bordered">
      <Card.Header>
        <Text b>{t('To')}</Text>
      </Card.Header>
      <Card.Body css={{paddingTop: '0'}}>
        <Row justify='space-between' align='center'>
          <Col span={4}>
            <Row justify='flex-start' align='center'>
              <TokenLogo symbol={config.chainInfo?.[toChain]?.symbol} size="xs"></TokenLogo>
              <ContentLabel b css={{marginLeft: '10px'}}>{config.chainInfo?.[toChain]?.name}</ContentLabel>
            </Row>
          </Col>
          <Col span={8}><ContentText>+ {value} {symbol}</ContentText></Col>
        </Row>
        <Row justify='space-between' align='center'>
          <Col span={4}><ContentLabel>Tx Hash:</ContentLabel></Col>
          <Col span={8}><ContentText color='secondary'>{shortenAddress(swaptx, 6)}</ContentText></Col>
        </Row>
        <Row justify='space-between' align='center'>
          <Col span={4}><ContentLabel>{t('To')}:</ContentLabel></Col>
          <Col span={8}><ContentText color='secondary'>{to ? shortenAddress(to, 6) : '-'}</ContentText></Col>
        </Row>
      </Card.Body>
    </Card>
  </>)
}