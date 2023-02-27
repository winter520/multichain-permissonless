import {
  Card,
  Row,
  styled,
  Text,
  theme,
  Loading
} from "@nextui-org/react"
import { useMemo } from "react"

const WarningBox = styled('div', {
  padding: '3px 8px',
  marginTop: '10px',
  borderRadius: '8px',
  '&.error': {
    background: theme.colors.error.value
  },
  '&.warning': {
    background: theme.colors.warning.value
  },
  '&.loading': {
    background: null
  },
})

export default function ErrorCard ({
  errorTip
}: {
  errorTip: any
}) {
  if (!errorTip) return null
  const WarningView = () => {
    if (errorTip?.state === 'Error') {
      return <WarningBox className='error'>
        <Text b size="$sm" color="white" css={{}}>{errorTip?.tip}</Text>
      </WarningBox>
    } else if (['Warning'].includes(errorTip?.state)) {
      return <WarningBox className='warning'>
        <Text b size="$sm" color="white" css={{}}>{errorTip?.tip}</Text>
      </WarningBox>
    } else if (['Loading'].includes(errorTip?.state)) {
      return <WarningBox className='loading'>
        <Text b size="$xs" color="secondary" css={{}}>{errorTip?.tip}</Text>
        <Loading color="secondary" type="points-opacity" />
      </WarningBox>
    }
    return null
  }

  return (<>
    <Row justify="center" align="center">
      <WarningView />
    </Row>
  </>)
}