
import React from 'react'
import devcards from './devcards'
import {Foo, Bar, StatefulCounter, StatelessCounter} from './components'
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

dc.card(<StatefulCounter value={42}/>, {
  doc:
  `## counter
  this is a stateful counter. if you change the value prop it
  will appear to not update because the new prop will be ignored
  and instead the component local state is shown.`
})


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
