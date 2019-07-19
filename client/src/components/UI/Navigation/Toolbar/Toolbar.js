import React from "react";

import classes from "./Toolbar.module.css";
import { NavLink } from "react-router-dom";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <nav className={classes.DesktopOnly}>
      <span>EDirectinsure TODO List</span>
      {props.isAuth ? (
        <ul className={classes.Logout}>
          {props.userName}
          <li className={classes.NavigationItem}>
            <NavLink
              to="/logout"
              activeClassName={classes.active}
              // exact={this.props}
            >
              <i class="large material-icons">exit_to_app</i>
            </NavLink>
          </li>
        </ul>
      ) : null}
    </nav>
  </header>
);

export default toolbar;
