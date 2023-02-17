import React from 'react'
// import styled from 'styled-components'
import useCopyClipboard from '@/hooks/useCopyClipboard'

// import { LinkStyledButton } from '../../theme'
import { CheckCircle, Copy } from 'react-feather'

import {
  styled,
  theme
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
const TransactionStatusText = styled('span', {
  
})
// const TransactionStatusText = styled.span`
//   margin-left: 0.25rem;
//   font-size: 0.825rem;
//   ${({ theme }) => theme.flexRowNoWrap};
//   align-items: center;
// `

export default function CopyHelper({toCopy, children}: { toCopy: string; children?: React.ReactNode }) {
  const [isCopied, setCopied] = useCopyClipboard()
  // console.log(toCopy)
  return (
    <CopyIcon onClick={(event:any) => {
      setCopied(toCopy)
      event.stopPropagation()
    }}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size={'16'} />
          <TransactionStatusText>Copied</TransactionStatusText>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size={'16'} />
        </TransactionStatusText>
      )}
      {isCopied ? '' : children}
    </CopyIcon>
  )
}
