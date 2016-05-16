import React from 'react'
import createHistory from '../node_modules/history/lib/createBrowserHistory'
import {Card, CardList, MarkdownCard} from './components'
import TestCard from './TestCard'
import StatefulCard from './StatefulCard'
import Container from './Container'
import namespaceStore from './namespaceStore'

const history = createHistory()

let store = namespaceStore()

const main = (namespaces) => {
  return <Container namespaces={ namespaces } history={history} />
}

// initialize...
export const Root = () => <div>{ main(store.get()) }</div>

// subscribe to changes
var f = store.subscribe(main)

export default function(namespace = 'default') {
  const cards = []
  let nextId = 1
  store.set(namespace, cards)
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
