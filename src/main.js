import React, {Component} from 'react'
import {render} from 'react-dom'
import devcards from './cards'
import {CardList} from './devcards/core'
import {AppContainer} from 'react-hot-loader'

const renderCards = () =>
  render(<AppContainer component={CardList} props={{children: devcards.list()}}/>, window.mountNode)

renderCards()

if (module.hot) {
  module.hot.accept(renderCards)
}
