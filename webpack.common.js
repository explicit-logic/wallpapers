const path = require('path');

module.exports = {
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './app.js',
  },
  module: {
    rules: [
      {
        test: /\.jpe?g$|\.png$|\.svg$/,
        type: 'asset/resource'
      }
    ]
  }
};
