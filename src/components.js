import React ,{Component} from 'react'
import ReactDOM from 'react-dom'
import showdown from 'showdown'
import style from './style.less'
import Frame from 'react-frame-component'
import {iframeResizer} from 'iframe-resizer'
import iframeResizerContentWindow from 'raw!iframe-resizer/js/iframeResizer.contentWindow.min'

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

export const MarkdownCard = (props) => (
  <Card noframe><Markdown>{props.children}</Markdown></Card>
)

export class Card extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.noframe) {
      this.iframeNode = ReactDOM.findDOMNode(this.refs.iframe)
      iframeResizer({checkOrigin:false},this.iframeNode)
    }
  }

  componentWillUnmount() {
    if (!this.props.noframe) {
      this.iframeNode.iFrameResizer.close()
    }
  }

  render() {
    const props = this.props;
    const iframeContent = `<!DOCTYPE html>
      <html>
        <head><script>${iframeResizerContentWindow}</script></head>
        <body><div id="content"></div></body>
      </html>`
    return (
      <div className={'reactcards-card ' + style.card}>
        {props.title ? <CardHeader>{props.title}</CardHeader> : null}
        {props.doc ? <Markdown className={style.markdownDoc}>{props.doc}</Markdown> : null}
        {props.noframe ?
          <div>{props.children}</div> :
          <Frame ref="iframe"
            initialContent={iframeContent}
            mountTarget="#content">
            {props.children}
          </Frame>
        }
      </div>
    );
  }
}
