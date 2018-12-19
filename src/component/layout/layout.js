import React, { Component } from 'react';
import './layout.less';
import TopNav from 'component/topnav/topnav';
import SideNav from 'component/sidenav/sidenav';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <div className="layout">
        <TopNav />
        <SideNav />
        {children}
      </div>
    );
  }
}
