# passprint -- print a value and return it

Imagine you have a bug in some code that looks like this and you want to inspect the value of `a + x` returned by the reducer.

```js
const dotProd = (v1, v2) =>
  zip(v1, v2).map(pair => pair[0] * pair[1]).reduce((a, x) => a + x, 0)
```

Ideally you would use a debugger, but sometimes that not convenient and you want to just write out the value to the console, but to do that you normally would have to refactor the reducer code.

The `pp` function provides a convenient alternative, like so:

```js
const pp = require('passprint')
...
const dotProdPP = (v1, v2) =>
  zip(v1, v2).map(pair => pair[0] * pair[1]).reduce((a, x) => pp(a + x), 0)
```

This will log out lines that look something like:

```
|  |  |  |  |  |  |  |  |MyClass.myFunction myFile.js:46:63 22ms 78878
```

where `22ms` is the time elapsed since logging started and `78878` is the value of `a + x`. The `pp` simply returns the value passed to it, so it can be used with minimal perturbation to your code.
