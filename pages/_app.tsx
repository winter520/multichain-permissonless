import {useState, useEffect} from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import { NextUIProvider } from '@nextui-org/react'
import {SSRProvider} from '@react-aria/ssr'
import { Provider } from 'react-redux'
// import { Head } from 'next/document';
import Head from 'next/head'

import store from '@/state'

import ThemesProvider from '@/theme'

import Header from '@/components/Header'
// import dynamic from 'next/dynamic'
import '@/utils/i18n'

// const MyComponentNoSSR = dynamic(() => import('my-component'), {
//     ssr: false,
// })

// import Web3ReactManager from '@/components/Web3ReactManager'

// import AppBody from '@/components/AppBody'
// import AppContainer from '@/components/AppBody/AppContainer'

const isBrowser = (() => typeof window !== 'undefined')()

function MyApp({ Component, pageProps }: AppProps) {
  const [load,setLoad] = useState(false)
  useEffect(()=>{
    setLoad(true)
  },[])
  if (!load || !isBrowser) return <></>
  return (
    <>
      <Head>
        <title>Multichain - Cross Chain Router Protocol</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Multichain APP" />
        <meta name="keywords" content="Multichain, Multichain APP, Multichain router, Multichain bridge"/>
        <meta name="description" content="Unified cross-chain interface, average transaction speed within 100 secs, no-slippage swap"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel ="stylesheet" href="fonts/fonts.css"></link>
      </Head>
      <SSRProvider>
        <Provider store={store}>
          <ThemesProvider>
            <Header />
            <Component {...pageProps} />
          </ThemesProvider>
        </Provider>
      </SSRProvider>
    </>
  )
}

export default MyApp

