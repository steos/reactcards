import React, {Component} from 'react'
import {Card} from './components'

const hStyle = {
  fontFamily:'sans-serif',
  fontWeight:'normal',
  fontSize:'1.2em',
  margin:0,
  padding:0,
  marginBottom:'12px',
}

const TestHeaderOk = props =>
  <h4 style={{...hStyle, color:'green'}}>✔ {props.children}</h4>

const TestFailure = props => (
  <div>
    <h4 style={{...hStyle, color:'red'}}>✘ {props.children}</h4>
    <p style={{fontFamily:'monospace'}}>{props.error.toString()}</p>
  </div>
)

export default class TestCard extends Component {
  constructor(props) {
    super(props)
    this.state = {results: []}
  }
  componentWillReceiveProps(nextProps) {
    //TODO
    this.runTests(nextProps.testModule)
  }
  componentDidMount() {
    //TODO
    this.runTests(this.props.testModule)
  }
  runTests(testModule) {
    console.log('running tests', Object.keys(testModule))
    const results = []
    const tests = Object.keys(testModule)
    tests.forEach(name => {
      try {
        testModule[name]()
        results.push([true, name])
      } catch(e) {
        results.push([e, name])
      }
    })
    console.log(results)
    this.setState({results})
  }
  render() {
    return (
      <Card title={this.props.title}>
      {this.state.results.map(([result, name], index) => (
        result === true
          ? <TestHeaderOk key={index}>{name}</TestHeaderOk>
          : <TestFailure key={index} error={result}>{name}</TestFailure>
        )
      )}
      </Card>
    )
  }
}
