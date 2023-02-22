import {
  useMemo,
  createRef
} from 'react'
import { Star } from 'react-feather'

import config from '@/config';
import { useActiveReact } from '@/hooks/useActiveReact';
import {
  styled,
  Grid,
  theme,
  Row,
  Text,
  Tooltip,
  useTheme
} from '@nextui-org/react';
import Loading from "@/components/Lazyload/Loading"
import TokenLogo from '@/components/TokenLogo';
import { LazyList } from '@/components/Lazyload/LazyList';

import {
  useStarToken
} from '@/state/user/hooks'

const ListBox = styled('div', {

})

const TokenInfoView = styled('div', {

})

export const IconButton = styled('button', {
  dflex: 'center',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: '0',
  margin: '0',
  bg: 'transparent',
  transition: '$default',
  '&:hover': {
    opacity: '0.8'
  },
  '&:active': {
    opacity: '0.6'
  }
});

const defaultIconStroke = theme.colors.gray800.value
const StyledStarIcon = styled(Star, {
  width: '18px',
  height: '18px',
  "& > *": {
    stroke: defaultIconStroke
  },
  "&.star": {
    "> *": {
      stroke: theme.colors.warning.value,
      fill: theme.colors.warning.value,
    }
  }
})

function CurrencyRow ({
  currency,
  onSelect,
  isSelected,
  allBalances,
  NativeBalance,
  selectDestChainId
}: {
  currency: any
  onSelect: () => void
  isSelected: boolean
  allBalances?: any
  NativeBalance?: any
  selectDestChainId?: any
}) {
  const {starTokenList, onChangeStarToken} = useStarToken()
  const { isDark } = useTheme();
  return (
    <>
      <Grid.Container
        gap={0}
        justify="center"
        css={{
          padding: '6px 0',
          borderBottom: '1px solid ' + theme.colors.gray200.value,
          cursor: 'pointer'
        }}
        onClick={() => (onSelect())}
      >
        <Grid xs={10}>
          <Row justify="flex-start" align="center" css={{
            width:'100%'
          }}>
            <TokenLogo
              symbol={currency.symbol}
              logoUrl={currency?.logoUrl}
              size={'sm'}
              style={{
                marginRight: '10px'
              }}
            ></TokenLogo>
            <TokenInfoView>
              <Row justify="flex-start" align="center">
                <Text b color={isDark ? theme.colors.gray500.value : theme.colors.gray800.value} size="$md">{currency.symbol}</Text>
                <Tooltip content="Favorites">
                  <IconButton onClick={(event:any) => {
                    onChangeStarToken(currency.address)
                    event.stopPropagation()
                  }} css={{
                    marginLeft: '10px'
                  }}>
                    <StyledStarIcon className={starTokenList?.[currency.address] ? 'star' : ''}/>
                  </IconButton>
                </Tooltip>
              </Row>
              <Text color={isDark ? theme.colors.gray800.value : theme.colors.gray500.value} size="$xs">{currency.name}</Text>
            </TokenInfoView>
          </Row>
        </Grid>
        <Grid xs={2}>
          
        </Grid>
      </Grid.Container>
    </>
  )
}

export default function CurrencyList ({
  tokenlist,
  onCurrencySelect,
  selectCurrency,
  allBalances,
  selectDestChainId,
  size
}: {
  tokenlist: any[]
  onCurrencySelect: (currency: any) => void
  selectCurrency?: any | null
  allBalances?: any
  selectDestChainId?: any
  size?: number
}) {
  const {chainId} = useActiveReact()
  const pageSize = size || 20
  const boxRef = createRef<any>()
  const watchRef = createRef<any>()

  const NativeBalance = ''

  const htmlNodes = useMemo(() => {
    const arr = []
    // const starArr = []
    const ethNode:any = []
    for (const obj of tokenlist) {
      const isNativeToken = obj?.tokenType === 'NATIVE' ? true : false
      if (
        isNativeToken
        || obj?.address === config.chainInfo[chainId]?.symbol
      ) {
        ethNode.push(obj)
        // continue
      }
      else {
        arr.push(obj)
      }
    }
    return [
      ...ethNode,
      ...arr
    ]
  }, [tokenlist, chainId])


  function List({ records }: { records?: any [] }) {
    return (<>{
      records?.map((item:any, index:any) =>{
        const currency: any = item
        const isSelected = Boolean(selectCurrency?.tokenKey?.toLowerCase() === currency?.tokenKey?.toLowerCase())
        const handleSelect = () => onCurrencySelect(currency)
        return (
          <CurrencyRow
            currency={currency}
            isSelected={isSelected}
            onSelect={handleSelect}
            key={index}
            allBalances={allBalances}
            NativeBalance={NativeBalance}
            selectDestChainId={selectDestChainId}
          />
        )
      })
    }
    </>);
  }

  return (
    <>
      <ListBox ref={ boxRef }>
        <LazyList records={ htmlNodes } pageSize={ pageSize }
          boxRef={ boxRef } watchRef={ watchRef } list={ List }>
          <Loading></Loading>
        </LazyList>
      </ListBox>
    </>
  )
}