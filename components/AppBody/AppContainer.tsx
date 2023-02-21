import React from 'react'

import {
  // createWeb3ReactRoot,
  Web3ReactProvider
} from '@web3-react/core'

// import * as web3React from '@web3-react/core'
import { isBrowser } from '@/config/constant'
import getLibrary from '@/utils/getLibrary'
import Web3ReactManager from '@/components/Web3ReactManager'
// import { globalCss, theme } from '@nextui-org/react'
// import {
//   WalletProvider,
//   // NetworkInfo
// } from '@terra-money/wallet-provider'

// console.log(web3React)

if (isBrowser && 'ethereum' in window) {
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}

const mainnet = {
  name: 'mainnet',
  chainID: 'columbus-4',
  lcd: 'https://lcd.terra.dev',
  walletconnectID: 1
};

const testnet = {
  name: 'testnet',
  chainID: 'tequila-0004',
  lcd: 'https://tequila-lcd.terra.dev',
  walletconnectID: 0
};

const walletConnectChainIds: Record<number, any> = {
  0: testnet,
  1: mainnet,
}
// const globalStyles = globalCss({
//   'html,body': { 
//     // background: theme.colors.backgroundContrast.value + '!important'
//    }
// });

export default function AppContainer({children}: { children: JSX.Element }) {
  // globalStyles()
  return (
    <>
        {/* {children} */}
      {/* <WalletProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      > */}
        <Web3ReactProvider getLibrary={getLibrary}>
          {/* <Web3ProviderNetwork getLibrary={getLibrary}> */}
            <Web3ReactManager>
              {children}
            </Web3ReactManager>
          {/* </Web3ProviderNetwork> */}
        </Web3ReactProvider>
      {/* </WalletProvider> */}
    </>
  )
}