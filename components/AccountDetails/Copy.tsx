import React from 'react'
// import styled from 'styled-components'
import useCopyClipboard from '@/hooks/useCopyClipboard'

// import { LinkStyledButton } from '../../theme'
import { CheckCircle, Copy } from 'react-feather'

import {
  styled,
  theme,
  Row
} from "@nextui-org/react";

const CopyIcon = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  color: theme.colors.gray700.value
})
// const CopyIcon = styled(LinkStyledButton)`
//   color: ${({ theme }) => theme.text3};
//   flex-shrink: 0;
//   display: flex;
//   text-decoration: none;
//   font-size: 0.825rem;
//   :hover,
//   :active,
//   :focus {
//     text-decoration: none;
//     color: ${({ theme }) => theme.text2};
//   }
// `
const TransactionStatusText = styled(Row, {
  fontSize: '0.825rem',
  lineHeight: '16px'
})
// const TransactionStatusText = styled.span`
//   margin-left: 0.25rem;
//   font-size: 0.825rem;
//   ${({ theme }) => theme.flexRowNoWrap};
//   align-items: center;
// `

export default function CopyHelper({toCopy, style, children}: { toCopy: string; style?: React.CSSProperties; children?: React.ReactNode }) {
  const [isCopied, setCopied] = useCopyClipboard()
  // console.log(toCopy)
  return (
    <CopyIcon style={style} onClick={(event:any) => {
      setCopied(toCopy)
      event.stopPropagation()
    }}>
      {isCopied ? (
        <TransactionStatusText justify="center" align='center'>
          <CheckCircle size={'16'} />
          <TransactionStatusText css={{marginLeft: '6px'}}>Copied</TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText justify="center" align='center'>
          <Copy size={'16'} />
        </TransactionStatusText>
      )}
      {isCopied ? '' : children}
    </CopyIcon>
  )
}
