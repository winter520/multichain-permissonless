import {
  useState,
  useCallback
} from 'react'
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
import InputNumber from '@/components/Input'

import TokenLogo from "../TokenLogo"


import {
  // useModalOpen,
  useNetworkModalToggle
} from "@/state/application/hooks"

import {
  InputPanel,
  ChainName,
  BalanceView,
  CurrencyInput,
  TokenView
} from './styled'

import SearchModal from "./searchModal"

interface CurrencySelectProps {
  value: string  // token amount
  tokenlist: Array<any>
  selectCurrency: any
  onCurrencySelect: (currency: any) => void
  id?: string | undefined | number
  label?: string
  selectChain?: ChainId | string | number
  selectDestChainId?: ChainId | string | number
  placeholder?: string
}
export default function CurrencySelect ({
  value,
  tokenlist=[],
  selectCurrency,
  onCurrencySelect,
  id,
  label,
  selectChain,
  selectDestChainId,
  placeholder
}: CurrencySelectProps) {
  const { isDark } = useTheme();
  const toggleNetworkModal = useNetworkModalToggle()
  const [modalOpen, setModalOpen] = useState(false)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return <>
    <InputPanel id={id} className={isError ? 'error' : ''}>
      <Card color="custom" css={{
        background: 'none'
      }}>
        <Card.Header>
          <Row justify="space-between">
            <ChainName
              auto
              iconRight={<ChevronDown width="16" height="16" fill={isDark ? theme.colors.white.value : '#524DFB'} />}
              bordered
              color="secondary"
              size={'chain'}
              onClick={() => toggleNetworkModal()}
            >
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
          paddingTop: '0',
          paddingBottom: '0',
        }}>
          <CurrencyInput className={isDark ? 'dark' : 'light'}>
            <Row css={{width: '100%'}} align="center">
              <InputNumber
                value={value}
                css={{
                  fontSize: '28px!important',
                  height: '60px'
                }}
                placeholder={placeholder}
                disabled={true}
              />
              <TokenView
                auto
                iconRight={<ChevronDown width="16" height="16" fill={isDark ? theme.colors.white.value : theme.colors.text.value} />}
                colors='token'
                size='token'
                onClick={() => {
                  console.log(modalOpen)
                  setModalOpen(true)
                }}
              >
                <TokenLogo symbol={selectCurrency?.symbol} logoUrl={selectCurrency?.logoUrl} style={{marginRight: '10px'}}></TokenLogo>
                {selectCurrency?.symbol}
              </TokenView>
            </Row>
          </CurrencyInput>
        </Card.Body>
      </Card>
    </InputPanel>
    <SearchModal
      isOpen={modalOpen}
      onDismiss={handleDismissSearch}
      onCurrencySelect={onCurrencySelect}
      selectCurrency={selectCurrency}
      tokenlist={tokenlist}
      selectDestChainId={selectDestChainId}
      chainId={selectChain}
    />
  </>
}