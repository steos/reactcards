import React, { Component } from 'react'
import { Card, CardList, MarkdownCard, TestCard, StatefulCard, Container, HotNotify } from './components'
import namespaceStore from './namespaceStore'
import mount from './mount'
import resolveTests from './utils/resolveTests'
import { parse } from 'qs'

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
    let origCardName = opts.doc.split('\n')[0].trim();
    origCardName = origCardName.replace(/^#+/g,'').trim();
    //Note that spaces do not work in all browsers, so replace them with underscores
    return (namespace + "__" + origCardName).split(' ').join('_');
}

export default function(namespace = 'default') {
  const cards = []
  let nextId = 1
  let q = parse(window.location.search, { ignoreQueryPrefix: true });
  let flat = q.flat === "true" || q.flat === "1";
  if (!flat) {
    store.set(namespace, cards)
  }
  return {
    card(...args) {
      const [content, opts] = processArgs(args)
      const CardImpl = typeof content === 'function' ? StatefulCard : Card
      const card = <CardImpl {...opts} key={nextId++}>{content}</CardImpl>
      cards.push(card);
      if (flat) {
          const cardName = makeCardName(namespace, opts)
          store.set(cardName, [card])
      }
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
      cards.push(card)
      if (flat) {
          const cardName = makeCardName(namespace, opts)
          store.set(cardName, [card])
      }
    },
    markdown(text) {
      //TODO: UNTESTED!
      const card = <MarkdownCard key={nextId++}>{text}</MarkdownCard>
      cards.push(card)
      if (flat) {
          const cardName = makeCardName(namespace, text)
          store.set(cardName, [card])
      }
    }
  }
}

export {
  ReactCards,
  resolveTests,
  run,
}
