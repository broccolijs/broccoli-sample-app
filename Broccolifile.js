module.exports = function (broccoli) {
  var filterCoffeeScript = require('broccoli-coffee')
  var filterTemplates = require('broccoli-template')
  var uglifyJavaScript = require('broccoli-uglify-js')
  var compileES6 = require('broccoli-es6-concatenator')
  var pickFiles = require('broccoli-static-compiler')
  var env = require('broccoli-env').getEnv()

  function preprocess (tree) {
    tree = filterTemplates(tree, {
      extensions: ['hbs', 'handlebars'],
      compileFunction: 'Ember.Handlebars.compile'
    })
    tree = filterCoffeeScript(tree, {
      bare: true
    })
    return tree
  }

  var app = broccoli.read('app')
  app = pickFiles(app, {
    srcDir: '/',
    destDir: 'appkit' // move into namespace
  })
  app = preprocess(app)

  var tests = broccoli.read('tests')
  tests = pickFiles(tests, {
    srcDir: '/',
    destDir: 'appkit/tests'
  })
  tests = preprocess(tests)

  var vendor = broccoli.read('vendor')

  var sourceTrees = [app, vendor]
  if (env !== 'production') {
    sourceTrees.push(tests)
  }
  var appAndDependencies = new broccoli.MergedTree(
    sourceTrees.concat(broccoli.bowerTrees())
  )

  applicationJs = compileES6(appAndDependencies, {
    loaderFile: 'loader.js',
    ignoredModules: [
      'resolver'
    ],
    inputFiles: [
      'appkit/**/*.js'
    ],
    legacyFilesToAppend: [
      'jquery.js',
      'handlebars.js',
      'ember.js',
      'ember-data.js',
      'ember-resolver.js'
    ],
    wrapInEval: env !== 'production',
    outputFile: '/assets/app.js'
  })

  if (env === 'production') {
    applicationJs = uglifyJavaScript(applicationJs, {
      // mangle: false,
      // compress: false
    })
  }

  var indexHtml = pickFiles(app, {
    srcDir: '/appkit',
    files: ['*.html'],
    destDir: '/'
  })

  var public = broccoli.read('public')

  return [applicationJs, public, indexHtml]
}
