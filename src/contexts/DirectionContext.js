import {createContext} from 'react'

/*
  第一位：0 水平，1 竖直
  第二位：0 从左到右/从上到下，1 从右向左/从上到下
 */

const DirectionContext = createContext(0b00)
DirectionContext.displayName = 'DirectionContext'

export default DirectionContext

export const isHorizontal = direction => !(direction >>> 1)

export const isLeftToRight = direction => !(direction % 2)
