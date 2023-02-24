
import { useCallback, useEffect, useMemo } from 'react'
// import useInterval from '@/hooks/useInterval'
// import {
//   useFeeCallback
// } from './hooks'

import {
  Card,
  Text,
  theme,
  useTheme
} from '@nextui-org/react'

import {
  useActiveReact
} from '@/hooks/useActiveReact'

import config from '@/config'


export default function Reminder ({
  selectDestCurrency,
  selectDestChain,
  srcFee
}: {
  selectDestCurrency:any,
  selectDestChain: any
  srcFee: any
}) {
  const {chainId} = useActiveReact()
  const {isDark} = useTheme()
  const bgColor = useMemo(() => {
    return isDark ? '#2b314f' : '#f2edff'
  }, [isDark])

  if (srcFee) {
    return (<>
      {/* <Card css={{ $$cardColor: '$colors$purple100' }}> */}
      <Card variant="flat" css={{
        background: bgColor,
        boxShadow: 'none'
      }}>
        <Card.Body>
          <Text size={15} color={theme.colors.secondary.value}>
            Fee: {srcFee} {config.chainInfo[chainId].symbol}
          </Text>
        </Card.Body>
      </Card>
    </>)
  }
  return null
}