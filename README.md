# passprint -- print a value and return it

## Basic Usage

Install with

```sh
npm install passprint
```

Import with

```js
const { pp } = require('passprint')
```

or

```js
import { pp } from 'passprint'
```

Then use can put `pp(expression)` around any expression in your code, and it will return the value of `expression` unchanged, with the side-affect of logging it.

## Why

Imagine you have a bug in some code that looks like this and you want to inspect the value of `a + x` returned by the reducer.

```js
const dotProd = (v1, v2) =>
  zip(v1, v2).map(pair => pair[0] * pair[1]).reduce((a, x) => a + x, 0)
```

Ideally you would use a debugger, but sometimes that not convenient and you want to just write out the value to the console, but to do that you normally would have to refactor the reducer code.

The `pp` function provides a convenient alternative, like so:

```js
const { pp } = require('passprint')
...
const dotProdPP = (v1, v2) =>
  zip(v1, v2).map(pair => pair[0] * pair[1]).reduce((a, x) => pp(a + x), 0)
```

This will log out lines that look something like:

```
|||||||||MyClass.myFunction myFile.js:46:63 22ms 78878
```

where `22ms` is the time elapsed since logging started and `78878` is the value of `a + x`.  The number of `|` shows the depth of the call stack.

The `pp` simply returns the value passed to it, so it can be used with minimal perturbation to your code.

## Advanced Use

The default `pp` uses `console.warn` as the logging function.

If you want to use a different logger you can use the `PP` (uppercase) function to specify a different logger.  For example to use `console.log` instead, you could do:

```js
const { PP } = require('passprint')
const pp = PP(console.log)
...
```

Or you could specify a custom logger:

```js
const { PP } = require('passprint')

const log = []
const pp = PP((message, value) => {
  log.push({ message, value })
})
...
```
