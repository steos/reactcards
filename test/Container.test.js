import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import createHistory from '../node_modules/history/lib/createMemoryHistory'
import Container from '../src/Container'
import { Card, CardList } from '../src/components'

const namespaces = { foo: [ <Card title="one"/>, <Card title="two" />], bar: [ <Card title="three" /> ] }

describe('Testing <Container />', () => {
    beforeEach(() => {
        history = createHistory()
    })

    it('should show menu when no cards', () => {
        const component = shallow(<Container namespaces={[]} history={history} />)
        expect(component.html()).to.contain('react-cards-menu')
    })

    it('should show menu when no active namespace', () => {
        const component = shallow(<Container namespaces={namespaces} history={history}  />)
        expect(component.html()).to.contain('react-cards-menu')
    })

    it('should hide menu when active namespace', () => {
        history.push('/#/foo')
        const component = shallow(<Container namespaces={namespaces} history={history} />)
        expect(component.html()).to.not.contain('react-cards-menu')
    })

    it('should display no cards if active namespace doesn\'t contain cards', () => {
        history.push('/#/foobar')
        const component = shallow(<Container namespaces={namespaces} history={history} />)
        expect(component.find('.react-cards-namespace-cards')).to.have.length(0)
    })

    it('should display all cards for active namespace', () => {
        history.push('/#/foo')
        const component = mount(<Container namespaces={namespaces} history={history} />)
        expect(component.find('.react-cards-namespace-cards')).to.have.length(1)
        // 1 nav header card + 2 foo cards
        expect(component.find('.react-cards-namespace-cards .reactcards-card')).to.have.length(3)
    })

    it('should display change card when active namespace changes', () => {
        history.push('/')
        const component = mount(<Container namespaces={namespaces} history={history} />)
        expect(component.find('.react-cards-namespace-cards')).to.have.length(0)
        history.push('/#/foo')
        expect(component.find('.react-cards-namespace-cards')).to.have.length(1)
        // 1 nav header card + 2 foo cards
        expect(component.find('.react-cards-namespace-cards .reactcards-card')).to.have.length(3)
        history.push('/#/foobar')
        expect(component.find('.react-cards-namespace-cards')).to.have.length(0)
        history.push('/#/bar')
        expect(component.find('.react-cards-namespace-cards')).to.have.length(1)
        // 1 nav header card + 1 bar card
        expect(component.find('.react-cards-namespace-cards .reactcards-card')).to.have.length(2)
    })
})
