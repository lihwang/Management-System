import axios from 'axios';
import { createHashHistory } from 'history';

let globalCode = {
  success: '200',
  timeout: '1',
  busyCode: '-1',
};

// import { notification } from 'antd';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3002/';
axios.defaults.timeout = 1000;
const instance = axios.create({});

//添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    //请求错误时做些事
    // Toast.hide();
    return Promise.reject(error);
  }
);

//添加一个响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 1.成功
    if (
      response.data.success &&
      response.data.messageCode === globalCode.success
    ) {
      return response.data.data;
    }

    // 2.session过期
    if (
      !response.data.success &&
      response.data.messageCode === globalCode.timeout
    ) {
      createHashHistory().push('/login');
      // 定义一个messagecode在后面会用到
      return Promise.reject({
        messageCode: 'timeout',
      });
    }

    // 3. 系统异常、网络异常
    if (
      response.data.success &&
      response.data.messageCode === globalCode.busyCode
    ) {
      return Promise.reject({
        messageCode: 'netError',
      });
    }

    // 3.其他失败，比如校验不通过等
    return Promise.reject(response.data);
  },
  function() {
    return Promise.reject({
      messageCode: 'sysError',
    });
  }
);

export default instance;
