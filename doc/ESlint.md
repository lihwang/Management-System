##集成eslint

eslint目标是以可扩展，每条规则独立，不内置编码风格为理念的lint工具，用户可以定制自己的规则做成公共包
eslint主要有以下特点：
1）默认规则包含所有的jslint，jshint中存在的规则易迁移
2）规则可配置性高，可设置警告，错误两个error等级，也可以直接禁用
3）包含代码风格检测的规则
4）支持插件扩展，自定义规则
针对react开发者，eslint已经可以很好的支持jsx语法了。
先安装插件

npm install -D eslint eslint-config-airbnb eslint-loader  eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

"lint": "npm run format && npm run fix &&  eslint --ext .js src",  //  检测你写的代码是否符合eslint的规则
"fix": "npm run format && eslint --fix --ext .js src",  //  npm run fix 这个是可以修复你没有按照lint规则的写法

