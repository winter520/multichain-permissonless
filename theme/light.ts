import { createTheme } from "@nextui-org/react"


export const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      // generic colors
      // white: '#ffffff',
      // black: '#000000',

      // // background colors (light)
      // background: "$white",
      // backgroundAlpha: "rgba(255, 255, 255, 0.8)", // used for semi-transparent backgrounds like the navbar
      // foreground: "$black",
      // backgroundContrast: "$white",

      gradient: 'linear-gradient(to right, #734ce2 , #606bfb)',


      //semantic colors (light)
      // blue100: '#DFE2FE',
      // blue200: '#BFC5FE',
      // blue300: '#9FA7FD',
      // blue400: '#8690FC',
      // blue500: '#5F6BFB',
      // blue600: '#454FD7',
      // blue700: '#2F37B4',
      // blue800: '#1E2491',
      // blue900: '#121678',
      // purple100: '#DFE2FE',
      // purple200: '#BFC5FE',
      // purple300: '#9FA7FD',
      // purple400: '#8690FC',
      // purple500: '#5F6BFB',
      // purple600: '#454FD7',
      // purple700: '#2F37B4',
      // purple800: '#1E2491',
      // purple900: '#121678',
      // ...

      // brand colors
      // primaryLight: '$blue200',
      // // primaryLight: 'red',
      // primaryLightHover: '$blue300', // commonly used on hover state
      // primaryLightActive: '$blue400', // commonly used on pressed state
      // primaryLightContrast: '$blue600', // commonly used for text inside the component
      // primary: '$blue600',
      // primaryBorder: '$blue500',
      // primaryBorderHover: '$blue600',
      // primarySolidHover: '$blue700',
      // primarySolidContrast: '$white', // commonly used for text inside the component
      // primaryShadow: '$blue500'
    },
  }
})