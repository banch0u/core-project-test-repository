const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry file where your components are exported
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Your output bundle
    library: '@banch0u/core-project-test-repository', // Exposes your components as a library
    libraryTarget: 'umd', // Can be used in various environments like CommonJS, AMD, etc.
    clean: true, // Cleans the dist folder before each build
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve .js and .jsx files
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Applies to JavaScript/JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/, // Handles SCSS files
        use: [
          'style-loader', // Adds styles to DOM
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles SCSS to CSS
        ],
      },
    ],
  },
  devtool: 'source-map', // For better error tracking
};
