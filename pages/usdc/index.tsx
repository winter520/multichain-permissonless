import {
  ArrowDown
} from 'react-feather'
import AppBody from '@/components/AppBody'
import Title from '@/components/Title'
import {
  Card,
  Container,
  theme
} from "@nextui-org/react"

import CurrencySelect from "@/components/CurrencySelect"
import { useState } from 'react'
 
export default function USDC () {
  const [inputValue, setInputValue] = useState('')
  

  return <>
    <AppBody>
      <Container xs css={{
        paddingTop: '50px'
      }}>
        <Title title='Router' />
        <Card css={{
          backgroundColor: ''
        }}>
          <Card.Header>
          </Card.Header>
          <Card.Body>
            <CurrencySelect
              value={inputValue}
              label='From'
              selectChain={'1'}
              onUserInput={(value) => {
                setInputValue(value)
              }}
            />
            <ArrowDown />
          </Card.Body>
          <Card.Footer>

          </Card.Footer>
        </Card>
      </Container>
    </AppBody>
  </>
}