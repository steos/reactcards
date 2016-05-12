
import React from 'react'
import devcards from './devcards/core'
import {Foo, Bar} from './components'

const dc = devcards()

dc.card(<Foo message="hello!"/>, 'foo card')

dc.card(<Foo message="hello world"/>, 'foo card')

dc.card(<Bar/>, 'bar card')

dc.tape(() => require('../test/components'), 'component tests')

export default dc
