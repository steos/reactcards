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
      console.log('tape stream end, setting results', results)
      this.setState({results})
    })
    console.log('running tests')
    run()
  }
  renderResultItem(item, key) {
    if (item.type === 'test') {
      return <h4>{item.name}</h4>
    }
    if (item.ok === true) {
      return <div key={key} style={{color:'green'}}>{item.name}</div>
    } else {
      return <div key={key} style={{color:'red'}}>{item.name}: {item.actual} {item.expected}</div>
    }
  }
  render() {
    const results = this.state.results.filter(item => item.type !== 'end')
    return (
      <div>
      <strong>{this.props.title}</strong>
      {results.map(this.renderResultItem.bind(this))}
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
