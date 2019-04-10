import React, {useRef, useEffect, useContext} from 'react'
import T from 'prop-types'
import {useSpring, animated} from 'react-spring'
import {useGesture} from 'react-with-gesture'
import clamp from 'lodash/clamp'
import DirectionContext, {
  isHorizontal,
  isLeftToRight,
} from '../contexts/DirectionContext'

const FLEX_DIR_MAP_LTR = {
  0b00: 'row',
  0b01: 'row-reverse',
  0b10: 'column',
  0b11: 'column-reverse', // TODO: 对齐 bug
}

const getTransform = (s, axis, sign) => {
  return `translate${axis}(${sign * s}px)`
}

const getCommonStyle = direction => ({
  display: 'flex',
  alignContent: 'flex-start',
  flexDirection: FLEX_DIR_MAP_LTR[direction],
  listStyle: 'none',
  margin: '0',
  padding: '0',
})

function useTransformStyle(currentIndex, step, goTo, length) {
  const lastIndexRef = useRef(currentIndex)

  const [spring, set] = useSpring(() => ({s: currentIndex * step}))

  useEffect(() => {
    lastIndexRef.current = currentIndex
    set({s: currentIndex * step})
  }, [currentIndex, step, set])

  const bind = useGesture({
    passive: false,
    onAction: ({event, down, delta: [xDelta], direction: [xDir]}) => {
      console.log(event)
      if (event.cancelable) {
        event.preventDefault()
        event.stopPropagation()
      }
      if (down) {
        const s = lastIndexRef.current * step - xDelta
        set({immediate: true, to: {s}})
      } else {
        const indexDelta = Math.round(-xDelta / step)
        const newIndex = clamp(lastIndexRef.current + indexDelta, 0, length - 1)
        lastIndexRef.current = newIndex
        set({immediate: false, to: {s: newIndex * step}})
        if (newIndex !== lastIndexRef.current) {
          goTo(newIndex)
        }
      }
    },
  })

  return {spring, bind}
}

function useCommonStyle() {
  const direction = useContext(DirectionContext)
  return getCommonStyle(direction)
}

export default function Slides({
  currentIndex,
  slideItems,
  className,
  itemWidth,
  goTo,
}) {
  const direction = useContext(DirectionContext)
  const {spring, bind} = useTransformStyle(
    currentIndex,
    itemWidth,
    goTo,
    slideItems.length
  )

  const transform = spring.s.interpolate(i => {
    const axis = isHorizontal(direction) ? 'X' : 'Y' // 看第一位水平还是竖直
    const sign = isLeftToRight(direction) ? -1 : 1 // 看最后一位上还是下
    return getTransform(i, axis, sign)
  })
  const commonStyle = useCommonStyle()
  const style = {...commonStyle, transform}
  return (
    <div className={className}>
      <animated.ul style={style} {...bind()}>
        {slideItems.map((child, index) => (
          <li
            key={index}
            style={{
              color: currentIndex === index ? 'red' : 'black',
              width: `${itemWidth}px`,
              height: `${itemWidth}px`,
              flex: 'none',
            }}
          >
            {child}
          </li>
        ))}
      </animated.ul>
    </div>
  )
}

Slides.propTypes = {
  currentIndex: T.number.isRequired,
  slideItems: T.arrayOf(T.node).isRequired,
  className: T.string,
  itemWidth: T.number.isRequired,
}
