import React from 'react'
import {render} from 'react-dom'
import Carousel from '../src/index'

const App = () => {
  const [added, setAdded] = React.useState(false)
  return (
    <React.Fragment>
      <button type="button" onClick={() => setAdded(a => !a)}>
        add item
      </button>
      <Carousel className="container" step={200}>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
        {added && <div>Slide 4</div>}
        <div>Slide 5</div>
      </Carousel>
    </React.Fragment>
  )
}

render(<App />, document.getElementById('app'))
