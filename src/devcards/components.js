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

const CardHeader = (props) =>
  <h1 style={cardHeaderStyle}>{props.children}</h1>

export const CardList = (props) => (
  <div>{props.children}</div>
)

export const Card = (props) => (
  <div style={cardStyle}>
  {props.title ? <CardHeader>{props.title}</CardHeader> : null}
  {props.children}
  </div>
)

const markdownToHtml = str => {
  const conv = new showdown.Converter()
  return conv.makeHtml(str)
}

export const MarkdownCard = (props) =>
  <Card><div dangerouslySetInnerHTML={{__html:markdownToHtml(props.children)}}/></Card>
