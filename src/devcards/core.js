import React, {Component, createFactory} from 'react'
import {render} from 'react-dom'
import {test} from 'tape'
import path from 'path'
export class CardList extends Component {
  render() {
    return (
      <div>
      {this.props.children}
      </div>
    )
  }
}

class Card extends Component {
  render() {
    return (
      <div>
        <strong>{this.props.title}</strong>
        {this.props.content}
      </div>
    )
  }
}

class TapeTestCard extends Component {
  constructor(props) {
    super(props)
    this.state = {results: []}
  }
  componentDidMount() {
    //TODO
    console.log('tape card mounted', this.props)
    this.runTests(this.props.run)
  }
  componentWillReceiveProps(nextProps) {
    //TODO
    console.log('tape card receiving props')
    this.runTests(nextProps.run)
  }
  runTests(run) {
    const results = []
    console.log('setting up tape stream')
    const stream = test.createStream({objectMode: true})
    stream.on('data', row => results.push(row))
    stream.on('end', () => {
      console.log('tape stream end, setting state', results)
      this.setState({results})
    })
    console.log('running tests')
    run()
  }
  render() {
    return (
      <div>
      <strong>{this.props.title}</strong>
      <pre>{JSON.stringify(this.state.results, null, ' ')}</pre>
      </div>
    )
  }
}

const makeCardList = createFactory(CardList)

const makeCard = createFactory(Card)

export default function() {
  const cards = []
  let nextId = 1
  return {
    card(content, title = '') {
      cards.push(makeCard({title, content, key: nextId++}))
    },
    list() {
      return cards
    },
    tape(run, title = '') {
      //TODO
      cards.push(<TapeTestCard key={nextId++} run={run} title={title}/>)
    }
  }
}
