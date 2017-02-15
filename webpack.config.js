const webpack = require('webpack');
const path = require('path');
module.exports = {
  output: {
    library: 'reactMobxRouter',
    libraryTarget: 'umd'
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
    react: 'React',
    'react-dom': 'ReactDOM',
    mobx: 'mobx',
    // 'mobx-react': 'mobxReact',
    // 'mobx-history': 'mobxHistory',
  }
};