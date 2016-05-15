import React from 'react'
import {Card, CardList, MarkdownCard} from './components'
import TestCard from './TestCard'
import TapeTestCard from './TapeTestCard'
import StatefulCard from './StatefulCard'

export default function() {
  const cards = []
  let nextId = 1
  return {
    card(content, opts = {}) {
      const CardImpl = typeof content === 'function' ? StatefulCard : Card
      cards.push(<CardImpl {...opts} key={nextId++}>{content}</CardImpl>)
    },
    list() {
      return cards
    },
    component() {
      return <CardList>{cards}</CardList>
    },
    tape(run, title = '') {
      cards.push(<TapeTestCard key={nextId++} run={run} title={title}/>)
    },
    test(testModule, opts = {}) {
      cards.push(<TestCard {...opts} key={nextId++} testModule={testModule}/>)
    },
    markdown(text) {
      cards.push(<MarkdownCard key={nextId++}>{text}</MarkdownCard>)
    }
  }
}
