import {
  Card,
  Row,
  styled,
  Text,
  theme
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
  }
})

export default function ErrorCard ({
  errorTip
}: {
  errorTip: any
}) {
  if (!errorTip) return null
  const warnColor = useMemo(() => {
    if (errorTip?.state === 'Error') {
      return 'error'
    } else if (errorTip?.state === 'Warning') {
      return 'warning'
    }
  }, [errorTip])

  return (<>
    <Row justify="center" align="center">

      <WarningBox className={warnColor}>
        <Text b size="$sm" color="white" css={{}}>{errorTip?.tip}</Text>
      </WarningBox>
    </Row>
  </>)
}