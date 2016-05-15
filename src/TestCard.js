import React, {Component} from 'react'
import {Card} from './components'

const hStyle = {
  fontFamily:'sans-serif',
  fontWeight:'normal',
  fontSize:'1.1em',
  margin:0,
  padding:0,
}

const testBoxStyle = {
   padding:'12px',
   borderTop:'1px solid white',
}

const CheckIcon = (props) => (
  <svg fill={props.color} height={props.size} viewBox="0 0 24 24" width={props.size}>
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
)

const CloseIcon = (props) => (
  <svg fill={props.color} height={props.size} viewBox="0 0 24 24" width={props.size}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
)

const iconSize = 20

const TestHeader = props => (
  <h4 style={hStyle}>
    <span>{props.icon}</span>
    <span style={{paddingLeft:'12px'}}>{props.children}</span>
  </h4>
)

const TestSuccess = props => (
  <div style={{...testBoxStyle, backgroundColor:'#DCEED3'}}>
    <TestHeader icon={<CheckIcon color="green" size={iconSize}/>}>
      {props.children}
    </TestHeader>
  </div>
)

const TestFailure = props => (
  <div style={{...testBoxStyle, backgroundColor:'#EEDBDA'}}>
    <TestHeader icon={<CloseIcon color="red" size={iconSize}/>}>
      {props.children}
    </TestHeader>
    <div style={{fontFamily:'monospace',marginTop:'12px',marginLeft:'32px'}}>
      {props.error.toString()}
    </div>
  </div>
)

export default class TestCard extends Component {
  constructor(props) {
    super(props)
    this.state = {results: []}
  }
  componentWillReceiveProps(nextProps) {
    //TODO
    this.runTests(nextProps.testModule)
  }
  componentDidMount() {
    //TODO
    this.runTests(this.props.testModule)
  }
  runTests(testModule) {
    console.log('running tests', Object.keys(testModule))
    const results = []
    const tests = Object.keys(testModule)
    tests.forEach(name => {
      try {
        testModule[name]()
        results.push([true, name])
      } catch(e) {
        results.push([e, name])
      }
    })
    console.log(results)
    this.setState({results})
  }
  render() {
    const {title, doc} = this.props
    return (
      <Card {...{title, doc}}>
      {this.state.results.map(([result, name], index) => (
        result === true
          ? <TestSuccess key={index}>{name}</TestSuccess>
          : <TestFailure key={index} error={result}>{name}</TestFailure>
        )
      )}
      </Card>
    )
  }
}
