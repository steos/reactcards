import React, {Component} from 'react'
import {render} from 'react-dom'
import devcards from './cards'
import {CardList} from './devcards/components'
import {AppContainer} from 'react-hot-loader'

if (module.hot) {
  module.hot.accept()
  window.notify.style.opacity=100
  setTimeout(() => window.notify.style.opacity=0, 500)
  window.describe = (text, fn) => fn(),
  window.it = (text, fn) => fn()
}

const renderCards = () =>
  render(<AppContainer>{devcards.component()}</AppContainer>, window.mountNode)

const run = renderCards

run()

