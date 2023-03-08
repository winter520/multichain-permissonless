import {
  Card,
  Col,
  Grid,
  Row,
  styled,
  Text
} from '@nextui-org/react'
import Link from 'next/link';
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

import { getEtherscanLink } from '../../utils'

const CardBody = styled(Card, {
  height: '145px',
  minHeight: '145px',
})

const ContentLabel = styled(Text, {
  textAlign: 'left',
  fontSize: '$sm'
})
const ContentText = styled(Text, {
  textAlign: 'right',
  fontSize: '$sm'
})

const OutLink = styled(Link, {
  fontSize: '$sm',
  color: '$secondary'
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
    <CardBody variant="bordered">
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
          <Col span={4}><ContentLabel>{t('TxHash')}:</ContentLabel></Col>
          <Col span={8}>
            <Row justify='flex-end' align='center'>
              <OutLink href={getEtherscanLink(fromChain, txid, 'transaction')}>{txid ? shortenAddress(txid, 6) : '-'}</OutLink>
              <CopyHelper toCopy={txid} style={{marginLeft: '10px'}} />
            </Row>
          </Col>
        </Row>
        <Row justify='space-between' align='center'>
          <Col span={4}><ContentLabel>{t('From')}:</ContentLabel></Col>
          <Col span={8}>
            <Row justify='flex-end' align='center'>
              <OutLink href={getEtherscanLink(fromChain, from, 'address')}>{from ? shortenAddress(from, 6) : '-'}</OutLink>
              <CopyHelper toCopy={from} style={{marginLeft: '10px'}} />
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </CardBody>
    <CardBody variant="bordered">
      <Card.Header>
        <Text b>{t('To')}</Text>
      </Card.Header>
      <Card.Body css={{paddingTop: '0', minHeight: '140px'}}>
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
          <Col span={4}><ContentLabel>{t('TxHash')}:</ContentLabel></Col>
          <Col span={8}>
            <Row justify='flex-end' align='center'>
              <OutLink href={getEtherscanLink(toChain, swaptx, 'transaction')}>{swaptx ? shortenAddress(swaptx, 6) : '-'}</OutLink>
              <CopyHelper toCopy={swaptx} style={{marginLeft: '10px'}} />
            </Row>
          </Col>
        </Row>
        <Row justify='space-between' align='center'>
          <Col span={4}><ContentLabel>{t('To')}:</ContentLabel></Col>
          <Col span={8}>
            <Row justify='flex-end' align='center'>
              <OutLink href={getEtherscanLink(toChain, to, 'address')}>{to ? shortenAddress(to, 6) : '-'}</OutLink>
              <CopyHelper toCopy={to} style={{marginLeft: '10px'}} />
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </CardBody>
  </>)
}