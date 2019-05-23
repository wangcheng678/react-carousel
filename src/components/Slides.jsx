import React from 'react'
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

const COMMON_STYLES = {
  display: 'flex',
  alignContent: 'flex-start',
  listStyle: 'none',
  margin: '0',
  padding: '0',
}

const useTransformStyle = (currentIndex, step) => {
  const direction = React.useContext(DirectionContext)
  const axis = isHorizontal(direction) ? 'X' : 'Y' // 看第一位水平还是竖直
  const sign = isLeftToRight(direction) ? -1 : 1 // 看最后一位上还是下

  const {transform} = useSpring({
    transform: `translate${axis}(${sign * currentIndex * step}px)`,
  })

  return transform
}

const Slides = ({currentIndex, slideItems, className, step}) => {
  const direction = React.useContext(DirectionContext)
  const transform = useTransformStyle(currentIndex, step)

  const wrapperStyle = {
    ...COMMON_STYLES,
    flexDirection: FLEX_DIR_MAP_LTR[direction],
    transform,
  }

  const itemStyle = {
    width: `${step}px`,
    height: `${step}px`,
    flex: 'none',
  }

  return (
    <div className={className}>
      <animated.div style={wrapperStyle}>
        {slideItems.map((child, index) => (
          <div
            key={index}
            data-active={currentIndex === index ? true : null}
            style={itemStyle}
          >
            {child}
          </div>
        ))}
      </animated.div>
    </div>
  )
}

Slides.propTypes = {
  currentIndex: T.number.isRequired,
  slideItems: T.arrayOf(T.node).isRequired,
  className: T.string,
  step: T.number.isRequired,
}

export default Slides
