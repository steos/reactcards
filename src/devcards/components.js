import React from 'react'
import showdown from 'showdown'

const cardStyle = {
  padding:'20px',
  marginBottom:'10px',
  border:'1px solid #efefef',
  boxShadow:'1px 1px 4px #efefef',
  borderRadius:'2px',
  fontFamily:'sans-serif',
}

const cardHeaderStyle = {
  fontSize:'1.2em',
  fontWeight:'normal',
  padding:0,
  margin:0,
  color:'#555',
  marginBottom:'16px',
}

const docStyle = {
  // padding:'1em',
  color:'#777',
  marginBottom:'1em',
  borderBottom:'1px solid #efefef',
}

const markdownToHtml = str => {
  const conv = new showdown.Converter()
  return conv.makeHtml(str)
}

const Markdown = props =>
  <div style={props.style} dangerouslySetInnerHTML={{__html:markdownToHtml(props.children)}}/>

const CardHeader = (props) =>
  <h1 style={cardHeaderStyle}>{props.children}</h1>

export const CardList = (props) => (
  <div>{props.children}</div>
)

export const Card = (props) => (
  <div style={cardStyle}>
  {props.title ? <CardHeader>{props.title}</CardHeader> : null}
  {props.doc ? <Markdown style={docStyle}>{props.doc}</Markdown> : null}
  {props.children}
  </div>
)

export const MarkdownCard = (props) =>
  <Card><Markdown>{props.children}</Markdown></Card>
