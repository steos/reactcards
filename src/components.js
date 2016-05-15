import React from 'react'
import showdown from 'showdown'

import { cardStyle, cardHeaderStyle, docStyle } from './styles'

const markdownToHtml = str => {
  const conv = new showdown.Converter()
  return conv.makeHtml(str)
}

const Markdown = props =>
  <div style={props.style} dangerouslySetInnerHTML={{__html:markdownToHtml(props.children)}}/>

const CardHeader = (props) =>
  <h1 style={cardHeaderStyle}>{props.children}</h1>

export const CardList = (props) => (
  <div style={{padding:'16px'}}>
    {props.children}
  </div>
)

export const Card = (props) => (
  <div style={cardStyle} className="reactcards-card">
  {props.title ? <CardHeader>{props.title}</CardHeader> : null}
  {props.doc ? <Markdown style={docStyle}>{props.doc}</Markdown> : null}
  {props.children}
  </div>
)

export const MarkdownCard = (props) =>
  <Card><Markdown>{props.children}</Markdown></Card>
