import React, { Component, Suspense, lazy } from "react";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Logout from "./containers/Auth/Logout/Logout";
import Layout from "./hoc/Layout/Layout";
const Auth = lazy(() => import("./containers/Auth/Auth"));
const Projects = lazy(() => import("./containers/Projects/Projects"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/signup" component={Auth} />
        {/* <Route path="/" exact component={BurgerBuilder} /> */}
        <Redirect to="/auth" />
      </Switch>
    );
    if (this.props.isAuthenticated) { //developing
    // if (true) { //developing
      routes = (
        <Switch>
          {/* <Route path="/auth" component={Auth} /> */}
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Projects} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>{routes}</Layout>{" "}
      </Suspense>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
