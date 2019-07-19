import React, { Component } from "react";
import { connect } from "react-redux";

// import PropTypes from "prop-types";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../utils/utility";

class Auth extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  state = {
    controls: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      passwordConfirmation: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Confirm password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
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
    this.props.onAuth(
      this.state.controls.name.value,
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      if (
        (key === "passwordConfirmation" || key === "name") &&
        this.state.isSignup
      ) {
      } else {
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        });
      }
    }
    let form = formElementsArray.map(el => (
      <Input
        key={el.id}
        shouldValidate={el.config.validation}
        invalid={!el.config.valid}
        touched={el.config.touched}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        changed={event => this.inputChangedHandler(event, el.id)}
      />
    ));
    return (
      <div className={classes.Auth}>
        <form onSubmit={event => this.submitHandler(event)}>
          {form}
          <Button btnType="Submit">
            {this.state.isSignup ? "Login" : "Sign Up"}
          </Button>
        </form>
        <b onClick={() => this.setState({ isSignup: !this.state.isSignup })}>
          {this.state.isSignup
            ? "Don't have an account? Sign up here!"
            : "I already have an accoutn!"}
        </b>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (name, email, password, isSignup) =>
      dispatch(actions.auth(name, email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
