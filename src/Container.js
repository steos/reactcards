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
        const cards = namespaces[activeNamespace]
        const navCard = this.renderNavCard(routes, activeNamespace)
        return <div>
            <div style={ headerStyle }>React Cards</div>
            {cards
                ? <div>
                    <CardList namespace={ activeNamespace }>{ [navCard, ...cards] }</CardList>
                </div>
                : <div className='menu'>
                    <CardList>
                    {map(namespaces, (namespace, key) => (
                        <Card key={key} style={ menuListStyle }>
                            <a style={ linkMenuStyle }
                               href={ routes.namespace({ namespace: key }) }>
                                { key }
                            </a>
                        </Card>
                    ))}
                    </CardList>
                </div>
            }
        </div>
    }
    renderNavCard(routes, ns) {
      return (
        <Card key='navcard' style={{...crumbStyle, marginBottom:'1em'}}>
          <a style={ linkStyle } href={ routes.index() }>home</a>
          &nbsp;/&nbsp;
          {ns}
        </Card>
      )
    }
}
