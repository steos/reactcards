import React from 'react'
import { Markdown } from './MarkdownCard'
import style from './style.less'

const CardHeader = (props) =>
  <h1 className={style.cardHeader}>{props.children}</h1>

const Card = (props) => (
  <div className={"reactcards-card "+style.card}>
  {props.title ? <CardHeader>{props.title}</CardHeader> : null}
  {props.doc ? <Markdown className={style.markdownDoc}>{props.doc}</Markdown> : null}
  {props.children}
  </div>
)

export default Card
