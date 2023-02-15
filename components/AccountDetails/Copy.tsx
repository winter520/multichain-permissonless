import React from 'react'
// import styled from 'styled-components'
import useCopyClipboard from '@/hooks/useCopyClipboard'

// import { LinkStyledButton } from '../../theme'
// import { CheckCircle, Copy } from 'react-feather'
import CheckCircle from "@/public/images/icon/check-circle.svg"
import Copy from "@/public/images/icon/Copy.svg"

import { 
  Navbar, 
  Button, 
  // Link as LinkUI, 
  Text, 
  useTheme,
  Avatar,
  Dropdown,
  Switch,
  styled,
  theme
} from "@nextui-org/react";

const CopyIcon = styled('div', {

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

export default function CopyHelper(props: { toCopy: string; children?: React.ReactNode }) {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <CopyIcon onClick={(event:any) => {
      setCopied(props.toCopy)
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
      {isCopied ? '' : props.children}
    </CopyIcon>
  )
}
