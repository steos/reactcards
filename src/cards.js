
import React from 'react'
import devcards from './devcards'
import {Foo, Bar, StatefulCounter, StatelessCounter, TodoList} from './components'
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
  `## Counter

  This is a stateful counter. If you change the value prop
  in the source file it will not update because the new prop will be ignored
  and instead the component local state is rendered.

  Implement *componentWillReceiveProps* and override the component local state
  if you want this to work as expected.`
})

dc.card(
  (state) =>
    <StatelessCounter
      value={state.get()}
      inc={() => state.update(x => x + 1)}
      dec={() => state.update(x => x - 1)}/>,
{
  init: 23,
  inspect: true,
  doc:
  `## Stateless Counter
  This example shows how to manage state when you have a stateless
  component. The card can also dump the current state as JSON if
  you set the *inspect* flag to true.`
})

dc.card(
  (state) =>
    <StatelessCounter
      value={state.get()}
      inc={() => state.update(x => x + 1)}
      dec={() => state.update(x => x - 1)}/>,
{
  init: 1337,
  history:true,
  doc:
  `## Undo/Redo
  Same example as before but with undo/redo controls added by the card.`
})

dc.card(
  (state) =>
    <TodoList items={state.get()}
      onSubmit={(text) => state.update(items => [...items, {text, done: false}])}
      onToggleItem={(index) => state.update(items => [
        ...items.slice(0, index),
        {...items[index], done: !items[index].done},
        ...items.slice(index + 1)
      ])}/>,
{
  init: [],
  history: true,
  inspect: true,
  doc:
  `## TodoList
  A simple todo list showing history and inspect feature
  with a little more interesting model than just a simple number.`
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
