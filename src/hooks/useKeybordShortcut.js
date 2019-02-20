import {useEffect, useContext} from 'react'
import DirectionContext from '../contexts/DirectionContext'

const KEY_MAP = {
  ArrowRight: 0b00,
  ArrowLeft: 0b01,
  ArrowDown: 0b10,
  ArrowUp: 0b11,
}

// TODO 只在 Slides 聚焦时监听
function getKeyEventResult(event, direction) {
  const {key, ctrlKey, shiftKey, altKey, metaKey} = event

  if (ctrlKey || shiftKey || altKey || metaKey) return -1

  const keyValue = KEY_MAP[key]

  if (typeof keyValue !== 'number') return -1

  return keyValue ^ direction
}

export default function useKeybordShortcut({goNext, goPrev}) {
  const direction = useContext(DirectionContext)
  const keyUpCallback = event => {
    const result = getKeyEventResult(event, direction)

    if (result === 0) {
      goNext()
      event.preventDefault()
    } else if (result === 1) {
      goPrev()
      event.preventDefault()
    }
  }

  const keyDownCallback = event => {
    const result = getKeyEventResult(event, direction)
    if (result === 0 || result === 1) {
      event.preventDefault()
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', keyUpCallback)
    document.addEventListener('keydown', keyDownCallback)
    return () => {
      document.removeEventListener('keyup', keyUpCallback)
      document.removeEventListener('keydown', keyDownCallback)
    }
  })
}
