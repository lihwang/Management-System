chunks打包出来是一个个代码块。只有那些entry有配置的name的有name；




#模版页面
// 插件都是一个类，所以我们命名的时候尽量用大写开头
html-webpack-plugin 

多页面开发，怎么配置多页面
如果开发的时候不只一个页面，我们需要配置多页面，那么需要怎么来搞呢？不用担心，html-webpack-plugin插件自有办法，我们来观望一下

#样式
style-loader, MiniCssExtractPlugin替换extract-text-webpack-plugin
此时打包后的css文件是以行内样式style的标签写进打包后的html页面中，如果样式很多的话，我们更希望直接用link的方式引入进去，这时候需要把css拆分出来
extract-text-webpack-plugin插件它的功效就在于会将打包到js里的css文件进行一个拆分,单独提取css

这里要着重说一下上面两个插件的区别了，个人还是建议用extract-text-webpack-plugin的，毕竟从之前的版本承接下来的，虽然在安包的时候需要@next，但是还是值得信赖的
而且现在的extract-text-webpack-plugin也支持了拆分成多个css，而目前mini-css-extract-plugin还不支持此功能
// 正常写入的less
let styleLess = new ExtractTextWebpackPlugin('css/style.css');
// reset
let resetCss = new ExtractTextWebpackPlugin('css/reset.css');

#照片
npm i file-loader url-loader -D
--在css中指定了publicPath路径这样就可以根据相对路径引用到图片资源了，如下图所示
--引用字体图片和svg图片

npm i html-withimg-loader -D
--页面img引用图片 单独处理

#  清除dist
 --new CleanWebpackPlugin
 --package.json
    "prebuild": "npm run clean",
    "clean": "rimraf ./dist && mkdir dist"

    npm也在不同的生命周期
    它的钩子分为两类：pre- 和 post- ，前者是在脚本运行前，后者是在脚本运行后执行。所有的命令脚本都可以使用钩子（包括自定义的脚本）。
    例如：运行npm run build，会按以下顺序执行：
    npm run prebuild -->  npm run build -->  npm run postbuild

#ES6和react （.babelrc）
转义ES6和react
在实际开发中，我们在大量的使用着ES6及之后的api去写代码，这样会提高我们写代码的速度，不过由于低版本浏览器的存在，不得不需要转换成兼容的代码，于是就有了常用的Babel了
npm i babel-core babel-loader babel-preset-env babel-preset-stage-3  babel-preset-react babel-polyfill babel-plugin-import babel-loader babel-register -D
我们再在webpack里配置一下babel-loader既可以做到代码转成ES5了


在转换 ES2015 语法为 ECMAScript 5 的语法时，babel 会需要一些辅助函数，例如 _extend。babel 默认会将这些辅助函数内联到每一个 js 文件里，这样文件多的时候，项目就会很大
所以 babel 提供了 transform-runtime 来将这些辅助函数“搬”到一个单独的模块 babel-runtime 中，这样做能减小项目文件的大小。

Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

#resolve解析
    resolve: {// 别名
        alias: {
          pages:path.join(__dirname,'src/pages'),
          component:path.join(__dirname,'src/component'),
          actions:path.join(__dirname,'src/redux/actions'),
          reducers:path.join(__dirname,'src/redux/reducers'),
        },
        extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less'] // 省略后缀
    }

#提取公共代码
在webpack4之前，提取公共代码都是通过一个叫CommonsChunkPlugin的插件来办到的。到了4以后，内置了一个一模一样的功能 optimization

分离出来的包要在HtmlWebpackPlugin中写入进去


#devtool优化
报错查询
    devtool: 'inline-source-map'  开发环境

#热更新和自动刷新的区别
在配置devServer的时候，如果hot为true，就代表开启了热更新，但是这并没有那么简单，因为热更新还需要配置一个webpack自带的插件并且还要在主要js文件里检查是否有module.hot
热更新的好处在开发vue或者react的时候，其中某个组件修改的时候就会针对这个组件进行更新，超级好用，提升开发效率