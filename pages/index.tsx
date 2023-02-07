import React, {Suspense} from 'react'
import RouterView from './router'

export default function Home() {
  return (
    <>
    <Suspense fallback={null}>

      <RouterView />
    </Suspense>
    </>
  )
}
