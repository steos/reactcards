import React from 'react'
import {render} from 'react-dom'
import {buildCards} from './cards'
import {AppContainer} from 'react-hot-loader'
import { ReactCardsRoot } from '../src'

buildCards();

if (module.hot) {
  module.hot.accept()
  window.describe = (text, fn) => fn()
  window.it = (text, fn) => fn()
}

render(
  <AppContainer>
    <ReactCardsRoot />
  </AppContainer>,
  window.mountNode
)
