import React, {Component} from 'react'
import {render} from 'react-dom'
import devcards from './cards'
import {CardList} from './devcards/components'
import {AppContainer} from 'react-hot-loader'

const renderCards = () =>
  render(<AppContainer>{devcards.component()}</AppContainer>, window.mountNode)

const run = renderCards

run()

if (module.hot) {
  module.hot.accept()
  window.notify.style.opacity=100
  setTimeout(() => window.notify.style.opacity=0, 500)
}
