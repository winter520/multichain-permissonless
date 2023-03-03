import React from 'react'
// import styled from 'styled-components'
import { useActivePopups } from '@/state/application/hooks'
// import { AutoColumn } from '../Column'
import PopupItem from './PopupItem'
import { useURLWarningVisible } from '@/state/user/hooks'
import {
  styled,
  // Col,
  Grid
} from '@nextui-org/react'

const MobilePopupWrapper = styled('div', {
  position: 'relative',
  maxWidth: '100%',
  height: 'auto',
  marginBottom: '20px',
  display: 'none'
})
// const MobilePopupWrapper = styled.div<{ height: string | number }>`
//   position: relative;
//   max-width: 100%;
//   height: ${({ height }) => height};
//   margin: ${({ height }) => (height ? '0 auto;' : 0)};
//   margin-bottom: ${({ height }) => (height ? '20px' : 0)}};

//   display: none;

//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     display: block;
//     z-index: 999;
//     margin-top: 60px;
//   `};
// `

const MobilePopupInner = styled('div', {
  height: '99%',
  overflowX: 'auto',
  overflowY: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  '& -webkit-overflow-scrolling': 'touch',
  '& ::-webkit-scrollbar': {
    display: 'none',
  }
})

// const MobilePopupInner = styled.div`
//   height: 99%;
//   overflow-x: auto;
//   overflow-y: hidden;
//   display: flex;
//   flex-direction: row;
//   -webkit-overflow-scrolling: touch;
//   ::-webkit-scrollbar {
//     display: none;
//   }
// `

const FixedPopupColumn = styled(Grid.Container, {
  position: 'fixed',
  top: '108px',
  right: '1rem',
  maxWidth: '355px !important',
  width: '100%',
  zIndex: 99,

  // ${({ theme }) => theme.mediaWidth.upToSmall`
  //   display: none;
  // `};
})

// const FixedPopupColumn = styled(AutoColumn)<{ extraPadding: boolean }>`
//   position: fixed;
//   top: ${({ extraPadding }) => (extraPadding ? '108px' : '88px')};
//   right: 1rem;
//   max-width: 355px !important;
//   width: 100%;
//   z-index: 99;

//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     display: none;
//   `};
// `

export default function Popups() {
  // get all popups
  const activePopups = useActivePopups()
  console.log(activePopups)
  const urlWarningActive = useURLWarningVisible()

  return (
    <>
      {/* <FixedPopupColumn gap={2} extraPadding={urlWarningActive}> */}
      <FixedPopupColumn gap={2}>
        {activePopups.map(item => (
          <PopupItem key={item.key} content={item.content} popKey={item.key} removeAfterMs={item.removeAfterMs} />
        ))}
      </FixedPopupColumn>
      {/* <MobilePopupWrapper height={activePopups?.length > 0 ? 'fit-content' : 0}> */}
      <MobilePopupWrapper>
        <MobilePopupInner>
          {activePopups // reverse so new items up front
            .slice(0)
            .reverse()
            .map(item => (
              <PopupItem key={item.key} content={item.content} popKey={item.key} removeAfterMs={item.removeAfterMs} />
            ))}
        </MobilePopupInner>
      </MobilePopupWrapper>
    </>
  )
}
