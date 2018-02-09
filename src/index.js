import React, { Component } from 'react'
import { Card, CardList, MarkdownCard, TestCard, StatefulCard, Container, HotNotify } from './components'
import namespaceStore from './namespaceStore'
import mount from './mount'
import resolveTests from './utils/resolveTests'

let store = namespaceStore()

const main = (namespaces, history) => {
  return <Container namespaces={namespaces} history={history} />
}

// initialize...
const ReactCards = ({ history }) => (
  <div>
    { main(store.get(), history) }
    <HotNotify />
  </div>
)

// main client entry point
const run = () => mount(ReactCards)

const isStr = x =>
  Object.prototype.toString.call(x) === '[object String]'

const processArgs = args => {
  const [fst] = args
  if (isStr(fst)) {
    const [, content, opts] = args
    return [content, {...opts, doc: fst}]
  } else {
    const [content, opts = {}] = args
    return [content, opts]
  }
}

const makeCardName = (namespace, opts) => {
    //TODO: Make this better
    return namespace + "__" + opts.doc.split('\n')[0];
}

export default function(namespace = 'default') {
  const cards = []
  let nextId = 1
  return {
    card(...args) {
      const [content, opts] = processArgs(args)
      const CardImpl = typeof content === 'function' ? StatefulCard : Card
      const card = <CardImpl {...opts} key={nextId++}>{content}</CardImpl>
      const cardName = makeCardName(namespace, opts)
      //TODO: Do we need to push the card to the cards list?
      cards.push(card)
      store.set(cardName, [card])
    },
    list() {
      return cards
    },
    component() {
      return <CardList namespace={namespace}>{cards}</CardList>
    },
    test(...args) {
      const [content, opts] = processArgs(args)
      const card = <TestCard {...opts} key={nextId++} testModule={content}/>
      const cardName = makeCardName(namespace, opts)
      cards.push(card)
      store.set(cardName, [card])
    },
    markdown(text) {
      //TODO: UNTESTED!
      const cardName = makeCardName(namespace, text)
      const card = <MarkdownCard key={nextId++}>{text}</MarkdownCard>
      cards.push(card)
      store.set(cardName, [card])
    }
  }
}

export {
  ReactCards,
  resolveTests,
  run,
}
