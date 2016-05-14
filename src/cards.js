
import React from 'react'
import devcards from './devcards'
import {Foo, Bar} from './components'
import * as testSimple from '../test/simple'
import * as testComponents from '../test/components'
const dc = devcards()

dc.card(
  <Foo message="hello"/>, {
  doc:
  `## markdown doc
  you can use markdown for card documentation
  - foo
  - bar
  `
})

dc.card(<Foo message="hello world"/>)

dc.card(<Bar/>, {title: 'a bar card'})

// // dc.tape(testComponents, 'component tests 1')

// // dc.tape(testComponents, 'component tests 2')

dc.markdown(`
# a markdown card
this is a simple markdown card
- lorem
- ipsum
`)

dc.test(testSimple, 'simple tests')

dc.test(testComponents, 'component tests')


export default dc
