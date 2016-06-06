import React from 'react'
import showdown from 'showdown'
import Card from './Card'
import style from './style.less'

const markdownToHtml = str => {
  const conv = new showdown.Converter()
  return conv.makeHtml(str)
}

export const Markdown = props =>
  <div className={[style.markdown,props.className].join(' ')}
    dangerouslySetInnerHTML={{__html:markdownToHtml(props.children)}}/>

const MarkdownCard = (props) =>
  <Card><Markdown>{props.children}</Markdown></Card>

export default MarkdownCard
