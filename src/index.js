import React, {Component} from 'react'
import {Card, CardList, MarkdownCard} from './components'
import TestCard from './TestCard'
import StatefulCard from './StatefulCard'
import Container from './Container'
import { hotNotifyStyle } from './styles'

const namespaces = {}

// a simplified example for handling namespaces and their corresponding changes
const namespaceStore = {
  namespaces: {},
  listeners: [],
  get(namespace) {
    return namespace? this.namespaces[namespace] : this.namespaces
  },
  set(namespace, cards) {
    this.namespaces[namespace] = cards
    this.notify()
  },
  subscribe(f) {
    this.listeners.push(f)
    return () => this.listeners.filter(l => l != f)
  },
  notify() {
    this.listeners.map(l => l(this.namespaces))
  }
}

const main = (namespaces) => {
  return <Container namespaces={ namespaces } />
}

class HotNotify extends Component {
  constructor(props) {
    super(props)
    this._node = null
  }
  componentWillReceiveProps() {
    // TODO will this really only be triggered by a hot update?
    this._node.style.opacity = 100
    setTimeout(() => this._node.style.opacity = 0, 500)
  }
  render() {
    return (
      <div ref={node => this._node = node}
        style={hotNotifyStyle}>Hot Update</div>
    )
  }
}

// initialize...
export const Root = () => (
  <div>
    { main(namespaceStore.get()) }
    <HotNotify/>
  </div>
)

// subscribe to changes
var f = namespaceStore.subscribe(main)

export default function(namespace = '[default]') {
  const cards = []
  let nextId = 1
  namespaceStore.set(namespace, cards)
  return {
    card(content, opts = {}) {
      const CardImpl = typeof content === 'function' ? StatefulCard : Card
      cards.push(<CardImpl {...opts} key={nextId++}>{content}</CardImpl>)
    },
    list() {
      return cards
    },
    component() {
      return <CardList namespace={namespace}>{cards}</CardList>
    },
    test(testModule, opts = {}) {
      cards.push(<TestCard {...opts} key={nextId++} testModule={testModule}/>)
    },
    markdown(text) {
      cards.push(<MarkdownCard key={nextId++}>{text}</MarkdownCard>)
    }
  }
}
