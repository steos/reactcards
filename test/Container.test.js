import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import createHistory from 'history/lib/createMemoryHistory'
import Container from '../src/Container'
import { Card, CardList } from '../src/components'

let history = createHistory()

const namespaces = {foo: [ <Card title="one"/>, <Card title="two" />], bar: [ <Card title="three" /> ] }

describe('Testing <Container />', () => {
    it('should show menu when no cards', () => {
        const component = shallow(<Container namespaces={[]} history={history} />)
        expect(component.html()).to.contain('menu')
    })

    it('should show menu when no active namespace', () => {
        const component = shallow(<Container namespaces={namespaces} history={history}  />)
        expect(component.html()).to.contain('menu')
    })

    it('should hide menu when active namespace', () => {
        history.push('/#/foo')
        const component = shallow(<Container namespaces={namespaces} history={history} />)
        expect(component.html()).to.not.contain('menu')
    })

    it('should display no cards if active namespace doesn\'t contain cards', () => {
        history.push('/#/foobar')
        const component = shallow(<Container namespaces={namespaces} history={history} />)
        expect(component.find(CardList)).to.have.length(0)
    })

    it('should display all cards for active namespace', () => {
        history.push('/#/foo')
        const component = shallow(<Container namespaces={namespaces} history={history} />)
        expect(component.find(CardList)).to.have.length(1)
        expect(component.find(Card)).to.have.length(2)
    })

    it('should display change card when active namespace changes', () => {
        history.push('/')
        const component = mount(<Container namespaces={namespaces} history={history} />)
        expect(component.find(CardList)).to.have.length(0)
        history.push('/#/foo')
        expect(component.find(CardList)).to.have.length(1)
        expect(component.find(Card)).to.have.length(2)
        history.push('/#/foobar')
        expect(component.find(CardList)).to.have.length(0)
        history.push('/#/bar')
        expect(component.find(CardList)).to.have.length(1)
        expect(component.find(Card)).to.have.length(1)
    })

})
