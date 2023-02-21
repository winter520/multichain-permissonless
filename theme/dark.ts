import { createTheme } from "@nextui-org/react"

export const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      gradient: 'linear-gradient(to right, #734ce2 , #606bfb)',
      backgroundContrast: 'transparent radial-gradient(closest-side at 50% 50%, #21263E 0%, #1C2133 100%) 0% 0% no-repeat padding-box',
      // backgroundGradient: 'transparent radial-gradient(closest-side at 50% 50%, #21263E 0%, #1C2133 100%) 0% 0% no-repeat padding-box;',
      contentBg: '#151A2F',
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
    },
  }
})