import {
  Card,
  Col,
  Grid,
  Row,
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

export default function Transactions () {
  const allTransactions = useAllTransactions()
  const {hash, isOpenModal, onChangeViewDtil} = useTxnsDtilOpen()

  useEffect(() => {
    console.log(hash)
    console.log(allTransactions)
  }, [hash, allTransactions])

  return (<>
    <Card variant="bordered">
      <Card.Header>
        <Text>{t('From')}</Text>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col span={4}>Tx Hash</Col>
          <Col span={8}></Col>
        </Row>
      </Card.Body>
    </Card>
  </>)
}