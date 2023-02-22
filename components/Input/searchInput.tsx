import React from 'react'
import {
  styled,
  Input,
} from '@nextui-org/react'

const StyledInput = styled(Input, {
  margin: '10px 0'
  // '&.nobg, &.nobg label': {
  //   background: 'none'
  // },
  // '& input': {
  //   fontSize: '28px',
  // }
})

export const SearchInput = React.memo(function InnerInput({
  value,
  onUserInput,
  placeholder,
  width = '100%',
  size = 'lg',
  css = {}
}: {
  value: string | number
  onUserInput: (input: string) => void
  placeholder?: string
  width?: string
  size?: any
  css?: any
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  const enforcer = (nextUserInput: string) => {
    onUserInput(nextUserInput)
  }
  return (
    <>
      <StyledInput 
        value={value}
        onChange={(event:any) => {
          // replace commas with periods, because uniswap exclusively uses period as the decimal separator
          enforcer(event.target.value)
        }}
        width={width}
        placeholder={placeholder || ''}
        className="nobg"
        css={css}
        size={size}
      />
    </>
  )
})

export default SearchInput

// const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
