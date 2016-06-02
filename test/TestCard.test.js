import React from 'react'
import { mount, shallow } from 'enzyme'
import { assert, expect } from 'chai'
import TestCard from '../src/TestCard'

function randomSuccessfulTest() {
  assert.equal(1, 1)
}

function randomUnsuccessfulTest() {
  assert.equal(1, 2)
}
const testModule = {randomSuccessfulTest};

describe('Testing <TestCard />', () => {
  it('should display the test name', () => {
    const component = mount(<TestCard  testModule={testModule}/>)
    expect(component.text()).to.contain('randomSuccessfulTest')
  })

  it('should display the correct result when test succeeds', () => {
    const component = mount(<TestCard  testModule={testModule}/>)
    expect(component.html()).to.be.contain(('react-card-test-success'))
  })

  it('should display the correct result when test fails', () => {
    const component = mount(<TestCard  testModule={{randomUnsuccessfulTest}}/>)
    expect(component.html()).to.contain('react-card-test-failure')
  })
})
