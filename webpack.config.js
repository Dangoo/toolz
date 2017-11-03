const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
  },
  target: 'web',
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: ['last 2 versions', 'safari >= 9'],
              },
            }],
          ],
          plugins: ['syntax-dynamic-import'],
        },
      },
    }],
  },
  plugins: [
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
    }),
  ],
};
