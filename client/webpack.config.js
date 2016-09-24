module.exports = { 
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {   
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'] 
        //loaders: ['react-hot', 'babel-loader?presets[]=es2015,presets[]=react'],
      },  
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        //loader: 'url-loader?limit=10000'
        loader: 'file-loader'
      },
      {   
        test: /\.css$/,
        loader: 'style-loader!css-loader' 
      }   
    ]   
  },
};

/*var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './assets/js/index'
  ],
  output: {
    path: path.resolve('./assets/bundles/'),
    filename: 'bundle.js',
    //path: __dirname,
    publicPath: 'http://localhost:3000/assets/bundles/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BundleTracker({filename: './webpack.stats.json'}),
    new ExtractTextPlugin('style.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=es2015,presets[]=react'],
      },
      {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css-loader!sass'
        )
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
*/
