import {
  chainInfo
} from '@/config/chainConfig'
import {
  isBrowser
} from '@/config/constant'
// const isBrowser = () => typeof window !== 'undefined'

const config = {
  isBrowser,
  chainInfo,
}

export default config