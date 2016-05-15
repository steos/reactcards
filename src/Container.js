import React, { Component, PropTypes }  from 'react'
import myro from 'myro'
import { find, map } from 'lodash'
import createHistory from '../node_modules/history/lib/createBrowserHistory'
import { CardList } from './components'
import { linkStyle } from './styles'

let history = createHistory()

export default class Container extends Component {

    constructor(props) {
        super(props)
        this.state = { active : null, routes: this.createRoutes() }
        this.unlisten = null
    }

    componentWillMount() {
        this.unlisten = history.listen((location) => {
            this.setState({active: location.hash.replace('#/', '')})
        })
    }

    componentWillUnmount() {
        this.unlisten()
    }

    createRoutes() {
        return myro({
            '#': {
                name: 'index'
            },
            '/#/:namespace': {
                name: 'namespace'
            }
        })
    }

    render() {
        let active = find(this.props.namespaces, (v, k) => k == this.state.active)
        console.log(this.props.namespaces, active, this.state.active, '!')
        return <div>
            <div>
                <ul>
                    <li key='index-link'>
                        <a style={ linkStyle } href={ this.state.routes.index() }>Index</a>
                    </li>
                    {map(this.props.namespaces, (namespace, key) => (
                        <li key={key}>
                            <a style={ linkStyle }
                               href={this.state.routes.namespace({ namespace: key })}>
                                { key }
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {active? <CardList namespace={ this.state.active }>{ active }</CardList> : null }
        </div>
    }
}
