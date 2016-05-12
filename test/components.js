import {Foo, Bar} from '../src/components'
// TODO import {shallow} from 'enzyme'

import test from 'tape'

test('A sample test', assert => {
  assert.pass('success!')
  assert.end()
})

test('A failing test', assert => {
  assert.equals('success', 'fail')
  assert.end()
})
