import axios from 'axios';
import { createHashHistory } from 'history';
import { notification } from 'antd';

let globalCode = {
  success: '0',
  timeout: '-10',
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
      if (response.data.code === globalCode.success) {
        return response.data.data;
      }

      // 2.session过期
      if (response.data.code === globalCode.timeout) {
        createHashHistory().push('/login');
        // 定义一个messagecode在后面会用到
        return Promise.reject({code: 'timeout'});
      }

      // 3. 系统异常、网络异常
      if (response.data.success && response.data.code === globalCode.busyCode) {
        return Promise.reject({code: 'netError'});
      }

    // 3.其他失败，比如校验不通过等
    notification.error({
      message:'提示',
      description:response.data.message,
    })
    return Promise.reject(response.data);
  },
  function() {
    return Promise.reject({
      code: 'sysError',
    });
  }
);

export default instance;
