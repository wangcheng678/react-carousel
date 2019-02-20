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

  const goTo = i => {
    setCurrentIndex(clamp(i))
  }

  return {
    currentIndex,
    goTo,
    goNext,
    goPrev,
  }
}
