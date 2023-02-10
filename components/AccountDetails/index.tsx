import React from 'react'
import {
  Modal,
  Button,
  Text,
  Grid,
  Row,
  Card,
  styled
} from "@nextui-org/react";

import {
  useModalOpen,
  useAccountModalToggle
} from "@/state/application/hooks"
import {
  ApplicationModal,
} from "@/state/application/actions"

const AccountInfoBox = styled('div', {
  padding: '0 0px',
})

export default function AccountDetails() {
  const accountModalOpen = useModalOpen(ApplicationModal.ACCOUNT)
  const toggleAccountModal = useAccountModalToggle()
  return <>
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={accountModalOpen}
      onClose={toggleAccountModal}
    >
      <Modal.Header>
        <Row wrap="wrap" justify="flex-start" align="center">
          <Text 
            h1
            size={16}
            css={{
              // textGradient: "45deg, $blue600 -20%, $pink600 50%",
              paddingLeft: "12px"
            }}
            weight="bold"
          >Account</Text>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <AccountInfoBox>
          <Card variant="bordered" borderWeight="light" isPressable>
            <Card.Header>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text
                  size={14}
                  css={{
                    // paddingLeft: "12px"
                  }}
                >Account</Text>
                <Button ghost color="secondary" auto size="sm">
                  Change
                </Button>
              </Row>
            </Card.Header>
            <Card.Body>
              <Text>A pressable card.</Text>
            </Card.Body>
          </Card>
        </AccountInfoBox>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  </>
}