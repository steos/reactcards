import React from 'react'
import {Card} from './components'
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
    tape(run, title = '') {
      cards.push(<TapeTestCard key={nextId++} run={run} title={title}/>)
    },
    test(testModule, title = '') {
      cards.push(<TestCard key={nextId++} testModule={testModule} title={title}/>)
    }
  }
}
