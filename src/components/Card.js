import React from 'react'
import { Markdown } from './MarkdownCard'
import style from './style.less'
import { parse } from 'qs'

const CardHeader = (props) =>
  <h1 className={style.cardHeader}>{props.children}</h1>

const Card = (props) => {
  let q = parse(window.location.search, { ignoreQueryPrefix: true });
  let flat = q.flat === "true" || q.flat === "1";
  let flatStyle = '';
  if (flat) {
    flatStyle = 'flat ';
  }
  return (
  <div className={"reactcards-card "+flatStyle +style.card}>
  {props.title ? <CardHeader>{props.title}</CardHeader> : null}
  {props.doc ? <Markdown className={style.markdownDoc}>{props.doc}</Markdown> : null}
  {props.children}
    </div>
  );
};

export default Card
