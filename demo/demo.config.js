const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: [
    path.resolve(__dirname, 'index.js')
  ],
  output: {
    path: path.resolve(__dirname),
    filename: 'demo.bundle.js',
  },
  
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, exclude: /node_modules/, loaders: ['style-loader', 'css-loader']}
    ]
  },
  
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  // externals: {
  //   describe: 'describe',
  //   it: 'it',
  //   'react/addons': true,
  //   'react/lib/ReactContext': true,
  //   'react/lib/ExecutionEnvironment': true
  // }
};