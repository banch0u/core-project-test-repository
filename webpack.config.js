const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // Look for .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile JS/JSX files
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Automatically resolve .js and .jsx extensions
  },
};
