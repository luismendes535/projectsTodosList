import React, { Component } from "react";
// import PropTypes from 'prop-types'
import Project from "../../components/Project/Project";
import ProjectForm from "../../components/Forms/Project/Project";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./Projects.module.css";
class Projects extends Component {
  static propTypes = {
    // prop: PropTypes
  };
  componentDidMount() {
    this.props.onFetchSuccess(this.props.userId);
  }
  render() {
    return (
      <div className={classes.Projects}>
        {this.props.projects.map(project => {
          return (
            <Project
              title={project.title}
              todos={project.todos}
              id={project._id}
              key={project._id}
            />
          );
        })}
        <ProjectForm />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    loading: state.projects.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchSuccess: userId => dispatch(actions.fetchProjects(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
