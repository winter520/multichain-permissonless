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
  Spacer,
  useTheme,
  styled
} from "@nextui-org/react"
import {t} from 'i18next'

import CurrencySelect from "@/components/CurrencySelect"
import { useCallback, useEffect, useState } from 'react'
import { useActiveReact } from '@/hooks/useActiveReact'
 
const SwapButton = styled(Button, {
  variants: {
    size: {
      swap: {
        width: '100%',
        height: '50px'
      }
    },
    color: {
      'gray': {
        background: '$gray500',
        color: theme.colors.white.value, 
        border: '$space$1 solid transparent',
        '&:hover': {
          background: '$gray400',
        },
        '&:active': {
          background: '$gray300',
        },
        '&:focus': {
          borderColor: '$gray400',
        },
      },
      secondary: {
        background: theme.colors.secondary.value,
        color: theme.colors.white.value, 
        border: '$space$1 solid transparent',
        '&:hover': {
          background: theme.colors.secondarySolidHover.value,
        },
        '&:active': {
          background: theme.colors.secondaryBorderHover.value,
        },
        '&:focus': {
          borderColor: theme.colors.secondaryBorderHover.value,
        },
      },
    }
  }
})


export default function USDC () {
  const {chainId} = useActiveReact()
  const { isDark } = useTheme();
  const [inputValue, setInputValue] = useState('')
  
  const [tokenlist, setTokenlist] = useState<any>([])
  const [selectCurrency, setSelectCurrency] = useState<any>('')

  const getTokenlist = useCallback(() => {
    const url = `https://l2api.anyswap.exchange/v4/tokenlistV4/${chainId}`
    // const url = `https://l2api.anyswap.exchange/v4/tokenlist/usdc/${chainId}`
    fetch(url).then(res => res.json()).then((result:any) => {
      console.log(result)
      const arr = []
      for (const tokenKey in result) {
        const item = result[tokenKey]
        arr.push({
          ...item,
          tokenKey
        })
      }
      console.log(arr)
      setTokenlist(arr)
    }).catch((error) => {
      console.log(error)
    })
  }, [chainId])

  useEffect(() => {
    // console.log(theme.colors.purple100)
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
              tokenlist={tokenlist}
              selectChain={chainId}
              selectCurrency={selectCurrency}
              onUserInput={(value) => {
                setInputValue(value)
              }}
              onCurrencySelect={(currency) => {
                console.log(currency)
                setSelectCurrency(currency)
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
              tokenlist={[]}
              label='To'
              selectChain={'56'}
              onUserInput={(value) => {
                setInputValue(value)
              }}
            />
          </Card.Body>
          <Card.Footer css={{flexWrap: 'wrap'}}>
            <Row justify='center' align='center' css={{
              padding: '0 10px'
            }}>
              <SwapButton color={isDark ? 'gray' : 'secondary'} size='swap'>
                {t('swap')}
              </SwapButton>
            </Row>
            <Spacer y={2} /> 
          </Card.Footer>
        </Card>
      </Container>
    </AppBody>
  </>
}