import React, {useRef, useEffect, useContext, useMemo} from 'react'
import T from 'prop-types'
import {useSpring, animated} from 'react-spring'
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

const getTransform = (s, axis, sign, step) => {
  return `translate${axis}(${sign * s * step}px)`
}

const getCommonStyle = direction => ({
  display: 'flex',
  alignContent: 'flex-start',
  flexDirection: FLEX_DIR_MAP_LTR[direction],
  listStyle: 'none',
  margin: '0',
  padding: '0',
})

function useTransformStyle(currentIndex, itemWidth) {
  const lastIndexRef = useRef(currentIndex)
  const direction = useContext(DirectionContext)

  useEffect(() => {
    lastIndexRef.current = currentIndex
  }, [currentIndex])

  const interpolateTransform = useMemo(() => {
    const axis = isHorizontal(direction) ? 'X' : 'Y' // 看第一位水平还是竖直
    const sign = isLeftToRight(direction) ? -1 : 1 // 看最后一位上还是下
    return i => getTransform(i, axis, sign, itemWidth)
  }, [direction, itemWidth])

  const spring = useSpring({
    from: {s: lastIndexRef.current},
    to: {s: currentIndex},
  })

  return spring.s.interpolate(interpolateTransform)
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
}) {
  const transform = useTransformStyle(currentIndex, itemWidth)
  const commonStyle = useCommonStyle()
  const style = {...commonStyle, transform}
  return (
    <div className={className}>
      <animated.ul style={style}>
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
