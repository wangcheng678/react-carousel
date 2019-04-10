import React, {Children, Fragment} from 'react'
import T from 'prop-types'
import useCurrentIndex from './hooks/useCurrentIndex'
import useKeybordShortcut from './hooks/useKeybordShortcut'
import Slides from './components/TouchSlides'
import Nav from './components/Nav'

export default function Carousel({children, className, itemWidth}) {
  const slideItems = Children.toArray(children)
  const {currentIndex, goNext, goPrev, goTo} = useCurrentIndex(
    0,
    slideItems.length
  )
  useKeybordShortcut({goNext, goPrev})
  return (
    <Fragment>
      <Slides
        currentIndex={currentIndex}
        className={className}
        itemWidth={itemWidth}
        slideItems={slideItems}
        goTo={goTo}
      />
      <Nav currentIndex={currentIndex} goNext={goNext} goPrev={goPrev} />
    </Fragment>
  )
}

Carousel.propTypes = {
  children: T.node.isRequired,
  className: T.string,
  itemWidth: T.number.isRequired,
}
