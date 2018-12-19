import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import GetRouter from './router/router';
const router = GetRouter();
import 'common/style/base.css';

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
