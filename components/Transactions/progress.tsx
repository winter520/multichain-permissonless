import {
  styled,
  theme,
  Progress
} from '@nextui-org/react'
import { useMemo } from 'react'

const ProgressBox = styled('div', {
  width: '320px',
  height: '38px',
  padding: '8px 0',
  position: 'relative',
  margin: 'auto'
})

const ProgressContent = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0
})

const ProgressState = styled('div', {
  width: '25%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap'
})

const initColor = theme.colors.gray500.value

const ProgressStateStep = styled('div', {
  width: '20px',
  height: '20px',
  fontSize: '12px',
  borderRadius: '100%',
  border: '1px solid ' + initColor,
  color: initColor,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$modalBg',
  "&.active": {
    border: '1px solid ' + theme.colors.success.value,
    color: theme.colors.success.value,
  }
})
const ProgressStateText = styled('div', {
  width: '100%',
  fontSize: '12px',
  color: initColor,
  textAlign: 'center',
  "&.active": {
    color: theme.colors.success.value,
  }
})

const ProgressLine = styled('div', {
  width: '240px',
  position:'absolute',
  top: '',
  left: '40px',
  right: '40px',
})

const stepArr = [
  {state: 'Pending'},
  {state: 'Finalizing'},
  {state: 'zkproving'},
  {state: 'Success'},
]

export default function ProgressView({
  state
}: {
  state: number
}) {
  const pecent = useMemo(() => {
    // return ((state + 1) / stepArr.length ) * 100 + 10
    return 0
  }, [state, stepArr])
  return (<>
    <ProgressBox>
      <ProgressLine>
        <Progress size="xs" value={pecent} color="success" />
      </ProgressLine>
      <ProgressContent>
        {
          stepArr.map((item, index) => {
            return <ProgressState key={index}>
              <ProgressStateStep className={state === index ? 'active' : ''}>{index + 1}</ProgressStateStep>
              <ProgressStateText className={state === index ? 'active' : ''}>{item.state}</ProgressStateText>
            </ProgressState>
          })
        }
      </ProgressContent>
    </ProgressBox>
  </>)
}