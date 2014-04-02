# Broccoli Sample App

Sample Ember app for [Broccoli](https://github.com/joliss/broccoli).

See [Brocfile.js](/Brocfile.js) for the build definition.

To start the server, run:

```
npm install

npm install -g broccoli-cli
broccoli serve
```

> **Note:** If you get an error like   
>     _Built with error: Error: Line 1: Unexpected token ILLEGAL at throwError_
>     _(/.../broccoli-sample-app/node_modules/broccoli-es6-concatenator)_   
> it's probably because Bower found a rogue `.bowerrc` file in a parent directory. To fix this, delete all parent `.bowerrc` files.
