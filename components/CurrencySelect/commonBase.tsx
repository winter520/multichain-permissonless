import {
  Row,
  Col,
  styled,
  Button,
  Text,
  theme
} from "@nextui-org/react"
import {
  useMemo
} from 'react'

import TokenLogo from "../TokenLogo"

const TokenView = styled(Button, {
  variants: {
    size: {
      token: {
        padding: '6px!important',
        margin: '4px',
        height: '36px'
      }
    },
    colors: {
      token: { 
        borderRadius: '$xs', // radii.xs
        border: '1px solid ' + theme.colors.gray300.value,
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

export default function CommonBases({
  onSelect,
  selectCurrency,
  tokenList
}: {
  selectCurrency?: any | null
  onSelect: (currency: any) => void
  tokenList: any
}) {

  const comparator = (a:any, b:any) => {
    if (a.mainSort > b.mainSort) {
      return 1
    }
    return -1
  }
  const viewTokenList = useMemo(() => {
    if (tokenList) {
      return tokenList.sort(comparator)
    }
    return []
  }, [tokenList])
  return (
    <>
      <Row justify="flex-start" align="center" wrap="wrap" css={{
        marginTop: '6px',
      }}>
        {viewTokenList.map((item: any) => {
          const selected = selectCurrency?.tokenKey === item.tokenKey
          return (
            <TokenView auto colors="token" size="token" onClick={() => !selected && onSelect(item)} disabled={selected}  key={item?.tokenKey}>
              <TokenLogo symbol={item?.symbol} logoUrl={item?.logoUrl} style={{ marginRight: 8 }} />
              <Text b>
                {item?.symbol}
              </Text>
            </TokenView>
          )
        })}
      </Row>
    </>
  )
}