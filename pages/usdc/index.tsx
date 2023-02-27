import { useCallback, useEffect, useMemo, useState } from 'react'
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
import DestCurrencySelect from "@/components/CurrencySelect/destCurrencySelect"
import ErrorCard from '@/components/ErrorTip/errorCard'

import { useActiveReact } from '@/hooks/useActiveReact'
import useInterval from '@/hooks/useInterval'
import {
  useFeeCallback,
  useSwapCallback,
  useApproveCallback,
  ApprovalState
} from '@/hooks/page/usdc/useUSDCHooks'

import {
  useUSDCTokenList
} from '@/state/lists/hooks'
import {
  useTokenBalances
} from '@/state/wallet/hooks'

import {
  getParams
} from '@/utils'
import {
  BigAmount
} from '@/utils/bigNumber/index'

import Reminder from './reminder'
 
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
  const {chainId, account} = useActiveReact()
  const { isDark } = useTheme();
  
  const [inputValue, setInputValue] = useState('')
  
  const [tokenlist, setTokenlist] = useState<any>([])
  const [selectCurrency, setSelectCurrency] = useState<any>('')
  const [selectDestChain, setSelectDestChain] = useState<any>('')
  const [destChainArr, setDestChainArr] = useState<any>('')
  const [selectDestCurrencyList, setSelectDestCurrencyList] = useState<any>()
  const [selectDestCurrency, setSelectDestCurrency] = useState<any>()

  const [srcFee, setSrcFee] = useState<any>()

  const initToken:any = getParams('fromToken') ? getParams('fromToken') : ''

  const usdcTokenList = useUSDCTokenList(chainId)
  const tokenBalance = useTokenBalances(account, [selectCurrency])

  const useBalance = useMemo(() => {
    return tokenBalance?.[selectCurrency?.address]
  }, [tokenBalance, selectCurrency])
  // useEffect(() => {
  //   console.log(tokenBalance)
  //   console.log(tokenBalance?.[selectCurrency?.address]?.toExact())
  // }, [tokenBalance, selectCurrency])

  const approveSpender = useMemo(() => {
    if (selectDestCurrency?.isApprove) {
      return selectDestCurrency.spender
    }
    return undefined
  }, [selectDestCurrency])

  const {approvelState, approve} = useApproveCallback(
    account,
    approveSpender,
    inputValue,
    selectCurrency
  )
  
  const {getConfigFee} = useFeeCallback(selectDestCurrency)
  const {excute} = useSwapCallback(
    selectCurrency,
    selectDestCurrency,
    srcFee?.getAmount(),
    inputValue,
    account,
    selectDestChain
  )

  const initTokenKey = useMemo(() => {
    if (isNaN(chainId)) {
      return initToken ? (chainId + initToken).toLowerCase() : ''
    } else {
      return initToken ? ('evm' + initToken).toLowerCase() : ''
    }
  }, [initToken, chainId])

  let initToChainId:any = getParams('toChainId') ? getParams('toChainId') : ''
  initToChainId = initToChainId ? initToChainId.toLowerCase() : ''

  useEffect(() => {
    const arr = []
    if (selectCurrency) {
      const destList = selectCurrency?.destChains
      for (const c in destList) {
        arr.push(c)
      }
      const initDestChain = arr[0]
      setDestChainArr(arr)
      setSelectDestChain(initDestChain)
      const destCurrenyArr = []
      for (const tokenKey in destList[initDestChain]) {
        destCurrenyArr.push({
          ...destList[initDestChain][tokenKey],
          tokenKey
        })
      }
      setSelectDestCurrencyList(destCurrenyArr)
      setSelectDestCurrency(destCurrenyArr[0])
    }
  }, [selectCurrency])

  useEffect(() => {
    const arr = []
    for (const tokenKey in usdcTokenList) {
      const item = usdcTokenList[tokenKey]
      arr.push({
        ...item,
        tokenKey
      })
    }
    // console.log(arr)
    setTokenlist(arr)
  }, [usdcTokenList])

  useEffect(() => {
    if (initTokenKey && usdcTokenList[initTokenKey]) {
      setSelectCurrency(usdcTokenList[initTokenKey])
    } else {
      const firstCurrencyKey = Object.keys(usdcTokenList).length > 0 ? Object.keys(usdcTokenList)[0] : ''
      if (firstCurrencyKey) {
        setSelectCurrency(usdcTokenList[firstCurrencyKey])
      }
    }
  }, [initTokenKey, usdcTokenList])


  const getSrcFee = useCallback(() => {
    getConfigFee(selectDestChain).then((res:any) => {
      // console.log(res)
      if (res) {
        const fee = BigAmount.format(18, res)
        // console.log(fee.toExact())
        setSrcFee(fee)
      } else {
        setSrcFee('')
      }
    })
  }, [selectDestChain, getConfigFee])

  useEffect(() => {
    if (selectDestCurrency?.configToken) {
      getSrcFee()
    }
  }, [selectDestCurrency, selectDestChain, getConfigFee, getSrcFee])

  useInterval(getSrcFee, 1000 * 3)

  const errorTip = useMemo(() => {
    if (inputValue) {
      if (inputValue === '0') {
        return {
          state: 'Error',
          tip: t('inputNotValid')
        }
      } else if (Number(inputValue) > Number(useBalance?.toExact())) {
        return {
          state: 'Error',
          tip: t('Insufficient', {symbol: selectCurrency?.symbol})
        }
      } else if (!srcFee) {
        return {
          state: 'Loading',
          tip: t('FeeLoading')
        }
      }
    }
    return undefined
  }, [useBalance, inputValue, selectCurrency, srcFee])

  const isCrosschain = useMemo(() => {
    if (
      !inputValue
      || errorTip
    ) return true
    return false
  }, [errorTip, inputValue])

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
          <Card.Body>
            <CurrencySelect
              value={inputValue}
              balance={useBalance}
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
            <DestCurrencySelect
              value={inputValue}
              tokenlist={selectDestCurrencyList}
              destChainArr={destChainArr}
              label='To'
              selectChain={selectDestChain}
              selectCurrency={selectDestCurrency}
              onCurrencySelect={(currency) => {
                console.log(currency)
                setSelectDestCurrency(currency)
              }}
              onChainSelect={(destChainId) => {
                console.log(destChainId)
                setSelectDestChain(destChainId)
              }}
            />
            <Reminder
              selectDestCurrency={selectDestCurrency}
              selectDestChain={selectDestChain}
              srcFee={srcFee?.toExact()}
            />
            <ErrorCard errorTip={errorTip} />
            <Spacer y={1} /> 
            <Row justify='center' align='center' css={{
              padding: '0 10px'
            }}>
              {
                approvelState && [ApprovalState.NOT_APPROVED, ApprovalState.PENDING].includes(approvelState) ? (
                  <>
                    <SwapButton disabled={ApprovalState.PENDING === approvelState} color={isDark ? 'gray' : 'secondary'} size='swap' onClick={() => {
                      if (approve && !errorTip) approve()
                    }}>
                      {ApprovalState.PENDING === approvelState ? t('Approvel') : t('Approved')}
                    </SwapButton>
                  </>
                ) : (
                  <SwapButton disabled={isCrosschain} color={isDark ? 'gray' : 'secondary'} size='swap' onClick={() => {
                    if (excute && !errorTip) excute()
                  }}>
                    {t('swap')}
                  </SwapButton>
                )
              }
            </Row>
            <Spacer y={1} />
          </Card.Body>
        </Card>
      </Container>
    </AppBody>
  </>
}