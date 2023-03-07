import {
  Modal, Text
} from '@nextui-org/react'
import {
  useTxnsDtilOpen
} from '@/state/application/hooks'

import Transactions from './index'


export default function TxModal () {
  const {hash, isOpenModal, onChangeViewDtil} = useTxnsDtilOpen()
  return <>
    <Modal
      scroll
      closeButton
      // width="600px"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={isOpenModal}
      onClose={() => onChangeViewDtil(hash, false)}
    >
      <Modal.Header>
        <Text b size="$md">Transaction Details</Text>
      </Modal.Header>
      <Modal.Body>
        <Transactions></Transactions>
      </Modal.Body>
    </Modal>
  </>
}