var webpack = require('webpack'),
    path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index',

  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js'],
    root: [
      path.resolve('./src')
    ],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    /*new webpack.ProvidePlugin({
      goog: 'google-closure-library/closure/goog/base'
    }),*/

    // hacks for https://github.com/request/request-promise/issues/91
    new webpack.IgnorePlugin(/cls-bluebird/, /request-promise/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel'], include: [path.resolve('./src'), path.join(__dirname, 'vendor/react-json-editor/src')]},
      {test: /\.css$/, loader: 'style!css'},


     /*
      {
        test: /google-closure-library\/closure\/goog\/base/,
        loaders: [
          'imports?this=>{goog:{}}&goog=>this.goog',
          'exports?goog'
        ]
      },
      // Loader for closure library
      {
        test: /google-closure-library\/closure\/goog\/.*\.js/,
        loaders: [
          require.resolve('./node_modules/closure-loader/index')
          //require.resolve('../../index')
        ],
        exclude: [/base\.js$/]
      }*/
    ]
  }/*,
  closureLoader: {
    paths: [
      __dirname + '/node_modules/google-closure-library/closure/goog'
    ],
    es6mode: true,
    watch: false
  }*/
};
