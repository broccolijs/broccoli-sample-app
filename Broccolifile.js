module.exports = function (pkg, broccoli) {
  pkg.map({
    'lib': '',
    'app': 'appkit',
    'public': '' // this should be moved out into a separate package
  })
  pkg.setTransformer(new broccoli.transformers.preprocessors.PreprocessorPipeline([
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
}
