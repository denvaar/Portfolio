var webpack = require('webpack');

module.exports = { 
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  /*plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],*/
  module: {
    loaders: [
      {   
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'] 
      },  
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
      {   
        test: /\.css$/,
        loader: 'style-loader!css-loader' 
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};

