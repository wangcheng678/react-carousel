import React from 'react'
import T from 'prop-types'
import {useSpring, animated} from 'react-spring'
import {useGesture} from 'react-use-gesture'
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

const useTransformStyle = (currentIndex, step, axis, sign) => {
  const s = sign * currentIndex * step

  const [props, set] = useSpring(() => ({s}))

  React.useEffect(() => {
    set({s, immediate: false})
  }, [s, set])

  const transform = props.s.interpolate(i => `translate${axis}(${i}px)`)
  const getS = () => props.s.getValue()
  const resetPosition = () => set({s, immediate: false})
  const setPosition = i => set({s: i, immediate: true})
  return {transform, getS, setPosition, resetPosition}
}

const Slides = ({currentIndex, slideItems, className, step, advancedGoto}) => {
  const direction = React.useContext(DirectionContext)
  const axis = isHorizontal(direction) ? 'X' : 'Y' // 看第一位水平还是竖直
  const sign = isLeftToRight(direction) ? -1 : 1 // 看最后一位上还是下
  const {transform, getS, setPosition, resetPosition} = useTransformStyle(
    currentIndex,
    step,
    axis,
    sign
  )

  const getNewIndex = x => Math.round(x / sign / step)

  const bind = useGesture({
    onDrag: ({delta, last, temp = getS()}) => {
      const ds = isHorizontal(direction) ? delta[0] : delta[1]
      const newS = ds + temp
      if (last) {
        const newIndex = getNewIndex(newS) // clamp
        if (newIndex === currentIndex) {
          resetPosition()
        }
        advancedGoto(newIndex, resetPosition)
      } else {
        setPosition(newS)
      }
      return temp
    },
  })

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
      <animated.div style={wrapperStyle} {...bind()}>
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
  advancedGoto: T.func.isRequired,
}

export default Slides
