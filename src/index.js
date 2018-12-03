// // index.js
// import './css/style.css';   // 引入css
// import './less/style.less'; // 引入less

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import getRouter from './router/router';

const router = getRouter();
/* 初始化 */
renderWithHotReload(router);

function renderWithHotReload(RootElement) {
  ReactDOM.render(
    <Provider store={store}>{RootElement}</Provider>,
    document.getElementById('app')
  );
}

if (module.hot) {
  // 实现热更新
  module.hot.accept();
}
