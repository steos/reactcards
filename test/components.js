import {Foo, Bar} from '../src/components'
// TODO import {shallow} from 'enzyme'

import test from 'tape'

//console.log('hello from the component test file')

export default function run() {
  console.log('running component tests')
  test('A sample test', assert => {
    console.log('a sample test is running')
    assert.pass('success!')
    assert.end()
  })

  test('A failing test', assert => {
    assert.equals('foo!', 'bar!')
    assert.end()
  })
}

if (typeof window !== 'object') {
  run()
}
