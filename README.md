# React Cards

[![Build Status](https://travis-ci.org/steos/reactcards.svg?branch=master)](https://travis-ci.org/steos/reactcards)

React Cards is inspired by Bruce Hauman's excellent [devcards](https://github.com/bhauman/devcards) project which aims to provide ClojureScript developers with a visual REPL-like experience especially suited for UI development.

### Getting Started

```javascript
npm install reactcards
```

Add an entry file (f.e. entry.js)

```javascript
import {run} from 'reactcards';
import './someCard';


if (module.hot) {
    module.hot.accept()
}

// off we go...
run();
```

Add reactcards to your package.json

```javascript
"scripts": {
   // ...
    "reactcards": "reactcards -p 8080 -e ./entry.js",
   // ...
}
```

Available options for reactcards 

```
-p, --port <number> Port to run React Card
-e, --entry <file> Entry point for React Cards
-c, --conf <file> Custom Webpack config file
```

Now you can simply run 

```javascript
npm run reactcards
```

React Cards will be available at http://localhost:8080

Also see the [create-react-app example project](https://github.com/steos/reactcards-example/tree/master/create-react-app-example)

## Writing Cards

Quick example. For a more detailed guide read the [Writing Cards](/docs/WritingCards.md) section.

```javascript
import React from 'react'
import cards from 'reactcards'
import {Foo, Bar} from './components'

const demo = cards('demo')

demo.card(
  `## markdown doc
  you can use markdown for card documentation
  - foo
  - bar`,
  <Foo message="hello"/>
)

demo.card(<Foo message="hello world"/>)

demo.card(<Bar/>, {title: 'a bar card'})

```

![card](assets/images/component.png)

### Creating a Static Version of Your React Cards

Coming soon.

## Documentation

* [Introduction](/docs/Introduction.md)
* [API](/docs/API.md)
* [NamespaceCard](/docs/NamespaceCard.md)
* [Writing Cards](/docs/WritingCards.md)

## License

Copyright © 2016 Ali Sharif, Stefan Oestreicher and contributors.

Distributed under the terms of the BSD-3-Clause license.
