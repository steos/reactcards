import React, { Component } from 'react'
import style from './style.less'

export default class HotNotify extends Component {
  constructor(props) {
    super(props)
    this._node = null
  }
  componentWillReceiveProps() {
    // TODO will this really only be triggered by a hot update?
    this._node.style.opacity = 100
    setTimeout(() => this._node.style.opacity = 0, 500)
  }
  render() {
    return (
      <div ref={node => this._node = node}
           className={style.hotNotify}>Hot Update</div>
    )
  }
}
