import { createTheme } from "@nextui-org/react"


export const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      backgroundContrast: '#F7F8FA',

      gradient: 'linear-gradient(to right, #734ce2 , #606bfb)',
      // backgroundGradient: '#F7F8FA',
      contentBg: '$white',

      purple: '#524DFB',
      purple100: '#DCDBFE',
      purple200: '#BAB8FE',
      purple300: '#9794FD',
      purple400: '#7D79FC',
      purple500: '#524DFB',
      purple600: '#3C38D7',
      purple700: '#2A26B4',
      purple800: '#1A1891',
      purple900: '#100E78',

      // secondary: "$purple600",
      // secondaryBorder: "$purple500",
      // secondaryBorderHover: "$purple600",
      // secondaryLight: "$purple200",
      // secondaryLightActive: "$purple400",
      // secondaryLightContrast: "$purple600",
      // secondaryLightHover: "$purple300",
      // secondaryShadow: "$purple500",
      // // secondarySolidContrast: G {token: 'secondarySolidContrast', value: 'var(--nextui-colors-white)', scale: 'colors', prefix: 'nextui'}
      // secondarySolidHover: "$purple700",

    },
  }
})