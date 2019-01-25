import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// import Home from 'pages/Home/Home';
// import Page1 from 'pages/Page1/Page1';
// import Counter from 'pages/Counter/Counter';
// import UserInfo from 'pages/UserInfo/UserInfo';
// import Layout from 'component/layout/layout';
import Login from 'pages/Login/Login';
import NoFound from 'pages/NoFound/NoFound';
import AuthorizedRoute from './AuthorizedRoute';

const LayoutComponent = (<div></div>
  // <Layout>
  //   <Switch>
  //     <Route exact path="/" component={Home} />
  //     <Route path="/page1" component={Page1} />
  //     <Route path="/couter" component={Counter} />
  //     <Route path="/userinfo" component={UserInfo} />
  //   </Switch>
  // </Layout>
);

const GetRouter = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Redirect from="/" exact to="/login" />
      {/*注意redirect转向的地址要先定义好路由*/}
      <AuthorizedRoute path="/layout" component={LayoutComponent} />
      {/* <Route path='/' render={() => LayoutRouter}/> */}
      <Route component={NoFound} />
    </Switch>
  </Router>
);

export default GetRouter;
