import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';
import Counter from 'pages/Counter/Counter';
import UserInfo from 'pages/UserInfo/UserInfo';
import Layout from 'component/layout/layout';
import Login from 'pages/Login/Login';
import NoFound from 'pages/NoFound/NoFound';
import AuthorizedRoute from './AuthorizedRoute';

/**
 * exact路由会严格匹配
 */

const LayoutComponent=(<Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/page1" component={Page1} />
      <Route path="/couter" component={Counter} />
      <Route path="/userinfo" component={UserInfo} />
    </Switch>
  </Layout>
);

const GetRouter = () => (
  <Router>
    <Switch>
      {/* <Route path="/login" component={Login} />
      <AuthorizedRoute path="/" component={LayoutComponent} />
      <Route component={NoFound} /> */}
      <Route path="/login" component={Login} />
      <AuthorizedRoute path="/" component={props=>LayoutComponent} />
      <Route component={NoFound} /> 
    </Switch>
  </Router>
);

export default GetRouter;
