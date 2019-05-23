import {useState} from 'react'

export default function useCurrentIndex(initialIndex = 0, length) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const clamp = x => Math.min(length - 1, Math.max(0, x))

  const goNext = () => {
    setCurrentIndex(i => clamp(i + 1))
  }

  const goPrev = () => {
    setCurrentIndex(i => clamp(i - 1))
  }

  const advancedGoto = (i, fallback) => {
    const clamped = clamp(i)
    if (clamped === currentIndex && fallback) {
      fallback()
    } else {
      setCurrentIndex(clamped)
    }
  }

  return {
    currentIndex,
    advancedGoto,
    goNext,
    goPrev,
  }
}
