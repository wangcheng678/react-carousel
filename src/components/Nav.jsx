import React from 'react'
import T from 'prop-types'

export default function Nav({currentIndex, goPrev, goNext}) {
  return (
    <nav>
      <button type="button" onClick={goPrev}>
        prev
      </button>
      <span>{currentIndex + 1}</span>
      <button type="button" onClick={goNext}>
        next
      </button>
    </nav>
  )
}

Nav.propTypes = {
  currentIndex: T.number.isRequired,
  goPrev: T.func.isRequired,
  goNext: T.func.isRequired,
}
