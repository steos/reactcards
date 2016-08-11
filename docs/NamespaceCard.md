### NamespaceCard

NamespaceCard exposes as small set of methods for creating Cards that display Components, tests and documentation.

#### Example

```javascript
import cards from 'reactcards'
import Foo from './Foo'
import Bar from './Bar'

const demo = cards('foo')
demo.card(<Foo message="hello world"/>)
demo.card(<Bar/>, {title: 'a card?'})
```
