import React from 'react'
import { mount, shallow } from 'enzyme'
import { assert, expect } from 'chai'
import createHistory from 'history/lib/createMemoryHistory'
import ReactCards, { Root } from '../src/index'

let rc
let history

const Foo = ({ message }) => <div className='foo'>{ message }</div>

const StatelessCounter = props => (
    <div>
        <button onClick={props.inc}>+</button>
        <span id='model'>{props.value}</span>
        <button onClick={props.dec}>-</button>
    </div>
)

describe('Test React Cards', () => {
    beforeEach(() => {
        rc = ReactCards('foo');
        history = createHistory()
    })

    it('Should display the namespace in menu', () => {
        rc.card(<Foo message="hello" />, 'here is  a simple example')
        const root = mount(<Root history={history}/>)
        expect(root.html()).to.contain('foo')
    })

    it('Should display the card if namespace is selected', () => {
        rc.card(<Foo message="hello this is a test" />, 'here is  a simple example')
        history.push('/#/foo')
        const root = mount(<Root history={history}/>)
        expect(root.html()).to.contain('hello this is a test')
    })

    it('Should display all the cards if namespace is selected', () => {
        rc.card(<Foo message="hello this is a test" />, 'here is  a simple example')
        rc.card(<Foo message="hello this is another test" />, 'here is  a simple example')
        history.push('/#/foo')
        const root = mount(<Root history={history}/>)
        expect(root.html()).to.contain('hello this is a test')
        expect(root.html()).to.contain('hello this is another test')
    })

    it('Should display a statful card if namespace is selected', () => {
        rc.card(
            (state) =>
                <StatelessCounter
                    value={state.get()}
                    inc={() => state.update(x => x + 1)}
                    dec={() => state.update(x => x - 1)}/>,
            {
                init: 123
            }
        )
        history.push('/#/foo')
        const root = mount(<Root history={history}/>)
        expect(root.find('button')).to.be.length(2)
        expect(root.find('#model').text()).to.be.equal('123')

    })

    it('Should display a markdown card if namespace is selected', () => {
        rc.markdown('_test some random markdown_')
        history.push('/#/foo')
        const root = mount(<Root history={history}/>)
        expect(root.html()).to.contain('<em>test some random markdown</em>')
    })

    it('should display a test card if namespace is selected', () => {
        const assertSomething = () => assert.equals(1, 1)
        rc.test({ assertSomething }, {title:'some random test'})
        history.push('/#/foo')
        const root = mount(<Root history={history} />)
        expect(root.html()).to.contain('some random test')
        expect(root.html()).to.contain('assertSomething')
    })

})
