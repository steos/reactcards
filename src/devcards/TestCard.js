import React, {Component} from 'react'
import {Card} from './components'

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
    console.log('rendering test card', this.state.results)
    const hStyle = {
      fontFamily:'sans-serif',
      fontWeight:'normal',
      fontSize:'1.2em',
      margin:0,
      padding:0,
      marginBottom:'12px',
    }
    return (
      <Card title={this.props.title}>
      {this.state.results.map(([result, name], index) => (
        result === true
          ? <h4 style={{...hStyle, color:'green'}} key={index}>✔ {name}</h4>
          : <div key={index}><h4 style={{...hStyle, color:'red'}}>✘ {name}</h4><pre>{result.toString()}</pre></div>
        )
      )}
      </Card>
    )
  }
}
