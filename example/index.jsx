import React from 'react'
import {render} from 'react-dom'
import Carousel from '../src/index'

const app = (
  <Carousel className="container" step={200}>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
    <div>Slide 4</div>
    <div>Slide 5</div>
  </Carousel>
)

render(app, document.getElementById('app'))
