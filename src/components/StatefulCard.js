import React, {Component} from 'react'
import Card from './Card'
import deepEqual from 'deep-equal'
import style from './style.less'

export default class StatefulCard extends Component {
  constructor(props) {
    super(props)
    this.state = {model: props.init, history: [], future: []}
    this.control = {
      get: this.getModel.bind(this),
      update: this.update.bind(this)
    }
  }
  getModel() {
    return this.state.model
  }
  update(f) {
    const next = f(this.getModel())
    this.setState({
      model: next,
      history: [...this.state.history, this.state.model],
      future: []
    })
  }
  componentWillReceiveProps(nextProps) {
    if (deepEqual(nextProps.init, this.props.init)) return
    this.update(() => nextProps.init)
  }
  undo() {
    if (this.state.history.length < 1) return
    const last = this.state.history[this.state.history.length-1]
    this.setState({
      model: last,
      history: this.state.history.slice(0, -1),
      future: [...this.state.future, this.state.model]
    })
  }
  redo() {
    if (this.state.future.length < 1) return
    const last = this.state.future[this.state.future.length-1]
    this.setState({
      model: last,
      future: this.state.future.slice(0, -1),
      history: [...this.state.history, this.state.model]
    })
  }
  render() {
    const {title, doc} = this.props
    
    let children
    try {
      children = this.props.children(this.control)
    } catch(err) {
      /* 
         Can't `throw new Error()`, It's swallowed by something
         This is at least informative
      */
      console.error(err) 
    }
    
    return (
      <Card {...{title, doc}}>
      {this.props.history ? this.renderHistoryControl() : null}
      {children}
      {this.props.inspect ? this.renderInspect() : null}
      </Card>
    )
  }
  renderHistoryControl() {
    return (
      <div className='react-cards-history-control' style={{marginBottom:'1em'}}>
        <button id='react-cards-undo' onClick={this.undo.bind(this)}
          disabled={this.state.history.length < 1}>Undo</button>
        <button id='react-cards-redo' onClick={this.redo.bind(this)}
          disabled={this.state.future.length < 1}>Redo</button>
      </div>
    )
  }
  renderInspect() {
    return (
      <div className={'react-cards-inspect '+style.inspectBox}>
      <p style={{fontSize:'.7em',color:'#777'}}>model:</p>
      <pre>{JSON.stringify(this.getModel(), null, ' ')}</pre>
      </div>
    )
  }
}
