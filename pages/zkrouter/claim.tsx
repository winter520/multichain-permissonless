
import AppBody from "@/components/AppBody"
import {
  useContract,
} from '@/hooks/useContract'
import { useCallback } from "react"
import {
  Button,
  Row
} from '@nextui-org/react'
import {
  t
} from 'i18next'

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

  const contract = useContract('0xd29c3915d84e0127c4eee95ec99eda9b88c034e5', abi)

  const claim = useCallback(() => {
    if (contract) {
      contract.claim().then((res:any) => {
        console.log(res)
      }).catch((error:any) => {
        console.log(error)
      })
    }
  }, [contract])
  return (
    <AppBody>
      <Row justify="center" align="center" css={{
        padding: '100px 0'
      }}>
        <Button onClick={() => claim()}>
          {t('Claim')}
        </Button>
      </Row>
    </AppBody>
  )
}