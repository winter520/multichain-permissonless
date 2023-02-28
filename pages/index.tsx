import React, {Suspense} from 'react'
import RouterView from './router'
import UsdcView from './usdc'
import ZkView from './zkrouter'

import {
  VERSION,
  USE_VERSION
} from '@/config/constant'

export default function Home() {
  const InitView = ({version}: {version: string}) => {
    if (VERSION.V1 === version) {
      return <RouterView />
    } else if (VERSION.USDC_DEMO === version) {
      return <UsdcView />
    } else if (VERSION.ZK_DEMO === version) {
      return <ZkView />
    }
    return null
  }
  return (
    <>
    <Suspense fallback={null}>
      <InitView version={USE_VERSION} />
    </Suspense>
    </>
  )
}
