import { AbstractConnector } from '@web3-react/abstract-connector'
import React from 'react'
// import styled from 'styled-components'
import Option from './Option'
import { SUPPORTED_WALLETS } from '@/connectors'
import { injected } from '@/connectors'
// import { darken } from 'polished'
// import Loader from '../Loader'
import {
  Loading,
  styled,
  Row,
  Text
} from "@nextui-org/react"

const PendingSection = styled('div', {
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  overflowY: "auto"
})
// const PendingSection = styled.div`
//   ${({ theme }) => theme.flexColumnNoWrap};
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   & > * {
//     width: 100%;
//   }
// `


const LoadingMessage = styled('div', {
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  justifyContent: "flex-start",
  borderRadius: "12px",
  marginBottom: "20px",
})
// const LoadingMessage = styled.div<{ error?: boolean }>`
//   ${({ theme }) => theme.flexRowNoWrap};
//   align-items: center;
//   justify-content: flex-start;
//   border-radius: 12px;
//   margin-bottom: 20px;
//   color: ${({ theme, error }) => (error ? theme.red1 : 'inherit')};
//   border: 1px solid ${({ theme, error }) => (error ? theme.red1 : theme.text4)};

//   & > * {
//     padding: 1rem;
//   }
// `

const ErrorGroup = styled('div', {

})
// const ErrorGroup = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap};
//   align-items: center;
//   justify-content: flex-start;
// `

const ErrorButton = styled('div', {

})
// const ErrorButton = styled.div`
//   border-radius: 8px;
//   font-size: 12px;
//   color: ${({ theme }) => theme.text1};
//   background-color: ${({ theme }) => theme.bg4};
//   margin-left: 1rem;
//   padding: 0.5rem;
//   font-weight: 600;
//   user-select: none;

//   &:hover {
//     cursor: pointer;
//     background-color: ${({ theme }) => darken(0.1, theme.text4)};
//   }
// `

const LoadingWrapper = styled('div', {

})
// const LoadingWrapper = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap};
//   align-items: center;
//   justify-content: center;
// `

export default function PendingView({
  connector,
  error = false,
  setPendingError,
  tryActivation
}: {
  connector?: AbstractConnector
  error?: boolean
  setPendingError: (error: boolean) => void
  tryActivation: (connector: AbstractConnector) => void
}) {
  const isMetamask = window?.ethereum?.isMetaMask

  return (
    <PendingSection>
      <LoadingMessage>
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <div>Error connecting.</div>
              <ErrorButton
                onClick={() => {
                  setPendingError(false)
                  connector && tryActivation(connector)
                }}
              >
                Try Again
              </ErrorButton>
            </ErrorGroup>
          ) : (
            <Row justify='flex-start' align='center'>
              <Text color="secondary">Initializing</Text>
              <Loading size='sm' type="points" color="secondary" />
            </Row>
          )}
        </LoadingWrapper>
      </LoadingMessage>
      {Object.keys(SUPPORTED_WALLETS).map(key => {
        const option = SUPPORTED_WALLETS[key]
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null
            }
          }
          return (
            <Option
              id={`connect-${key}`}
              key={key}
              clickable={false}
              color={option.color}
              header={option.name}
              subheader={option.description}
              icon={require('@/public/images/icon/' + option.iconName).default.src}
            />
          )
        }
        return null
      })}
    </PendingSection>
  )
}
