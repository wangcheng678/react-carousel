import React from 'react'
import {render} from 'react-dom'
import BusinessCard from '../src/index'

const app = (
  <BusinessCard className="container" itemWidth={200}>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
    <div>Slide 4</div>
    <div>Slide 5</div>
  </BusinessCard>
)

render(app, document.getElementById('app'))
