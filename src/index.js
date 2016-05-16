import React from 'react'
import {Card, CardList, MarkdownCard} from './components'
import TestCard from './TestCard'
import StatefulCard from './StatefulCard'
import Container from './Container'
import namespaceStore from './namespaceStore'

let store = namespaceStore()

/**
 *
 * main function that creates the Container with the supplied namespaces and optional history object
 *
 * @param {Object} namespaces an object containing all namepaces and their corresponding
 * @param {Object} history history object (optional) override with another history object if needed
 *
 * @returns {XML}
 */
const main = (namespaces, history) => {
  return <Container namespaces={namespaces} history={history} />
}

// initialize...
export const Root = ({ history }) => <div>{ main(store.get(), history) }</div>

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
