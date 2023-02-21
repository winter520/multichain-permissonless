import React from 'react'
import {
  styled,
  Input,
} from '@nextui-org/react'
import { escapeRegExp } from '@/utils'

const StyledInput = styled(Input, {
  '&.nobg, &.nobg label': {
    background: 'none'
  },
  '& input': {
    fontSize: '28px',
  }
})

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export const InputNumber = React.memo(function InnerInput({
  value,
  onUserInput,
  placeholder,
  underlined = false,
  width = '100%',
  size = 'xl',
  css = {}
}: {
  value: string | number
  onUserInput: (input: string) => void
  placeholder?: string
  underlined?: boolean
  width?: string
  size?: any
  css?: any
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }
  return (
    <>
      <StyledInput 
        value={value}
        onChange={(event:any) => {
          // replace commas with periods, because uniswap exclusively uses period as the decimal separator
          enforcer(event.target.value.replace(/,/g, ''))
        }}
        // universal input options
        underlined={underlined}
        animated={false}
        shadow={false} 
        width={width}
        placeholder={placeholder || '0.0'}
        className="nobg"
        css={css}
        size={size}
      />
    </>
  )
})

export default InputNumber

// const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
