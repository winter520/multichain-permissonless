import React from 'react'
import Link from 'next/link';
import {
  styled,
  Button,
  theme
} from "@nextui-org/react";

// import styled from 'styled-components'
// import { ExternalLink } from '../../theme'

// const InfoCard = styled(Button, {
//   variants: {
//     size: {
//       mysize: {
//         // height: '$12', // space[12]
//         // borderRadius: '$xs' // radii.xs
//       }
//     },
//     color: {
//       wallet: {
//         background: '$gray100', // colors.green800
//         color: '$gray800', 
//         border: '$space$1 solid transparent',
//         '&:hover': {
//           background: '$gray800',
//           color: '$gray100',
//         },
//         '&:active': {
//           background: '$gray200',
//         },
//         '&:focus': {
//           borderColor: '$gray300',
//         },
//       }
//     },
//     display: {
//       wallet: {
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between"
//       }
//     }
//   }
// })
// const InfoCard = styled.button<{ active?: boolean }>`
//   background-color: ${({ theme, active }) => (active ? theme.bg3 : theme.bg2)};
//   padding: 1rem;
//   outline: none;
//   border: 1px solid;
//   border-radius: 12px;
//   width: 100% !important;
//   &:focus {
//     box-shadow: 0 0 0 1px ${({ theme }) => theme.primary1};
//   }
//   border-color: ${({ theme, active }) => (active ? 'transparent' : theme.bg3)};
// `

const OptionCard = styled('div', {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
})
// const OptionCard = styled(InfoCard as any)`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 2rem;
//   padding: 1rem;
// `

const OptionCardLeft = styled('div', {
  height: '100%'
})
// const OptionCardLeft = styled.div`
//   ${({ theme }) => theme.flexColumnNoWrap};
//   justify-content: center;
//   height: 100%;
// `

const OptionCardClickable:any = styled(Button, {
  variants: {
    size: {
      wallet: {
        '& > *': {width: "100%"}
      }
    },
    color: {
      wallet: {
        background: '$gray100', // colors.green800
        color: '$gray800', 
        border: '$space$1 solid transparent',
        '&:hover': {
          background: '$gray300',
        },
        '&:active': {
          background: '$gray200',
        },
        '&:focus': {
          borderColor: '$gray300',
        },
      }
    }
  }
})
// const OptionCardClickable = styled(OptionCard)<{ clickable?: boolean }>`
//   margin-top: 0;
//   &:hover {
//     cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
//     border: ${({ clickable, theme }) => (clickable ? `1px solid ${theme.primary1}` : ``)};
//   }
//   opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
// `

const GreenCircle = styled('div', {

})
// const GreenCircle = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap}
//   justify-content: center;
//   align-items: center;

//   &:first-child {
//     height: 8px;
//     width: 8px;
//     margin-right: 8px;
//     background-color: ${({ theme }) => theme.green1};
//     border-radius: 50%;
//   }
// `

const CircleWrapper = styled('div', {

})
// const CircleWrapper = styled.div`
//   color: ${({ theme }) => theme.green1};
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

const HeaderText = styled('div', {

})
// const HeaderText = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap};
//   color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : ({ theme }) => theme.text1)};
//   font-size: 1rem;
//   font-weight: 500;
// `

const SubHeader = styled('div', {

})
// const SubHeader = styled.div`
//   color: ${({ theme }) => theme.text1};
//   margin-top: 10px;
//   font-size: 12px;
// `

const IconWrapper = styled('div', {
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  alignItems: "center",
  "& > img": {
    width: "24px",
    height: "24px",
  }
})
// const IconWrapper = styled.div<{ size?: number | null }>`
//   ${({ theme }) => theme.flexColumnNoWrap};
//   align-items: center;
//   justify-content: center;
//   & > img,
//   span {
//     height: ${({ size }) => (size ? size + 'px' : '24px')};
//     width: ${({ size }) => (size ? size + 'px' : '24px')};
//   }
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     align-items: flex-end;
//   `};
// `

export default function Option({
  link = null,
  clickable = true,
  size,
  onClick = null,
  color,
  header,
  subheader = null,
  icon,
  active = false,
  id
}: {
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: null | (() => void)
  color: string
  header: React.ReactNode
  subheader: React.ReactNode | null
  icon: any
  active?: boolean
  id: string
}) {
  const content = (
    <OptionCardClickable id={id} onClick={onClick} color="wallet" display="wallet" size="wallet">
    {/* <OptionCardClickable id={id} onClick={onClick} clickable={clickable && !active} active={active}> */}
      <OptionCard>

        <OptionCardLeft>
          <HeaderText color={color}>
            {active ? (
              <CircleWrapper>
                <GreenCircle>
                  <div />
                </GreenCircle>
              </CircleWrapper>
            ) : (
              ''
            )}
            {header}
          </HeaderText>
          {subheader && <SubHeader>{subheader}</SubHeader>}
        </OptionCardLeft>
        {/* <IconWrapper size={size}> */}
        <IconWrapper>
          <img src={icon} alt={'Icon'} />
        </IconWrapper>
      </OptionCard>
    </OptionCardClickable>
  )
  if (link) {
    return <Link href={link}>{content}</Link>
  }

  return content
}
