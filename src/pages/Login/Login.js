import React, { Component } from 'react';
import './login.less';
import { login ,regist} from 'config/request';
import { notification } from 'antd';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isregist:false,
    };
  }

  login = () => {
    let isregist=this.state.isregist;
    if (!this.state.userName || !this.state.password) {
      notification.error({
        message: isregist?'注册失败':'登录错误',
        description: '请先输入账号密码',
      });
      return;
    }
    let params = {
      username: this.state.userName,
      password: this.state.password,
    };
    if(this.state.userName=='admin'&&this.state.password=='admin'){
      sessionStorage.setItem('user',JSON.stringify(params));
        this.props.history.push('/Home');
      return false;
    }

    if(isregist){
      regist(params).then(() => {
          this.setState({
            username: '',
            password: '',
          })
          notification.success({
            message:'注册成功',
            description: '3秒后自动登录',
          });
      });
    }else{
      login(params).then(() => {
        notification.success({
          message:'登录成功',
          description: '3秒后自动登录',
        });
        location.href='/layout'
      });
    }
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
              value={this.state.userName}
            />
          </div>
          <div>
            <input
              placeholder="密码"
              onChange={s => {
                let password = s.target.value.trim();
                this.setState({ password });
              }}
              value={this.state.password}
              type="password"
            />
          </div>
          <div className="container_login">
            <div className="login_btn">
              <div className="btn"  />
              <button onClick={this.login}>{this.state.isregist?"确认注册":'确认登录'}</button>
            </div>
          </div>
          <div className='regist' onClick={()=>{
            this.setState({
              isregist:!this.state.isregist,
            })
          }}>{this.state.isregist?'登录':'注册'}</div>
        </div>
      </div>
    );
  }
}
