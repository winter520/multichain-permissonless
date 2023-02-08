
import { useDispatch } from 'react-redux'
import { useActiveReact } from '../../hooks/useActiveReact'
import { AppDispatch } from '../index'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()
  const {chainId} = useActiveReact()
  

  return null
}
