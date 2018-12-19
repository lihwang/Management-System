import React, { Component } from 'react';
import './nofound.less';
//导入照片
import nofound from './nofound.jpeg';

class NoFound extends Component {
  render() {
    return (
      <div className="x-nofound">
        <img src={nofound} alt="" />
        <div className="x-tip">未找到页面5S后回到首页</div>
      </div>
    );
  }
}

export default NoFound;
