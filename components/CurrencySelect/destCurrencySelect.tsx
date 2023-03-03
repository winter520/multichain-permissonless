import {
  useState,
  useCallback,
  createRef,
  useMemo
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
  Modal
  // Input
} from "@nextui-org/react"

import { t } from "i18next"
// import {ChevronDown} from 'react-feather'
import {
  ChevronDown
} from '@/components/Icon'
import InputNumber from '@/components/Input'
import SearchInput from '@/components/Input/searchInput'

import {
  OptionCardClickable,
  Option,
  NetWorkList,
  LoadingBox
} from '@/components/Header/SelectNetwork'
import {LazyList} from "@/components/Lazyload/LazyList"
import Loading from "@/components/Lazyload/Loading"

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
  destChainArr: Array<any>
  selectCurrency: any
  onCurrencySelect: (currency: any) => void
  onChainSelect: (chainId: any) => void
  id?: string | undefined | number
  label?: string
  selectChain?: ChainId | string | number
  placeholder?: string
}

function ChainListBox ({
  useChainId,
  changeNetwork,
  searchQuery,
  chainListArr = [],
  size
}: {
  useChainId: any
  changeNetwork: (value:any) => void
  searchQuery: any
  chainListArr: any
  size?: number
}) {
  const pageSize = size || 20
  const boxRef = createRef<any>()
  const watchRef = createRef<any>()

  const comparator = (a:any, b:any) => {
    if (a.networkName > b.networkName) {
      return 1
    }
    return -1
  }
  const chainList = useMemo(() => {
    const arr:any = []
    // const starArr:any = []
    for (const c of chainListArr) {
      arr.push(config.chainInfo[c])
    }
    return arr.sort(comparator)
  }, [chainListArr])
  function List({ records }: { records?: any [] }) {
    // console.log(records)
    return (<>{
      records?.map((item:any, index:any) => {
        if (
          (
            searchQuery
            && item
            && (
              item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
              || item.symbol.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
              || (item.networkName && item.networkName.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
              || searchQuery.toLowerCase() === item.chainID.toString().toLowerCase()
            )
          )
          || !searchQuery
        ) {
          return (
            <OptionCardClickable key={index} className={ useChainId?.toString() === item?.chainID?.toString()  ? 'active' : ''}>
              <Option curChainId={item.chainID} selectChainId={useChainId} changeNetwork={(val) => {
                // console.log(val)
                changeNetwork(val)
              }}></Option>
            </OptionCardClickable>
          )
        }
        return
      })
    }
    </>);
  }
  return (
    <>
      <NetWorkList ref={ boxRef }>
        {/* <LazyList records={ spportChainArr } pageSize={ pageSize } */}
        <LazyList records={ chainList } pageSize={ pageSize } boxRef={ boxRef } watchRef={ watchRef } list={ List }>
          <LoadingBox ref={ watchRef }>
            <Row justify='center' align='center'>
              <Loading></Loading>
            </Row>
          </LoadingBox>
        </LazyList>
      </NetWorkList>
    </>
  )
}

export default function DestCurrencySelect ({
  value,
  tokenlist=[],
  destChainArr=[],
  selectCurrency,
  onCurrencySelect,
  onChainSelect,
  id,
  label,
  selectChain,
  placeholder
}: CurrencySelectProps) {
  const { isDark } = useTheme();
  const [modalOpen, setModalOpen] = useState(false)
  const [destModalOpen, setDestModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
    setDestModalOpen(false)
  }, [setModalOpen])

  const handleInput = useCallback((input:any) => {
    // const input = event.target.value
    setSearchQuery(input)
    // fixedList.current?.scrollTo(0)
  }, [])

  const handleCurrencySelect = useCallback(
    (item:any) => {
      if (onChainSelect) {
        onChainSelect(item.chainID)
        handleDismissSearch()
      }
    },
    [onChainSelect]
  )

  return <>
    <InputPanel id={id}>
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
              onClick={() => setDestModalOpen(true)}
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
          <CurrencyInput>
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
      selectDestChainId={selectChain}
      chainId={selectChain}
    />
    <Modal
      scroll
      closeButton
      // width="600px"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={destModalOpen}
      onClose={() => setDestModalOpen(false)}
    >
      <Modal.Header css={{
        flexWrap:'wrap',
        borderBottom: '1px solid ' + theme.colors.gray100.value,
        paddingBottom: '0px',
      }}>
        <Row>
          <Col>
            <SearchInput
              value={searchQuery}
              onUserInput={handleInput}
              placeholder={t("selectNetwork") ?? ''}
            />
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body css={{
        minHeight: '50vh'
      }}>
        <ChainListBox
          useChainId={selectChain}
          changeNetwork={handleCurrencySelect}
          searchQuery={searchQuery}
          chainListArr={destChainArr}
        />
      </Modal.Body>
    </Modal>
  </>
}