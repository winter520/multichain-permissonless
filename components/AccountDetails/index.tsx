import React, { useCallback, useContext } from 'react'
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
  Navbar, 
  Grid,
  Button, 
  // Link as LinkUI, 
  Text, 
  useTheme,
  Avatar,
  Dropdown,
  Switch,
  styled,
  theme,
  Row,
  Modal,
  Col,
  Card
} from "@nextui-org/react";
import Link from 'next/link'

const HeaderRow = styled('div', {

})
// const HeaderRow = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap};
//   padding: 1rem 1rem;
//   font-weight: 500;
//   color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     padding: 1rem;
//   `};
// `

const UpperSection = styled('div', {

})
// const UpperSection = styled.div`
//   position: relative;

//   h5 {
//     margin: 0;
//     margin-bottom: 0.5rem;
//     font-size: 1rem;
//     font-weight: 400;
//   }

//   h5:last-child {
//     margin-bottom: 0px;
//   }

//   h4 {
//     margin-top: 0;
//     font-weight: 500;
//   }
// `

const InfoCard = styled(Card, {

})
// const InfoCard = styled.div`
//   padding: 1rem;
//   border: 1px solid ${({ theme }) => theme.bg3};
//   border-radius: 20px;
//   position: relative;
//   display: grid;
//   grid-row-gap: 12px;
//   margin-bottom: 20px;
// `

const AccountGroupingRow = styled('div', {

})
// const AccountGroupingRow = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap};
//   justify-content: space-between;
//   align-items: center;
//   font-weight: 400;
//   color: ${({ theme }) => theme.text1};

//   div {
//     ${({ theme }) => theme.flexRowNoWrap}
//     align-items: center;
//   }
// `

const AccountSection = styled('div', {

})
// const AccountSection = styled.div`
//   background: ${({ theme }) => theme.bg1};
//   padding: 0rem 1rem;
//   ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
// `

const YourAccount = styled('div', {

})
// const YourAccount = styled.div`
//   h5 {
//     margin: 0 0 1rem 0;
//     font-weight: 400;
//   }

//   h4 {
//     margin: 0;
//     font-weight: 500;
//   }
// `

const LowerSection = styled('div', {

})
// const LowerSection = styled.div`
//   ${({ theme }) => theme.flexColumnNoWrap}
//   padding: 1.5rem;
//   flex-grow: 1;
//   overflow: auto;
//   background: ${({ theme }) => theme.bg2};
//   border-bottom-left-radius: 20px;
//   border-bottom-right-radius: 20px;

//   h5 {
//     margin: 0;
//     font-weight: 400;
//     color: ${({ theme }) => theme.text3};
//   }
// `

const AccountControl = styled('div', {

})
// const AccountControl = styled.div`
//   display: flex;
//   justify-content: space-between;
//   min-width: 0;
//   width: 100%;

//   font-weight: 500;
//   font-size: 1.25rem;

//   a:hover {
//     text-decoration: underline;
//   }

//   p {
//     min-width: 0;
//     margin: 0;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }
// `

const AddressLink = styled(Link, {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginLeft: '10px'
})
// const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
//   font-size: 0.825rem;
//   color: ${({ theme }) => theme.text3};
//   margin-left: 1rem;
//   font-size: 0.825rem;
//   display: flex;
//   :hover {
//     color: ${({ theme }) => theme.text2};
//   }
// `

const CloseIcon = styled('div',{

})
// const CloseIcon = styled.div`
//   position: absolute;
//   right: 1rem;
//   top: 14px;
//   &:hover {
//     cursor: pointer;
//     opacity: 0.6;
//   }
// `

const CloseColor = styled('div', {

})
// const CloseColor = styled(Close)`
//   path {
//     stroke: ${({ theme }) => theme.text4};
//   }
// `

const WalletName = styled('div', {

})
// const WalletName = styled.div`
//   width: initial;
//   font-size: 0.825rem;
//   font-weight: 500;
//   color: ${({ theme }) => theme.text3};
// `

const IconWrapper = styled('div', {

})
// const IconWrapper = styled.div<{ size?: number }>`
//   ${({ theme }) => theme.flexColumnNoWrap};
//   align-items: center;
//   justify-content: center;
//   margin-right: 8px;
//   & > img,
//   span {
//     height: ${({ size }) => (size ? size + 'px' : '32px')};
//     width: ${({ size }) => (size ? size + 'px' : '32px')};
//   }
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     align-items: flex-end;
//   `};
// `

const TransactionListWrapper = styled('div', {

})
// const TransactionListWrapper = styled.div`
//   ${({ theme }) => theme.flexColumnNoWrap};
// `

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
// const WalletAction = styled(ButtonSecondary)`
//   width: fit-content;
//   font-weight: 400;
//   margin-left: 8px;
//   font-size: 0.825rem;
//   padding: 4px 6px;
//   :hover {
//     cursor: pointer;
//     text-decoration: underline;
//   }
// `

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
