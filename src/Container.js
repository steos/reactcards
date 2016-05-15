import React, { Component, PropTypes }  from 'react'
import myro from 'myro'
import { find, map } from 'lodash'
import createHistory from '../node_modules/history/lib/createBrowserHistory'
import { CardList } from './components'
import { linkStyle, menuStyle, menuListStyle } from './styles'

let history = createHistory()

export default class Container extends Component {

    constructor(props) {
        super(props)
        this.state = { activeNamespace : null, routes: this.createRoutes() }
        this.unlisten = null
    }

    componentWillMount() {
        this.unlisten = history.listen((location) => {
            this.setState({activeNamespace: location.hash.replace('#/', '')})
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
        const { namespaces } = this.props
        const { routes, activeNamespace } = this.state
        let cards = namespaces[activeNamespace]
        return <div>
            {cards
                ? <div>
                    <span><a style={ linkStyle } href={ routes.index() }>Index</a></span>
                    <CardList namespace={ activeNamespace }>{ cards }</CardList>
                </div>
                : <div className='menu'>
                    <ul style={ menuStyle }>
                        <li key='index-link' style={ menuListStyle } className={ activeNamespace === ''? 'active-link' : '' }>
                            <a style={ linkStyle } href={ routes.index() }>Index</a>
                        </li>
                        {map(namespaces, (namespace, key) => (
                            <li key={key} style={ menuListStyle }>
                                <a style={ linkStyle }
                                   className={ activeNamespace === key? 'active-link' : '' }
                                   href={ routes.namespace({ namespace: key }) }>
                                    { key }
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    }
}
