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
    index: './js/index.js',
    about: './js/about.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/[name].js'
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
      } 
    ]
  },
  // plugins 就是在做loader做不到的事情
  plugins: [
    extractCSS
  ]
}


// 註1 postcss是一個使用javascript轉換css的工具，搭配autoprefixer加入瀏覽器的prefix, 如：'-webkit-'、 '-moz-'