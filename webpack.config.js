// 把 path 這個方法拿進來就可以調用它 
var path = require("path")
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('css/[name].css');


// nodejs 給我們的環境變數
console.log("__dirname", __dirname)


module.exports = {
  // 指定所有entry的資料夾是哪個資料夾
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, './src'),
  entry: {
    index: 'index.js',
    about: 'about.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/[name].js'
  },
  // resolve 在webpack加上resolve modules的設定在引入模塊的時候可以省略路徑
  // extension設定可以省略副檔名
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/js/object'),
      path.resolve('src/images'),
      path.resolve('src/scss'),
      path.resolve('node_modules')
    ],
    extensions: ['.js']
  },
  devServer: {
    compress: true,
    port: 3000,
    stats: {
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          // 用file-loader 搬移檔案
          loader: 'file-loader',
          options: {
            // 路徑 檔名 副檔名
            name: '[path][name].[ext]'
          }
        }]
      },
      {
        // 正則表達式 判斷副檔名
        test: /\.css$/,
        // 先執行css-loader 再執行 style-loader 由後往前
        // style-loader用途是把css注入到js裡面 現在用pluging所以可以拿掉
        use: extractCSS.extract([
          'css-loader',
          'postcss-loader' 
        ])
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader','css-loader', 'postcss-loader', 'sass-loader'
        ]
      },
      {
       test: /\.js$/,
       use: 'babel-loader' 
      },
      {
        test: /\.(png|jpg|gif)$/i,
        // 把圖片轉成base64 要搭配style-loader使用
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              // ?hash做圖片快取 避免快取
              name: '[path][name].[ext]?[hash:8]'
            }
          },
          //圖片壓縮
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
            }
          },
        ]
      },
    ]
  },
  // plugins 就是在做loader做不到的事情
  plugins: [
    extractCSS
  ]
}


// 註1 postcss是一個使用javascript轉換css的工具，搭配autoprefixer加入瀏覽器的prefix, 如：'-webkit-'、 '-moz-'
// babel/core: 程式需要調用Babel的API進行編譯
// babel/preset-env: 可以使用最新版本的JS然後去編譯。不用去理會哪些語法需要轉換
// babel/polyfill: 有些語法ie不支援，所以要用@babel/polyfill來解決 ie 的問題
// url-loader: 會將過小的圖片轉換成base64格式使用，來減少載入負擔