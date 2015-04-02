# Broccoli Sample App

Sample Ember app for [Broccoli](https://github.com/broccolijs/broccoli).

See [Brocfile.js](/Brocfile.js) for the build definition.

To start the server, run:

```
npm install
bower install

npm install -g broccoli-cli
broccoli serve
```

Note: If you get an error like `Built with error: Error: Line 1: Unexpected
token ILLEGAL at throwError
(/.../broccoli-sample-app/node_modules/broccoli-es6-concatenator)`, it's
probably because Bower found a rogue `.bowerrc` file in a parent directory. To
fix this, delete all parent `.bowerrc` files.
