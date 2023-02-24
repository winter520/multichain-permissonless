// import React, { useState, useEffect } from 'react'
import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from '@/hooks'

import {useSafeAppConnection} from '@/connectors/gnosis-safe/hooks'
import {network, gnosissafe} from '@/connectors'

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
  // const { active } = useWeb3React()
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React()
  // console.log(active)
  // console.log(networkActive)
  // 尝试急切地连接到注入的提供者（如果它存在并且已经授予访问权限）
  const triedEager = useEagerConnect()
  const triedToConnectToSafe = useSafeAppConnection(gnosissafe)

  // 在急切地尝试注入后，如果网络连接从未处于活动状态或处于错误状态，请激活itd
  useEffect(() => {
    if (!networkActive && !networkError) {
      if (triedToConnectToSafe) {
        activateNetwork(gnosissafe)
      } else if (triedEager) {
        activateNetwork(network)
      }
    }
  }, [triedEager, networkActive, networkError, activateNetwork, triedToConnectToSafe, gnosissafe])
  // }, [triedEager, networkActive, networkError, activateNetwork, active])

  // 当没有连接帐户时，对注入的提供程序（如果存在）上的登录（广义地说）作出反应
  // console.log(triedEager)
  useInactiveListener(!triedEager)

  return (
    <>{children}</>
    )
}
