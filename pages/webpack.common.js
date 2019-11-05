const path = require('path')
const VERSION = '1.0.0'
module.exports = {
  entry: {
    'vhall-mpsdk-doc-1.0.0': __dirname + '/src/main.js'
  },
  output: {
    path: path.resolve(__dirname + '/sdk'),
    filename: `[name].js`,
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        query: { presets: ['env', 'stage-3'] }
      }
    ]
  }
}
