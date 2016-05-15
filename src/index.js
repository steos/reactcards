import React from 'react'
import {Card, CardList, MarkdownCard} from './components'
import TestCard from './TestCard'
import StatefulCard from './StatefulCard'
import Container from './Container'

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
    console.log('update', this.namespaces)
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

// initialize...
export const Root = () => <div>{ main(namespaceStore.get()) }</div>

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
    test(testModule, title = '') {
      cards.push(<TestCard key={nextId++} testModule={testModule} title={title}/>)
    },
    markdown(text) {
      cards.push(<MarkdownCard key={nextId++}>{text}</MarkdownCard>)
    }
  }
}
