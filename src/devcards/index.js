import React from 'react'
import {Card, CardList, MarkdownCard} from './components'
import TestCard from './TestCard'
import TapeTestCard from './TapeTestCard'

export default function() {
  const cards = []
  let nextId = 1
  return {
    card(content, title = '') {
      cards.push(<Card title={title} key={nextId++}>{content}</Card>)
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
    test(testModule, title = '') {
      cards.push(<TestCard key={nextId++} testModule={testModule} title={title}/>)
    },
    markdown(text) {
      cards.push(<MarkdownCard key={nextId++}>{text}</MarkdownCard>)
    }
  }
}
