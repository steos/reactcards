## API Reference

React Cards consists of a minimal API. 

### `run()`

__run__ starts react cards and loads all the defined namespaces and cards.
You will need to manually call `run()` after creating all your cards inside your defined cards entry file.

```javascript
import { run } from 'reactcards'
// add your cards
import './someCards'
import './otherCards'
// run React Cards
run()

```

### `cards([namespace='default'])`

Define namespaces for your cards. This helps to structure your cards accordingly.
Simply calling cards() will create a namespace entitled 'default'.
It is recommended to define distinct namespaces as redefining a namespace will override the previously defined space.

#### Arguments

`[namespace='default']` (String) A string that defines the namespace.
 
#### Returns

[NamespaceCard](/docs/NamespaceCard.md): An object exposing a small set of methods for rendering cards, tests and documentation.

#### Example 

```javascript
import cards from 'reactcards'
const someNewNameSpace = cards('foo')
```
