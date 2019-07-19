import * as actionType from "./actionTypes";
import axios from "axios";

export const fetchProjects = userId => {
  return dispatch => {
    dispatch(fetchProjectsStart());
    axios
      .get(`http://localhost:5000/projects`)
      .then(({ data }) => {
        dispatch(fetchProjectsSuccess(data));
      })
      .catch(err => dispatch(fetchProjectsFail(err)));
  };
};

export const fetchProjectsSuccess = projects => {
  return {
    type: actionType.FETCH_PROJECTS_SUCCESS,
    projects
  };
};

export const fetchProjectsFail = () => {
  return {
    type: actionType.FETCH_PROJECTS_FAIL
  };
};

export const fetchProjectsStart = () => {
  return {
    type: actionType.FETCH_PROJECTS_START
  };
};

export const createProjectSuccess = project => {
  return {
    type: actionType.CREATE_PROJECTS_SUCCESS,
    project
  };
};

export const createProjectFail = error => {
  return {
    type: actionType.CREATE_PROJECTS_FAIL,
    error
  };
};

export const createProjectStart = () => {
  return {
    type: actionType.CREATE_PROJECTS_START
  };
};

export const createProject = (title, userId) => {
  return dispatch => {
    dispatch(createProjectStart());
    axios
      .post(`http://localhost:5000/projects`, { title })
      .then(response => {
        dispatch(createProjectSuccess(response.data));
      })
      .catch(err => {
        dispatch(createProjectFail(err));
      });
  };
};

export const deleteProjectSuccess = projectId => {
  return {
    type: actionType.DELETE_PROJECT_SUCCESS,
    projectId
  };
};

export const deleteProjectFail = error => {
  return {
    type: actionType.DELETE_PROJECT_FAIL,
    error
  };
};

export const deleteProjectStart = () => {
  return {
    type: actionType.DELETE_PROJECT_START
  };
};

export const deleteProject = projectId => {
  return dispatch => {
    dispatch(deleteProjectStart());
    axios
      .delete(`http://localhost:5000/project`, { data: { projectId } })
      .then(() => {
        dispatch(fetchProjects(projectId));
        // dispatch(deleteProjectSuccess(projectId));
      })
      .catch(err => {
        dispatch(deleteProjectFail(err));
      });
  };
};

export const createTodoSuccess = (title, todo) => {
  return {
    type: actionType.CREATE_TODO_SUCCESS,
    title,
    todo
  };
};

export const createTodoFail = error => {
  return {
    type: actionType.CREATE_TODO_FAIL,
    error
  };
};

export const createTodoStart = () => {
  return {
    type: actionType.CREATE_TODO_START
  };
};

export const createTodo = (title, todo, userId) => {
  return dispatch => {
    dispatch(createTodoStart());
    axios
      .post(`http://localhost:5000/project/todo`, { title, todo })
      .then(response => {
        // dispatch(createTodoSuccess(title, todo)); //MUST BE FIXED
        dispatch(fetchProjects(userId));
      })
      .catch(err => {
        dispatch(createTodoFail(err));
      });
  };
};

export const deleteTodoSuccess = (title, todo) => {
  return {
    type: actionType.DELETE_TODO_SUCCESS,
    title,
    todo
  };
};

export const deleteTodoFail = error => {
  return {
    type: actionType.DELETE_TODO_FAIL,
    error
  };
};

export const deleteTodoStart = () => {
  return {
    type: actionType.DELETE_TODO_START
  };
};

export const deleteTodo = (title, todoId, userId) => {
  return dispatch => {
    dispatch(deleteTodoStart());
    axios
      .put(`http://localhost:5000/project/todo`, { title, todoId })
      .then(response => {
        // this.setState({ loading: false, purchasing: false });
        // this.props.history.push("/");
        dispatch(deleteTodoSuccess(response.data.name, title));
        dispatch(fetchProjects(userId));
      })
      .catch(err => {
        // this.setState({ loading: false, purchasing: false });
        dispatch(deleteTodoFail(err));
      });
  };
};

// export const purchaseInit = () => {
//   return {
//     type: actionType.PURCHASE_INIT
//   };
// };
