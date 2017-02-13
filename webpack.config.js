const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: [
    './src/__test__/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './src/__test__'),
    filename: 'test.bundle.js',
    // libraryTarget: 'umd'
  },
  
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  externals: {
    describe: 'describe',
    it: 'it',
    'react/addons': true,
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  }
};