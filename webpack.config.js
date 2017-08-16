module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'transition.js',
    path: __dirname,
    library: 'Transition',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader']
      }
    ]
  }
};
