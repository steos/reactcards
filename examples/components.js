import React, {Component} from 'react'

export class Foo extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('Foo receiving props', nextProps, this.props)
  }
  componentWillUnmount() {
    console.log('Foo unmounting')
  }
  componentDidMount() {
    console.log('Foo did mount')
  }
  componentDidUpdate() {
    console.log('Foo updated!')
  }
  render() {
    return <div className='foo'>Foo says '{this.props.message}.'</div>
  }
}

export const Bar = (props) => {
  return (<div className='bar'>a bar. drink up!</div>)
}

export const StatelessCounter = props => (
  <div>
  <button onClick={props.inc}>+</button>
  <span>{props.value}</span>
  <button onClick={props.dec}>-</button>
  </div>
)

export class StatefulCounter extends Component {
  constructor(props) {
    super(props)
    this.state = {value: props.value}
  }
  render() {
    return (
      <StatelessCounter
        inc={() => this.setState({value: this.state.value + 1})}
        dec={() => this.setState({value: this.state.value - 1})}
        value={this.state.value}/>
    )
  }
}

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }
  submit() {
    this.props.onSubmit(this.state.text.trim())
    this.setState({text: ''})
  }
  render() {
    return (
      <div>
        <input type="text"
          value={this.state.text}
          onChange={e => this.setState({text: e.target.value})}/>
        <button onClick={this.submit.bind(this)}
          disabled={this.state.text.trim().length < 1}>Save</button>
      </div>
    )
  }
}

export const TodoList = props => (
  <div>
    <TodoForm onSubmit={props.onSubmit}/>
    <ul>
      {props.items.map((item, index) =>
        <li key={index} onClick={props.onToggleItem.bind(null, index)}>
        <span style={{textDecoration: item.done ? 'line-through' : 'none'}}>{item.text}</span>
        </li>
      )}
    </ul>
  </div>
)
