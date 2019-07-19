import React, { Component } from "react";
import classes from "./Project.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../utils/utility";
import moment from "moment";

class Project extends Component {
  state = {
    controls: {
      todo: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Task"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      }
    }
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onCreateTodo(
      this.props.title,
      this.state.controls.todo.value,
      this.props.userId
    );
  };
  render() {
    const { controls } = this.state;

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
          To Do
          <ul>
            {this.props.todos.map((todo, id) => {
              if (!todo.finished) {
                return (
                  <li className={classes.Todo}>
                    <input type="checkbox" id={id} />
                    <label for={id}>{todo.todo}</label>
                    <i
                      onClick={() =>
                        this.props.onDeleteTodo(
                          this.props.title,
                          todo,
                          this.props.userId
                        )
                      }
                      className={[classes.icon, "tiny material-icons"].join(
                        " "
                      )}
                    >
                      delete
                    </i>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={classes.Done}>
          Done
          <ul>
            {this.props.todos.map(todo => {
              if (todo.finished) {
                return (
                  <li className={classes.Todo}>
                    <div className={classes.tooltip}>
                      <span className={classes.tooltiptext}>
                        {moment(todo.finished).format("DD-MM-YYYY HH:mm:ss")}
                      </span>
                      <input type="checkbox" checked />
                      <label>{todo.todo}</label>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={classes.Footer}>
          <form
            onSubmit={event => this.submitHandler(event)}
            className={classes.Form}
          >
            <Input
              shouldValidate={controls.todo.validation}
              invalid={!controls.todo.valid}
              touched={controls.todo.touched}
              elementType={controls.todo.elementType}
              elementConfig={controls.todo.elementConfig}
              value={controls.todo.value}
              changed={event => this.inputChangedHandler(event, "todo")}
            />
            <Button>Add</Button>
          </form>
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
    onCreateTodo: (title, todo, userId) =>
      dispatch(actions.createTodo(title, todo, userId)),
    onDeleteTodo: (title, todo, userId) =>
      dispatch(actions.deleteTodo(title, todo, userId)),
    onDeleteSuccess: (title, userId) =>
      dispatch(actions.deleteProject(title, userId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
