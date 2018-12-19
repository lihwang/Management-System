import React, { Component } from 'react';
import './topnav.less';

export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  render() {
    return (
      <div className="topnav">
        <div className="logo left">
          <a href="javascript:;">
            <img src="https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg" />
          </a>
        </div>
        <div className="person_info right">
          <img src="https://avatars2.githubusercontent.com/u/25947622?s=460&v=4" />
          <div className="info">
            <a>我的信息</a>
            <a>注销</a>
            <a>修改密码</a>
            <a>修改头像</a>
          </div>
        </div>
      </div>
    );
  }
}
