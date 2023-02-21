import {
  ArrowDown
} from 'react-feather'
import AppBody from '@/components/AppBody'
import Title from '@/components/Title'
import {
  Card,
  Container,
  theme,
  Button,
  Row,
  Spacer 
} from "@nextui-org/react"
import {t} from 'i18next'

import CurrencySelect from "@/components/CurrencySelect"
import { useCallback, useEffect, useState } from 'react'
import { useActiveReact } from '@/hooks/useActiveReact'
 
export default function USDC () {
  const {chainId} = useActiveReact()
  const [inputValue, setInputValue] = useState('')
  
  const getTokenlist = useCallback(() => {
    const url = `https://l2api.anyswap.exchange/v4/tokenlist/usdc/${chainId}`
    fetch(url).then(res => res.json()).then((result:any) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
  }, [chainId])

  useEffect(() => {
    getTokenlist()
  }, [chainId])

  return <>
    <AppBody>
      <Container xs css={{
        paddingTop: '50px'
      }}>
        <Title title='Router' />
        <Card css={{
          maxW: '670px',
          width: '100%'
        }}>
          <Card.Header>
          </Card.Header>
          <Card.Body>
            <CurrencySelect
              value={inputValue}
              label='From'
              selectChain={chainId}
              onUserInput={(value) => {
                setInputValue(value)
              }}
            />
            <Row css={{paddingLeft: '10px', margin: '15px 0'}}>
              <Button
                auto
                color="secondary"
                icon={<ArrowDown width="16" height="16" />}
              />
            </Row>
            <CurrencySelect
              value={inputValue}
              label='To'
              selectChain={'56'}
              onUserInput={(value) => {
                setInputValue(value)
              }}
            />
          </Card.Body>
          <Card.Footer css={{flexWrap: 'wrap'}}>
            <Row justify='center' align='center'>
              <Button size="lg" color="secondary">
                {t('swap')}
              </Button>
            </Row>
            <Spacer y={2} /> 
          </Card.Footer>
        </Card>
      </Container>
    </AppBody>
  </>
}