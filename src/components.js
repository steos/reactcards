import React from 'react'
import showdown from 'showdown'
import style from './style.less'

const markdownToHtml = str => {
  const conv = new showdown.Converter()
  return conv.makeHtml(str)
}

const Markdown = props =>
  <div className={[style.markdown,props.className].join(' ')}
    dangerouslySetInnerHTML={{__html:markdownToHtml(props.children)}}/>

const CardHeader = (props) =>
  <h1 className={style.cardHeader}>{props.children}</h1>

export const CardList = (props) => (
  <div style={{padding:'16px'}}>
    {props.children}
  </div>
)

export const Card = (props) => (
  <div className={"reactcards-card "+style.card}>
  {props.title ? <CardHeader>{props.title}</CardHeader> : null}
  {props.doc ? <Markdown className={style.markdownDoc}>{props.doc}</Markdown> : null}
  {props.children}
  </div>
)

export const MarkdownCard = (props) =>
  <Card><Markdown>{props.children}</Markdown></Card>
