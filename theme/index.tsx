
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';
// import { useTheme } from '@nextui-org/react'

import {darkTheme} from './dark'
import {lightTheme} from './light'

export default function ThemesProvider ({ children }: { children: React.ReactNode }) {
  // const { isDark, type } = useTheme();
  return <NextThemesProvider
    defaultTheme="dark"
    attribute="class"
    value={{
      light: lightTheme.className,
      dark: darkTheme.className
    }}
  >
    <NextUIProvider>
      {children}
    </NextUIProvider>
  </NextThemesProvider>
}