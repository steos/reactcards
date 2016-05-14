import React, {Component} from 'react'
import {Card} from './components'

export default class StatefulCard extends Component {
  constructor(props) {
    super(props)
    this.state = {model: props.init}
    this.control = {
      get: this.getModel.bind(this),
      update: this.update.bind(this)
    }
  }
  getModel() {
    return this.state.model
  }
  update(f) {
    this.setState({model: f(this.getModel())})
  }
  componentWillReceiveProps(nextProps) {
    this.setState({model: nextProps.init})
  }
  render() {
    const {title, doc} = this.props
    return (
      <Card {...{title, doc}}>{this.props.children(this.control)}</Card>
    )
  }
}
