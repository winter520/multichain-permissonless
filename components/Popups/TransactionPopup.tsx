import React, { useContext } from 'react'
import { AlertCircle, CheckCircle } from 'react-feather'
import {t} from 'i18next'
// import styled, { ThemeContext } from 'styled-components'
import { useActiveReact } from '@/hooks/useActiveReact'
// import { TYPE } from '../../theme'
// import { ExternalLink } from '../../theme/components'
import { getEtherscanLink } from '@/utils'
// import { AutoColumn } from '../Column'
// import { AutoRow } from '../Row'

import config from '@/config'

import {
  Row,
  Col,
  styled,
  Text,
  theme
} from '@nextui-org/react'
import Link from 'next/link';

const RowNoFlex = styled(Row, {
  flexWrap: 'nowrap'
})
// const RowNoFlex = styled(AutoRow)`
//   flex-wrap: nowrap;
// `

export default function TransactionPopup({
  hash,
  success,
  summary
}: {
  hash: string
  success?: boolean
  summary?: string
}) {
  const { chainId } = useActiveReact()
  // const theme = useContext(ThemeContext)
  // console.log(summary)
  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        {success ? <CheckCircle color={theme.colors.success.value} size={24} /> : <AlertCircle color={theme.colors.error.value} size={24} />}
      </div>
      <Col>
        <Text>{summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}</Text>
        {chainId && (
          <>
            {
              summary?.indexOf('Cross bridge') === 0 ? (
                <>
                  <Text size="$sm">{t('txnsTip')}：</Text>
                  <Link href={config.explorer + '/tx?params=' + hash}>
                    <Text size="$sm" color='primary'>
                      {config.explorer + '/tx?params=' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}
                    </Text>
                  </Link>
                </>
              ) : (
                <Link href={getEtherscanLink(chainId, hash, 'transaction')}>
                  <Text size="$sm">{t('ViewOn')}</Text>
                  <Text size="$sm" color='primary'>{config.chainInfo[chainId].name}</Text>
                  </Link>
              )
            }
            {/* <ExternalLink href={getEtherscanLink(chainId, hash, 'transaction')}>{t('ViewOn')} {config.getCurChainInfo(chainId).name}</ExternalLink> */}
          </>
        )}
      </Col>
    </RowNoFlex>
  )
}
