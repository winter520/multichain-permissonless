
import Jazzicon, { 
  jsNumberForAddress
} from 'react-jazzicon'

export default function Identicon({imageKey, size = 38}: {imageKey?:any, size?: number}) {
  return imageKey ? <Jazzicon diameter={size} seed={jsNumberForAddress(imageKey)} /> : <></>
}
