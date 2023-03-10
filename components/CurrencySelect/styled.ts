import {
  styled,
  Button,
  theme,
} from "@nextui-org/react"
export const InputPanel:any = styled('div', {
  width: '100%',
  // padding: '30px'
})


export const ChainName = styled(Button, {
  variants: {
    size: {
      chain: {
        fontWeight: 'bold',
      }
    },
    colors: {
      chain: { 
        borderRadius: '$xs', // radii.xs
        border: '1px solid #524DFB',
        background: 'none',
        boxShadow: 'none',
        
        '&:hover': {
          background: 'none',
        },
        '&:active': {
          background: 'none',
        },
        '&:focus': {
          background: 'none',
        },
      }
    }
  },
  '& .common.light': {
    color: '#524DFB',
  },
  '& .common.dark': {
    color: theme.colors.white.value,
  },
})
export const BalanceView = styled(Button, {
  variants: {
    size: {
      balance: {
      }
    },
    colors: {
      balance: { 
        borderRadius: '$xs', // radii.xs
        border: 'none',
        background: 'none',
        boxShadow: 'none',
        color: theme.colors.text.value,
        '&:hover': {
          background: 'none',
        },
        '&:active': {
          background: 'none',
        },
        '&:focus': {
          background: 'none',
        },
      }
    }
  },
  '& .common.light': {
    color: '#524DFB',
  },
  '& .common.dark': {
    color: theme.colors.white.value,
  },
})

export const CurrencyInput = styled('div', {
  margin: '12px 0',
  padding: '0 10px 0 0', 
  background: '$bgContent'
})

export const TokenView = styled(Button, {
  variants: {
    size: {
      token: {
      }
    },
    colors: {
      token: { 
        borderRadius: '$xs', // radii.xs
        border: 'none',
        background: 'none',
        boxShadow: 'none',
        color: theme.colors.text.value,
        '&:hover': {
          background: 'none',
        },
        '&:active': {
          background: 'none',
        },
        '&:focus': {
          background: 'none',
        },
      }
    }
  },
  '& .common.light': {
    color: '#524DFB',
  },
  '& .common.dark': {
    color: theme.colors.white.value,
  },
})

export const TabButton = styled(Button, {
  variants: {
    color: {
      active: {
        backgroundColor: theme.colors.secondary.value + "!important",
        color: theme.colors.white.value + "!important",
        '&:hover': {
          color: '$white'
        }
      },
      default: {
        color: "$tabText!important",
        '&:hover': {
          color: '$white!important'
        }
      }
    }
  }
})