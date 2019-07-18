import React, { Component } from "react";
import classes from "./Project.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
class Project extends Component {
  render() {
    return (
      <div className={classes.Project}>
        <h2 className={classes.Header}>
          {this.props.title}
          <div>
            <i
              onClick={() =>
                this.props.onDeleteSuccess(this.props.title, this.props.userId)
              }
              className="tiny material-icons"
            >
              delete
            </i>
            <i className="tiny material-icons">edit</i>
          </div>
        </h2>
        <div className={classes.Todos}>
          Todo
          <ul>
            {this.props.todos.map(todo => {
              return (
                <li>
                  <input type="checkbox" name="vehicle1" value="Bike" />
                  {todo}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes.Done}>Done</div>
        <div className={classes.Footer}>
          <Input />
          <Button>Add</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDeleteSuccess: (title, userId) =>
      dispatch(actions.deleteProject(title, userId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
