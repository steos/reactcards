import React, {Component} from 'react'
import {render} from 'react-dom'
import devcards from './cards'
import {CardList} from './devcards/core'
import {AppContainer} from 'react-hot-loader'
import {test} from 'tape'

const renderCards = () =>
  render(<AppContainer component={CardList} props={{children: devcards.list()}}/>, window.mountNode)

// const runTests = () => {
//   console.log('running tests')
//   test.createStream({objectMode: true}).on('data', row =>
//     console.log('test result',row)
//   )
//   require('../test/components')
// }

const run = () => {
  // runTests()
  renderCards()
}

run()

if (module.hot) {
  module.hot.accept(() => {
    // TODO give some visual indication that update happened
    // besides the output in the console, like figwheel
    run()
  })
}
