import React, { Component, PropTypes }  from 'react'
import myro from 'myro'
import { find, map } from 'lodash'
import createHistory from '../node_modules/history/lib/createBrowserHistory'
import { Card, CardList } from './components'
import { headerStyle, linkStyle, linkMenuStyle, menuStyle, menuListStyle, crumbStyle} from './styles'

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
            <div style={ headerStyle }>React Cards</div>
            {cards
                ? <div>
                    <div style={{...crumbStyle, marginBottom:'1em'}}>
                      <a style={ linkStyle } href={ routes.index() }>Index</a>
                      &nbsp;/&nbsp;
                      {activeNamespace}
                    </div>
                    <CardList namespace={ activeNamespace }>{ cards }</CardList>
                </div>
                : <div className='menu'>
                    {map(namespaces, (namespace, key) => (
                        <Card key={key} style={ menuListStyle }>
                            <a style={ linkMenuStyle }
                               href={ routes.namespace({ namespace: key }) }>
                                { key }
                            </a>
                        </Card>
                    ))}
                </div>
            }
        </div>
    }
}
