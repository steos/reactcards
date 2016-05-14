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
    console.log('Foo updated')
  }
  render() {
    return <div>Foo says '{this.props.message}.'</div>
  }
}

export const Bar = (props) => {
  console.log('bar rendering', props)
  return (<div>a bar. drink up!</div>)
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
