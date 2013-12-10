module.exports = function (factory, broccoli) {
  var appPkg = factory.makePackage()
    .map({
      'app': '/appkit',
    })
    .setTransformer(new broccoli.transformers.preprocessors.PreprocessorPipeline([
      new broccoli.transformers.preprocessors.ES6TemplatePreprocessor({
        extensions: ['hbs', 'handlebars'],
        compileFunction: 'Ember.Handlebars.compile'
      }),
      new broccoli.transformers.preprocessors.CoffeeScriptPreprocessor({
        options: {
          bare: true
        }
      })
    ]))

  var libPkg = factory.makePackage()
    .map({
      'lib': '/'
    })

  var publicPkg = factory.makePackage()
    .map({
      'public': '/' //'/appkit-public'
    })

  return [appPkg, libPkg, publicPkg]
}
