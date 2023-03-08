
import AppBody from "@/components/AppBody"
import {
  useContract,
} from '@/hooks/useContract'
import { useCallback } from "react"
import { useActiveReact } from '@/hooks/useActiveReact'
import {
  Button,
  Card,
  Row,
  Text,
  theme,
  Input
} from '@nextui-org/react'
import {
  t
} from 'i18next'

import {
  SENDTXTYPE,
  useSendTraction
} from '@/hooks/useSendTraction'

const abi = [
  {
    "inputs": [
      
    ],
    "name": "claim",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export default function ZkClaim () {
  const {account} = useActiveReact()
  const {sendTraction} = useSendTraction()
  const contract = useContract('0xd4615151D874C97d50b413911b2ba52367042368', abi)

  const claim = useCallback(() => {
    if (contract) {
      const st = () => {
        return contract.claim()
      }
      sendTraction({
        callback: st,
        type: SENDTXTYPE.CLAIM
      })
      // contract.claim().then((res:any) => {
      //   console.log(res)
      // }).catch((error:any) => {
      //   console.log(error)
      // })
    }
  }, [contract])
  return (
    <AppBody>
      <Row justify="center" align="center" css={{
        padding: '100px 0',
      }}>
        <Card css={{
          p: "$6",
          maxW: '570px',
          width: '100%'
        }}>
          <Card.Header>
            <Row justify="center" align="center" css={{
              flexWrap: 'wrap'
            }}>
              <Text b size="$3xl" css={{width:'100%', textAlign: 'center'}}>zkRouter Faucet</Text>
              <Text b size="$md" color={theme.colors.gray500.value}>Feel free to get test ZKR to your wallet</Text>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row justify="center" align="center" css={{
              padding: '50px 0 100px',
              flexWrap: 'wrap'
            }}>
              <Input value={account?? ''} disabled size="lg" css={{
                width: '80%',
                marginBottom: '100px'
              }} />
              <Button onClick={() => claim()} color="secondary" size="lg" css={{
                width: '80%',
                marginBottom: '20px'
              }}>
                {t('Claim')}
              </Button>
              <Text color="success">
                You can request 10 Testnet ZKR once per address.
              </Text>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </AppBody>
  )
}