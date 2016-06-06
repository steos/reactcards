import React, { Component, PropTypes }  from 'react'
import myro from 'myro'
import { find, map } from 'lodash'
import createHistory from 'history/lib/createBrowserHistory'
import Card from './Card'
import CardList from './CardList'
import style from './style.less'

export default class Container extends Component {

    constructor(props) {
        super(props)
        this.state = { activeNamespace : null, routes: this.createRoutes() }
        this.unlisten = null
    }

    componentWillMount() {
        const history = this.props.history? this.props.history : createHistory()
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
            '#/:namespace': {
                name: 'namespace'
            }
        })
    }

    render() {
        const { namespaces } = this.props
        const { routes, activeNamespace } = this.state
        const cards = namespaces[activeNamespace]
        const navCard = this.renderNavCard(routes, activeNamespace)
        return <div className={style.container}>
            <h1>React Cards</h1>
            {cards
                ? <div className='react-cards-namespace-cards'>
                    <CardList namespace={ activeNamespace }>{ [navCard, ...cards] }</CardList>
                </div>
                : <div className="react-cards-menu">
                    <CardList>
                    {map(namespaces, (namespace, key) => (
                        <Card key={key}>
                            <a className={style.nav} href={ routes.namespace({ namespace: key }) }>
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
        <Card key='navcard'>
          <div className={style.navCrumbs}>
            <a href={ routes.index() }>home</a>
            &nbsp;/&nbsp;
            {ns}
          </div>
        </Card>
      )
    }
}
