import React, { Component } from 'react';
import './sidenav.less';

export default class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <div className="sidenav">
        <div className="menu" />
        <div className="content">
          {children}
        </div>
      </div>
    );
  }
}
