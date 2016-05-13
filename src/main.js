import React, {Component} from 'react'
import {render} from 'react-dom'
import devcards from './cards'
import {CardList} from './devcards/components'
import {AppContainer} from 'react-hot-loader'

const renderCards = () =>
  render(
    <AppContainer
      component={CardList}
      props={{children: devcards.list()}}/>,
    window.mountNode
  )

const run = renderCards

run()

if (module.hot) {
  module.hot.accept(() => {
    // TODO give some visual indication that update happened
    // besides the output in the console, like figwheel
    run()
  })
}
