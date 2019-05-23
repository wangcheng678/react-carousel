import {useEffect, useContext} from 'react'
import DirectionContext from '../contexts/DirectionContext'

const KEY_MAP = {
  ArrowRight: 0b00,
  ArrowLeft: 0b01,
  ArrowDown: 0b10,
  ArrowUp: 0b11,
}

const getKeyEventResult = (event, direction) => {
  const {key, ctrlKey, shiftKey, altKey, metaKey} = event

  if (ctrlKey || shiftKey || altKey || metaKey) return -1

  const keyValue = KEY_MAP[key]

  if (typeof keyValue !== 'number') return -1

  return keyValue ^ direction
}

// TODO 只在 Slides 聚焦时监听
const useKeybordShortcut = ({goNext, goPrev, useKeyUp}) => {
  const direction = useContext(DirectionContext)
  const targetType = useKeyUp ? 'keyup' : 'keydown'

  useEffect(() => {
    const callback = event => {
      const result = getKeyEventResult(event, direction)
      const isTargetType = targetType === event.type

      if (result === 0) {
        if (isTargetType) {
          goNext()
        }
        event.preventDefault()
      } else if (result === 1) {
        if (isTargetType) {
          goPrev()
        }
        event.preventDefault()
      }
    }

    document.addEventListener('keyup', callback)
    document.addEventListener('keydown', callback)

    return () => {
      document.removeEventListener('keyup', callback)
      document.removeEventListener('keydown', callback)
    }
  }, [direction, goNext, goPrev, targetType])
}

export default useKeybordShortcut
