import { useCallback, useEffect, useState } from 'react'



function isWindowVisible() {
  const VISIBILITY_STATE_SUPPORTED = 'visibilityState' in document
  return !VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden'
}

/**
 * 返回当前窗口对用户是否可见。
 */
export default function useIsWindowVisible(): boolean {
  const VISIBILITY_STATE_SUPPORTED = 'visibilityState' in document
  const [focused, setFocused] = useState<boolean>(isWindowVisible())
  const listener = useCallback(() => {
    setFocused(isWindowVisible())
  }, [setFocused])

  useEffect(() => {
    if (!VISIBILITY_STATE_SUPPORTED) return undefined

    document.addEventListener('visibilitychange', listener)
    return () => {
      document.removeEventListener('visibilitychange', listener)
    }
  }, [listener])

  return focused
}
