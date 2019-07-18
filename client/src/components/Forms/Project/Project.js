import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import * as actions from "../../../store/actions/index";
import classes from "./Project.module.css";

import { updateObject, checkValidity } from "../../../shared/utility";

class Project extends Component {
  //   static propTypes = {
  //     prop: PropTypes
  //   };

  state = {
    controls: {
      project: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Project Name"
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
    this.props.onCreateProject(
      this.state.controls.project.value,
      this.props.userId
    );
  };

  render() {
    const { controls } = this.state;
    return (
      <div className={classes.Project}>
        <h2>Create a new project</h2>
        <form
          className={classes.Form}
          onSubmit={event => this.submitHandler(event)}
        >
          <Input
            shouldValidate={controls.project.validation}
            invalid={!controls.project.valid}
            touched={controls.project.touched}
            elementType={controls.project.elementType}
            elementConfig={controls.project.elementConfig}
            value={controls.project.value}
            changed={event => this.inputChangedHandler(event, "project")}
          />
          <Button btnType="CreateProject">Create Project</Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateProject: (projectData, userId) =>
      dispatch(actions.createProject(projectData, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
