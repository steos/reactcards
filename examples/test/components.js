import React from 'react'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import { Foo, Bar } from '../components'

export function testBarComponent() {
  const wrapper = shallow(<Bar/>)
  assert.equal(wrapper.text(), 'a bar. drink up!')
}

export function testFooComponent() {
  const wrapper = shallow(<Foo message="testing"/>)
  assert.equal(wrapper.text(), "Foo says 'testing'")
}
