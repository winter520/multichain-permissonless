import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { t } from 'i18next';
// import styled, { ThemeContext } from 'styled-components'
import { useActiveWeb3React } from '@/hooks'
import {useActiveReact} from '@/hooks/useActiveReact'
import { AppDispatch } from '@/state'
import { clearAllTransactions } from '../../state/transactions/actions'
import { shortenAddress } from '@/utils'
// import { AutoRow } from '../Row'
import Copy from '@/components/AccountDetails/copy'
import Transaction from './Transaction'

import { getEtherscanLink } from '@/utils'
import { injected } from '@/connectors'
import Identicon from '../Identicon'
// import { ButtonSecondary } from '../Button'
import { ExternalLink as LinkIcon } from 'react-feather'
import config from '@/config'
// import { ChainId } from '../../config/chainConfig/chainId'
// import {useLoginFlow} from '../../nonevm/flow'
import {useLogoutWallet} from '@/hooks/useWallet'

import { 
  Grid,
  Button, 
  Text, 
  styled,
  theme,
  Row,
  Col,
  Card
} from "@nextui-org/react";
import Link from 'next/link'

const InfoCard = styled(Card, {

})

const LowerSection = styled('div', {

})

const AddressLink = styled(Link, {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginLeft: '10px'
})

const TransactionListWrapper = styled('div', {

})
const WalletAction = styled(Button, {
  variants: {
    size: {
      walletaction: {
        height: '$12', // space[12]
        padding: '4px 6px!important'
      }
    },
    color: {
      walletaction: {
        background: 'none', // colors.green800
        color: theme.colors.secondary.value, 
        border: '1px solid '+ theme.colors.secondaryBorder.value,
        '&:hover': {
          background: 'none',
          color: theme.colors.secondary.value,
          border: '1px solid '+ theme.colors.secondaryBorderHover.value,
        },
        '&:active': {
          background: 'none',
        },
        '&:focus': {
          borderColor: 'none',
        },
      }
    }
  }
});
const LinkStyledButton = styled(Button, {})

const ActionColor = theme.colors.gray700.value
const ActionText = styled(Text, {
  marginLeft: '5px',
  fontSize: '12px',
  color: ActionColor + '!important'
})

function renderTransactions(transactions: string[]) {
  return (
    <TransactionListWrapper>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />
      })}
    </TransactionListWrapper>
  )
}

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

export default function AccountDetails({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions
}: AccountDetailsProps) {
  const { connector } = useActiveWeb3React()
  // const theme = useContext(ThemeContext)
  const {account, chainId} = useActiveReact()
  const dispatch = useDispatch<AppDispatch>()
  // const {logoutFlow} = useLoginFlow()
  const {
    logoutWallet,
    isSupportLogout
  } = useLogoutWallet()

  function formatConnectorName() {
    return <Text css={{
      color: theme.colors.gray700.value,
    }} size="sm">{t('Connected')}</Text>
  }

  function getStatusIcon() {
    if (connector === injected) {
      return (
        <Identicon imageKey={'0x' + chainId} size={16} />
      )
    }
    return null
  }

  function changeWallet () {
    if (!isNaN(chainId)) {
      return <WalletAction
        auto
        color="walletaction"
        size="walletaction"
        onClick={() => {
          openOptions()
          // logoutWallet()
        }}
      >
        {t('Change')}
      </WalletAction>
    } else if (isSupportLogout) {
      return <WalletAction
        auto
        color="walletaction"
        size="walletaction"
        onClick={() => {
          logoutWallet()
          toggleWalletModal()
        }}
      >
        {t('logout')}
      </WalletAction>
    }
    return 
  }

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <>
      <InfoCard>
        <Card.Header>

          <Row justify="space-between" align='center'>
            <Col>
              {formatConnectorName()}
            </Col>
            <Col css={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              {connector !== injected && !isNaN(chainId) && (
                <WalletAction
                  auto
                  color="walletaction"
                  size="walletaction"
                  onClick={() => {
                    ;(connector as any).close()
                  }}
                >
                  {t('Disconnect')}
                </WalletAction>
              )}
              {changeWallet()}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body css={{
          paddingTop: '0',
          paddingBottom: '0',
        }}>
          <Row justify="flex-start" align='center'>
            {ENSName ? (
              <>
                {getStatusIcon()}
                <ActionText size="$xl"> {ENSName}</ActionText>
              </>
            ) : (
              <>
                {getStatusIcon()}
                <ActionText size="$xl"> {account && shortenAddress(account)}</ActionText>
              </>
            )}
          </Row>
        </Card.Body>
        <Card.Footer>
          {ENSName ? (
            <>
              <Row justify='flex-start' align='center'>
                {account && (
                  <Copy toCopy={account}>
                    <ActionText>{t('CopyAddress')}</ActionText>
                  </Copy>
                )}
                {chainId && account && (
                  <AddressLink
                    // hasENS={!!ENSName}
                    // isENS={true}
                    href={getEtherscanLink(chainId, ENSName, 'address')}
                  >
                    <LinkIcon size={16} />
                    <ActionText>{t('ViewOn')} {config.chainInfo[chainId].name}</ActionText>
                  </AddressLink>
                )}
              </Row>
            </>
          ) : (
            <>
              <Row justify='flex-start' align='center'>
                {account && (
                  <Copy toCopy={account}>
                    <ActionText>{t('CopyAddress')}</ActionText>
                  </Copy>
                )}
                {chainId && account && (
                  <AddressLink
                    // hasENS={!!ENSName}
                    // isENS={false}
                    href={getEtherscanLink(chainId, account, 'address')}
                  >
                    <LinkIcon size={16} style={{
                      color: ActionColor
                    }}/>
                    <ActionText>{t('ViewOn')} {config.chainInfo[chainId].name}</ActionText>
                  </AddressLink>
                )}
              </Row>
            </>
          )}
        </Card.Footer>
      </InfoCard>
      {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          <Row>
            <Text>{t('RecentTransactions')}</Text>
            <LinkStyledButton onClick={clearAllTransactionsCallback}>({t('clearAll')})</LinkStyledButton>
          </Row>
          <Grid.Container gap={0} justify="center">
            <Grid xs={12}>
              <Text>{t('RecentTransactions')}</Text>
            </Grid>
          </Grid.Container>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </LowerSection>
      ) : (
        <LowerSection>
          <ActionText>{t('txView')}</ActionText>
        </LowerSection>
      )}
    </>
  )
}
