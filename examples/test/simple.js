import { assert } from 'chai'

export function testAdd() {
  assert.equal(1 + 1, 2)
}

export function testFail() {
  assert.isTrue(false)
}

export function testFoo() {
  assert.equal('foo', 'bar')
}
