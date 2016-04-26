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
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel'], include: [path.resolve('./src')]},
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
};
