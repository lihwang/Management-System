// index.js
import './css/style.css';   // 引入css
import './less/style.less'; // 引入less

console.log('这里是打包文件入口-index.js');
import ReactDOM from 'react-dom'
import getRouter from './router/router'

ReactDOM.render(getRouter(),document.getElementById('app'))

if (module.hot) {
    // 实现热更新
    module.hot.accept();
  }