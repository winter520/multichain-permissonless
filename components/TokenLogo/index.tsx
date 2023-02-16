import React from 'react'
import {Avatar} from "@nextui-org/react";

function getSourcePath(symbol: string) {
  let path:any = ''
  try {
    path = require('@/public/images/coin/' + symbol + '.svg')
  } catch (error) {
    try {
      path = require('@/public/images/coin/' + symbol + '.png')
    } catch (error) {
      try {
        path = require('@/public/images/coin/' + symbol + '.jpg')
      } catch (error) {
        path = require('@/public/images/icon/question.svg')
      }
    }
  }
  // console.log(path)
  return path.default.src
}
export default function TokenLogo({
  symbol,
  size = 'xs',
  style,
  logoUrl,
}: {
  symbol?: any
  size?: any
  style?: React.CSSProperties
  logoUrl?: any
}) {
  let path = ''
  if (logoUrl) {
    path = logoUrl
  } else if (symbol) {
    path = getSourcePath(symbol)
  }
  return <Avatar
    src={path}
    size={size}
    style={style}
    zoomed
  />
}
