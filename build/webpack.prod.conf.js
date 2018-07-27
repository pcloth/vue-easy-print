var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')

var outputFile = 'vue-easy-print'
var globalName = 'VueEasyPrint'

var config = require('../package.json');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: outputFile + '.js',
    library: globalName,
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  externals: {
    vue: {
      amd: 'vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      root: 'vue'
    },
    vux: {
      amd: 'vux',
      commonjs: 'vux',
      commonjs2: 'vux',
      root: 'vux'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        query:
        {
          presets: ['env', 'stage-3']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract('css-loader'),
            scss: ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: [
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS
              ]
            }),
            sass: ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: [
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS
              ]
            })
          }
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader'
        })
        // loaders: 'style-loader!css-loader'
      },{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader?limit=10000&name=assets/[name].[ext]'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader?name=assets/[name].[ext]'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      mangle: false,
    }),

    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(config.version),
    }),
    new ExtractTextPlugin(outputFile + '.css')
  ]
};

module.exports = webpackConfig;
