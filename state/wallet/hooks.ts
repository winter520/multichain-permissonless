import { useCallback, useMemo } from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  AppState,
  AppDispatch
} from '@/state'
import {walletViews} from './actions'

import {
  gnosissafe
} from '@/connectors'
import {
  useActiveWeb3React
} from '@/hooks'

import { ChainId } from '@/config/chainConfig/chainId'

export function useWalletViews () {
  const walletViewsResult:any = useSelector<AppState, AppState['wallet']>(state => state.wallet.walletViews)
  const dispatch = useDispatch<AppDispatch>()
  // const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const setWalletView = useCallback((type: any) => {
    // console.log(type)
    dispatch(walletViews({type}))
  }, [])

  return {
    walletView: walletViewsResult,
    setWalletView
  }
}

export function useIsGnosisSafeWallet () {
  const { connector, account } = useActiveWeb3React()
  const isGnosisSafeWallet =  useMemo(() => {
    // console.log(gnosissafe)
    // console.log(connector)
    if ( gnosissafe === connector && account) {
      return true
    }
    return false
  }, [gnosissafe, connector, account])
  return {
    isGnosisSafeWallet
  }
}