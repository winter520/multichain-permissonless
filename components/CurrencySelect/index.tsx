
import config from "@/config"
import { ChainId } from "@/config/chainConfig/chainId"
import {
  styled,
  Card,
  Row,
  Col,
  Button,
  Spacer,
  theme,
  useTheme,
  // Input
} from "@nextui-org/react"

import { t } from "i18next"
// import {ChevronDown} from 'react-feather'
import {
  ChevronDown
} from '@/components/Icon'
import InputNumber from '@/components/NumericalInput'

import TokenLogo from "../TokenLogo"


const InputPanel:any = styled('div', {
  width: '100%',
  // padding: '30px'
})


const ChainName = styled(Button, {
  variants: {
    size: {
      chain: {
        fontWeight: 'bold',
      }
    },
    colors: {
      chain: { 
        borderRadius: '$xs', // radii.xs
        border: '1px solid #524DFB',
        background: 'none',
        boxShadow: 'none',
        
        '&:hover': {
          background: 'none',
        },
        '&:active': {
          background: 'none',
        },
        '&:focus': {
          background: 'none',
        },
      }
    }
  },
  '& .common.light': {
    color: '#524DFB',
  },
  '& .common.dark': {
    color: theme.colors.white.value,
  },
})
const BalanceView = styled(Button, {
  variants: {
    size: {
      balance: {
      }
    },
    colors: {
      balance: { 
        borderRadius: '$xs', // radii.xs
        border: 'none',
        background: 'none',
        boxShadow: 'none',
        
        '&:hover': {
          background: 'none',
        },
        '&:active': {
          background: 'none',
        },
        '&:focus': {
          background: 'none',
        },
      }
    }
  },
  '& .common.light': {
    color: '#524DFB',
  },
  '& .common.dark': {
    color: theme.colors.white.value,
  },
})

const CurrencyInput = styled('div', {
  margin: '10px 0',
  '&.light': {
    background: 'rgba(0,0,0,.05)'
  },
  '&.dark': {
    background: '#394358'
  }
})

const TokenView = styled(Button, {
  variants: {
    size: {
      token: {
      }
    },
    colors: {
      token: { 
        borderRadius: '$xs', // radii.xs
        border: 'none',
        background: 'none',
        boxShadow: 'none',
        color: theme.colors.text.value,
        '&:hover': {
          background: 'none',
        },
        '&:active': {
          background: 'none',
        },
        '&:focus': {
          background: 'none',
        },
      }
    }
  },
  '& .common.light': {
    color: '#524DFB',
  },
  '& .common.dark': {
    color: theme.colors.white.value,
  },
})

interface CurrencySelectProps {
  value: string  // token amount
  onUserInput: (value: string) => void // user input amount
  id?: string | undefined | number
  isError?: boolean
  label?: string
  selectChain?: ChainId | string | number
  placeholder?: string
}
export default function CurrencySelect ({
  value,
  onUserInput,
  id,
  isError,
  label,
  selectChain,
  placeholder
}: CurrencySelectProps) {
  const { isDark } = useTheme();
  return <>
    <InputPanel id={id} className={isError ? 'error' : ''}>
      <Card color="custom" css={{
        background: 'none'
      }}>
        <Card.Header>
          <Row justify="space-between">
            <ChainName auto iconRight={<ChevronDown width="16" height="16" fill={isDark ? theme.colors.white.value : '#524DFB'} />} bordered color="secondary" size={'chain'}>
              <Row justify="space-between">
                <span className={"common " + (isDark ? 'dark' : 'light')}>{label ? t(label) : ''}</span>
                <Spacer x={2} />
                {selectChain ? <>
                  <Row justify="flex-start" align="center"> 
                    <TokenLogo symbol={config.chainInfo[selectChain].networkLogo ?? config.chainInfo[selectChain].symbol} style={{marginRight: '10px'}}></TokenLogo>
                    <span className={"common " + (isDark ? 'dark' : 'light')}>{config.chainInfo[selectChain].name}</span>
                  </Row>
                </> : ''}
              </Row>
            </ChainName>
            <BalanceView auto colors='balance' size='balance'>
              
            </BalanceView>
          </Row>
        </Card.Header>
        <Card.Body css={{
          paddingTop: '0' 
        }}>
          <CurrencyInput className={isDark ? 'dark' : 'light'}>
            <Row css={{width: '100%'}} align="center">
              <InputNumber
                value={value}
                onUserInput={val => {
                  onUserInput(val)
                }}
                css={{
                  fontSize: '28px!important',
                  height: '60px'
                }}
              />
              <TokenView auto iconRight={<ChevronDown width="16" height="16" fill={isDark ? theme.colors.white.value : theme.colors.text.value} />}  colors='token' size='token'>
                <TokenLogo symbol={'USDC'} style={{marginRight: '10px'}}></TokenLogo>
                USDC
              </TokenView>
            </Row>
          </CurrencyInput>
        </Card.Body>
        {/* <Card.Footer>
          
        </Card.Footer> */}
      </Card>
    </InputPanel>
  </>
}