import React from "react";

import classes from "./Toolbar.module.css";
import { NavLink } from "react-router-dom";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <nav className={classes.DesktopOnly}>
      <span>EDirectinsure TODO List</span>
      {props.isAuth ? (
        <ul>
          <li className={classes.NavigationItem}>
            <NavLink
              to="/logout"
              activeClassName={classes.active}
              // exact={this.props}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      ) : (
        <li className={classes.NavigationItem}>
          <NavLink
            to="/auth"
            activeClassName={classes.active}
            // exact={this.props}
          >
            Login
          </NavLink>
        </li>
      )}
    </nav>
  </header>
);

export default toolbar;
