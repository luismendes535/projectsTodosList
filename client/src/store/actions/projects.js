import * as actionType from "./actionTypes";
import axios from "axios";

export const fetchProjects = userId => {
  return dispatch => {
    dispatch(fetchProjectsStart());
    axios
      .get(`http://localhost:5000/projects/${userId}`)
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

export const createProjectSuccess = (id, orderData) => {
  return {
    type: actionType.CREATE_PROJECTS_SUCCESS,
    orderId: id,
    orderData: orderData
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
      .post(`http://localhost:5000/projects/${userId}`, { title })
      .then(response => {
        // this.setState({ loading: false, purchasing: false });
        // this.props.history.push("/");
        dispatch(createProjectSuccess(response.data.name, title));
        dispatch(fetchProjects(userId));
      })
      .catch(err => {
        // this.setState({ loading: false, purchasing: false });
        dispatch(createProjectFail(err));
      });
  };
};

export const deleteProjectSuccess = (id, orderData) => {
  return {
    type: actionType.DELETE_PROJECT_SUCCESS,
    orderId: id,
    orderData: orderData
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

export const deleteProject = (title, userId) => {
  return dispatch => {
    dispatch(deleteProjectStart());
    axios
      .delete(`http://localhost:5000/project`, { data: { title } })
      .then(response => {
        // this.setState({ loading: false, purchasing: false });
        // this.props.history.push("/");
        dispatch(deleteProjectSuccess(response.data.name, title));
        dispatch(fetchProjects(userId));
      })
      .catch(err => {
        // this.setState({ loading: false, purchasing: false });
        dispatch(deleteProjectFail(err));
      });
  };
};

export const createTodoSuccess = (id, orderData) => {
  return {
    type: actionType.CREATE_TODO_SUCCESS,
    orderId: id,
    orderData: orderData
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
        // this.setState({ loading: false, purchasing: false });
        // this.props.history.push("/");
        dispatch(createTodoSuccess(response.data.name, title));
        dispatch(fetchProjects(userId));
      })
      .catch(err => {
        // this.setState({ loading: false, purchasing: false });
        dispatch(createTodoFail(err));
      });
  };
};

export const deleteTodoSuccess = (id, orderData) => {
  return {
    type: actionType.DELETE_TODO_SUCCESS,
    orderId: id,
    orderData: orderData
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
    dispatch(deleteProjectStart());
    axios
      .delete(`http://localhost:5000/project/todo`, { data: { title, todoId } })
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
