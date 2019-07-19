import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/UI/Toolbar/Toolbar";
import { connect } from "react-redux";

class Layout extends Component {
  render() {
    return (
      <>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          userName={this.props.userName}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userName: state.auth.userName
  };
};

export default connect(mapStateToProps)(Layout);
