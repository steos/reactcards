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
    return <div>Foo says '{this.props.message}'</div>
  }
}

export const Bar = (props) => {
  console.log('bar rendering', props)
  return (<div>a bar. drink up.</div>)
}
