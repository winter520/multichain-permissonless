import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
// import styled from 'styled-components'
import MetamaskIcon from '@/public/images/icon/metamask.svg'
import { injected } from '@/connectors'
import { SUPPORTED_WALLETS } from '@/connectors'
import usePrevious from '@/hooks/usePrevious'
import {useActiveReact} from '../../hooks/useActiveReact'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
import {useWalletViews} from '@/state/wallet/hooks'
import {WALLET_VIEWS} from '@/state/wallet/actions'
// import { ExternalLink } from '../../theme'
import AccountDetails from '../AccountDetails'

// import Modal from '../Modal'

import Option from './Option'
import PendingView from './PendingView'

import config from '@/config'

import { 
  Button,
  Modal,
  Input,
  styled,
  theme
} from "@nextui-org/react";

const Wrapper = styled('div', {
  margin: '0',
  padding: '0',
  width: '100%'
})
const HeaderRow = styled('div', {
  padding: '1rem 1rem',
  color: theme.colors.primary.value
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
const ContentWrapper = styled('div', {
  // backgroundColor: theme.colors.background.value,
  padding: '2rem',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px'
})
// const ContentWrapper = styled.div`
//   background-color: ${({ theme }) => theme.bg2};
//   padding: 2rem;
//   border-bottom-left-radius: 20px;
//   border-bottom-right-radius: 20px;

//   ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
// `

const UpperSection = styled('div', {
  position: 'relative'
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

const OptionGrid = styled('div', {
  display: 'grid',
  gridGap: '10px'
})
// const OptionGrid = styled.div`
//   display: grid;
//   grid-gap: 10px;
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     grid-template-columns: 1fr;
//     grid-gap: 10px;
//   `};
// `

const HoverText = styled('div', {})
// const HoverText = styled.div`
//   :hover {
//     cursor: pointer;
//   }
// `

// const WALLET_VIEWS = {
//   OPTIONS: 'options',
//   OPTIONS_SECONDARY: 'options_secondary',
//   ACCOUNT: 'account',
//   PENDING: 'pending'
// }

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
  // 重要的是，这些都是从特定于帐户的web3 react上下文中销毁的
  const { active, connector, activate, error } = useWeb3React()
  const { account, chainId } = useActiveReact()
// console.log(active)
// console.log(connector)
  const { t } = useTranslation()

  // const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  const {walletView, setWalletView} = useWalletViews()

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()

  const [pendingError, setPendingError] = useState<boolean>()

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()
  
  const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious])

  // const tryActivation = async (connector: AbstractConnector | undefined | WalletConnectConnector) => {
  const tryActivation = async (connector: any) => {
  // const tryActivation = async (connector: AbstractConnector | undefined) => {
    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    // if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
    if (connector?.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }
    // console.log(connector)
    connector &&
      activate(connector, undefined, true).catch(error => {
        console.log(error)
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true)
        }
      })
  }

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      if (isMobile) {

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector)
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={require('@/public/images/' + option.iconName)}
            />
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={'Install Metamask'}
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      // const isActive = window?.ethereum?.isMetaMask && option.name === 'Metamask' && option.connector === connector ? 
      let isActive = false
      if (window?.ethereum?.isMetaMask && option.name === 'MetaMask') {
        if (option.connector === connector) isActive = true
      } else if (!window?.ethereum?.isMetaMask && window?.okexchain?.isOKExWallet && option.name === 'OKEx') {
        if (option.connector === connector) isActive = true
      }
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            // active={option.connector === connector}
            active={isActive}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={require('@/public/images/' + option.iconName)}
          />
        )
      )
    })
  }

  function getModalContent() {
    if (error) {
      return (
        <UpperSection>
          <HeaderRow>{error instanceof UnsupportedChainIdError ? t('WrongNetwork') : t('ErrorConnecting')}</HeaderRow>
          <ContentWrapper>
            {error instanceof UnsupportedChainIdError ? (
              <h5>{t('tip37', {name:config.chainInfo[chainId].name})}</h5>
            ) : (
              t('tip36')
            )}
          </ContentWrapper>
        </UpperSection>
      )
    }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
        />
      )
    }
    return (
      <UpperSection>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow color="blue">
            <HoverText
              onClick={() => {
                setPendingError(false)
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
            >
              {t('Back')}
            </HoverText>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverText>{t('ConnectToWallet')}</HoverText>
          </HeaderRow>
        )}
        <ContentWrapper>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <OptionGrid>{getOptions()}</OptionGrid>
          )}
          {/* {walletView !== WALLET_VIEWS.PENDING && (
            <Blurb>
              <span>{t('NewToEthereum')} &nbsp;</span>{' '}
              <ExternalLink href="https://ethereum.org/wallets/">{t('tip35')}</ExternalLink>
            </Blurb>
          )} */}
        </ContentWrapper>
      </UpperSection>
    )
  }

  return (
    <Modal
      scroll
      closeButton
      // width="600px"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={walletModalOpen}
      onClose={toggleWalletModal}
    >

      <Wrapper>{getModalContent()}</Wrapper>
    {/* <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
    </Modal> */}
    </Modal>
  )
}
