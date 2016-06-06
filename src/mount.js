import React, {Component} from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'

if (module.hot) {
  module.hot.accept()
}

window.describe = (text, fn) => fn()
window.it = (text, fn) => fn()

const mount = ReactCards => render(<AppContainer><ReactCards /></AppContainer>, window.mountNode)

export default mount
