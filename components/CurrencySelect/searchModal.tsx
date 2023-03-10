import {
  Modal,
  theme,
  Row,
  Col,
  Button,
  Input,
  styled
} from '@nextui-org/react'
import { useState, useEffect, useCallback, KeyboardEvent, useMemo } from 'react'
import {t} from 'i18next'

import {
  useChangeStarTab,
  useStarToken
} from '@/state/user/hooks'
import config from '@/config'
import {
  MAIN_COIN_SORT
} from '@/config/constant'

import {
  isAddress
} from '@/utils/isAddress'


import SearchInput from '@/components/Input/searchInput'
import CommonBases from './commonBase'
import CurrencyList from './currencyList'

import {
  TabButton
} from './styled'

interface CurrencySearchModalProps {
  isOpen: boolean
  onDismiss: () => void
  selectCurrency?: any
  onCurrencySelect: (currency: any) => void
  tokenlist?: any
  chainId?: any
  allBalances?: any
  selectDestChainId?: any
}

export default function SearchModal({
  isOpen,
  onDismiss,
  onCurrencySelect,
  selectCurrency,
  tokenlist = [],
  chainId,
  selectDestChainId
}: CurrencySearchModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const {starTabIndex, onChangeStarTab} = useChangeStarTab('TOKEN')
  const {starTokenList} = useStarToken()
  
  const [mainTokenList, setMainTokenList] = useState<any>([])
  const [formatTokenlist, setFormatTokenlist] = useState<any>([])

  const starTokenListStr = useMemo(() => {
    return JSON.stringify(starTokenList)
  }, [starTokenList])

  useEffect(() => {
    // const list:any = {}
    const arr:any = []
    const mainarr:any = []
    // console.log(111)
    // console.log(allTokens)
    // console.log(starTokenList)
    const starList = starTokenListStr ? JSON.parse(starTokenListStr) : {}
    for (const obj of tokenlist) {
      const token:string = obj.address
      if (!obj.name || !obj.symbol || config.initConfig.hiddenCoin.includes(token)) continue
      if (
        !searchQuery
        || (
          token.toLowerCase() === searchQuery.toLowerCase()
          || obj.name.toLowerCase().indexOf(searchQuery.toLowerCase())
          || obj.symbol.toLowerCase().indexOf(searchQuery.toLowerCase())
        )
      ) {
        if (starTabIndex === 0 && starList[token]) {
          arr.push(obj)
        } else if (starTabIndex === 1 || obj.type) {
          arr.push(obj)
        }
      }
      // list[token] = obj
      // arr.push(data)
      if (
        (obj.symbol === 'USDT' && chainId?.toString() === '250')
        || (obj.symbol === 'fUSDT' && chainId?.toString() === '56')
        || (obj.address.toLowerCase() === '0xf5c8054efc6acd25f31a17963462b90e82fdecad' && chainId?.toString() === '250')
        || (obj.address === '0x1ccca1ce62c62f7be95d4a67722a8fdbed6eecb4' && chainId?.toString() === '42161')
        || ['MultichainUSDC', 'MultichainDAI'].includes(obj.name)
        || (['MultichainBUSD'].includes(obj.name) && ['137', '43114', '56'].includes(chainId?.toString()))
      ) continue
      
      if (MAIN_COIN_SORT[obj.symbol]) {
        mainarr.push({
          mainSort: MAIN_COIN_SORT[obj.symbol].sort,
          ...obj
        })
      }
    }
    setFormatTokenlist(arr)
    setMainTokenList(mainarr)
  }, [tokenlist, chainId, starTabIndex, starTokenListStr, searchQuery])

  const handleInput = useCallback((event:any) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    // fixedList.current?.scrollTo(0)
  }, [])

  const handleCurrencySelect = useCallback(
    (currency: any) => {
      if (onCurrencySelect) {
        onCurrencySelect(currency)
        onDismiss()
      }
    },
    [onCurrencySelect]
  )
    // console.log(isOpen)
  return <>
    <Modal
      scroll
      closeButton
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={isOpen}
      onClose={onDismiss}
    >
      <Modal.Header css={{
        flexWrap:'wrap',
        borderBottom: '1px solid ' + theme.colors.gray100.value,
        paddingBottom: '0px',
      }}>
        <Row css={{
          paddingBottom: '6px',
        }}>
          <Col>
            <SearchInput
              value={searchQuery}
              onUserInput={handleInput}
              placeholder={t("selectNetwork") ?? ''}
            />
          </Col>
        </Row>
        {
          selectDestChainId ? '' : (
            <>
              <CommonBases
                onSelect={handleCurrencySelect}
                selectCurrency={selectCurrency}
                tokenList={mainTokenList}
              />
              <Row justify="flex-start" align='center'>
                <Col css={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}>
                  <Button.Group color="secondary" light size="sm" ghost css={{
                    marginLeft: '0',
                    marginRight: '0'
                  }}>
                    <TabButton color={starTabIndex === 0 ? 'active' : 'default'} onClick={() => onChangeStarTab(0)}>My Favorites</TabButton>
                    <TabButton color={starTabIndex === 1 ? 'active' : 'default'} onClick={() => onChangeStarTab(1)}>All Tokens</TabButton>
                  </Button.Group>
                </Col>
              </Row>
            </>
          )
        }
      </Modal.Header>
      <Modal.Body css={{
        minHeight: '50vh'
      }}>
        <CurrencyList
          tokenlist={formatTokenlist}
          selectCurrency={selectCurrency}
          onCurrencySelect={handleCurrencySelect}
          allBalances={{}}
          selectDestChainId={selectDestChainId}
        />
      </Modal.Body>
    </Modal>
  </>
}