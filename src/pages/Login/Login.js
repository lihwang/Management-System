import React, { Component } from 'react';
import './login.less';
import { login } from 'config/request';
import { notification } from 'antd';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  login = () => {
    if (!this.state.userName || !this.state.password) {
      notification.error({
        message: '登录错误',
        description: '请先输入账号密码',
      });
      return;
    }
    let params = {
      username: this.state.userName,
      password: this.state.password,
    };
    login(params).then(data => {
      console.log(data);
    });
  };

  render() {
    return (
      <div className="x-login">
        <div className="loginbox">
          <h1 className="title">我的后台</h1>
          <div>
            <input
              onChange={s => {
                let userName = s.target.value.trim();
                this.setState({ userName });
              }}
              placeholder="用户名"
              type="text"
            />
          </div>
          <div>
            <input
              placeholder="密码"
              onChange={s => {
                let password = s.target.value.trim();
                this.setState({ password });
              }}
              type="password"
            />
          </div>
          <div className="container_login">
            <div className="login_btn">
              <div className="btn"  />
              <button onClick={this.login}>确认</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
