import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import StatefulCard from '../src/StatefulCard'

const StatelessCounter = props => (
    <div className='statelessCounter'>
        <button id='increase' onClick={props.inc}>+</button>
        <span id='theCurrentValue'>{props.value}</span>
        <button id='decrease' onClick={props.dec}>-</button>
    </div>
)

const content = (state) =>
        <StatelessCounter
            value={state.get()}
            inc={() => state.update(x => x + 1)}
            dec={() => state.update(x => x - 1)}/>

describe('Testing <StatefulCard />', () => {
    it('should display children content', () => {
        const component = shallow(<StatefulCard>{ content }</StatefulCard>)
        expect(component.find(StatelessCounter)).to.be.length(1)
    })

    it('should initial value', () => {
        const init = 123
        const component = shallow(<StatefulCard init={init}>{ content }</StatefulCard>)
        expect(component.html()).to.contain(init)
    })

    it('should display history', () => {
        const component = shallow(<StatefulCard history={true}>{ content }</StatefulCard>)
        expect(component.find('.react-cards-history-control')).to.be.length(1)
    })

    it('should display inspect', () => {
        const component = shallow(<StatefulCard inspect={true}>{ content }</StatefulCard>)
        expect(component.find('.react-cards-inspect')).to.be.length(1)
    })

    it('should display current state', () => {
        const component = mount(<StatefulCard init={10} history={true}>{ content }</StatefulCard>)
        expect(component.find('#theCurrentValue').text()).to.be.equal('10')
        // click on increade button should change the value
        const incBtn = component.find('#increase')
        incBtn.simulate('click')
        expect(component.find('#theCurrentValue').text()).to.be.equal('11')
        incBtn.simulate('click')
        expect(component.find('#theCurrentValue').text()).to.be.equal('12')
    })

    it('should update state when undo/redo is clicked', () => {
        const component = mount(<StatefulCard init={100} history={true}>{ content }</StatefulCard>)
        expect(component.find('#theCurrentValue').text()).to.be.equal('100')
        // click on increase button should change the value
        const incBtn = component.find('#increase')
        incBtn.simulate('click')
        expect(component.find('#theCurrentValue').text()).to.be.equal('101')
        // click on undo should change the value
        const undoBtn = component.find('#react-cards-undo')
        const redoBtn = component.find('#react-cards-redo')
        undoBtn.simulate('click')
        expect(component.find('#theCurrentValue').text()).to.be.equal('100')
        redoBtn.simulate('click')
        expect(component.find('#theCurrentValue').text()).to.be.equal('101')
    })
})
