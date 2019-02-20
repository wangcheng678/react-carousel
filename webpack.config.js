const path = require('path')

module.exports = {
  mode: 'development',
  entry: './example/index.jsx',
  devServer: {
    contentBase: path.join(__dirname, 'example'),
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
}
