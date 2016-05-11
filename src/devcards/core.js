import React, {Component, createFactory} from 'react'
import {render} from 'react-dom'

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

const makeCardList = createFactory(CardList)

const makeCard = createFactory(Card)

export default function() {
  const cards = []
  return {
    card(content, title = '') {
      cards.push({title, content})
    },
    list() {
      return cards.map((card, key) => makeCard({...card, key}))
    }
  }
}
