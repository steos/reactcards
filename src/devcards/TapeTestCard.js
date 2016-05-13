import React, {Component} from 'react'
import {Card} from './components'
import {test} from 'tape'

export default class TapeTestCard extends Component {
  constructor(props) {
    super(props)
    this.state = {results: []}
  }
  componentWillUnmount() {
  }
  componentDidMount() {
    //TODO
    console.log('tape card mounted', this.props)
    this.runTests(this.props.run)
  }
  componentWillReceiveProps(nextProps) {
    //TODO
    console.log('tape card receiving props')
    this.setState({results: []})
    this.runTests(nextProps.run)
  }
  runTests(run) {
    const tapeStream = test.createStream({objectMode: true})
    // console.log('harness', test.getHarness())
    // console.log('stream', tapeStream, test)
    const pushResult = row => {
      console.log('pushing test data', this.props.title, row)
      this.setState({results: [...this.state.results, row]})
    }
    tapeStream.on('data', pushResult)
    tapeStream.once('end', () => {
      console.log('cleanup', this.props.title)
      tapeStream.removeListener('data', pushResult)
      tapeStream.destroy()
      test.getHarness()._results.removeAllListeners()
    })
    console.log('running tests')
    run()
  }
  renderResultItem(item, key) {
    if (item.type === 'test') {
      return <h4 key={key}>{item.name}</h4>
    }
    if (item.ok === true) {
      return <div key={key} style={{color:'green'}}>✔ {item.name}</div>
    } else {
      return <div key={key} style={{color:'red'}}>✘ {item.name}: {item.actual} {item.expected}</div>
    }
  }
  render() {
    const results = this.state.results.filter(item => item.type !== 'end')
    return (
      <Card title={this.props.title}>
      {results.map(this.renderResultItem.bind(this))}
      </Card>
    )
  }
}
