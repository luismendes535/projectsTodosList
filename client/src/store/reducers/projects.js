import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utility";

const initialState = {
  projects: [],
  loading: false
};

const fetchProjectsStart = state => updateObject(state, { loading: true });

const fetchProjectsSuccess = (state, action) =>
  updateObject(state, {
    projects: action.projects,
    loading: false
  });

const fetchProjectsFail = state => updateObject(state, { loading: false });

const createProjectStart = state => {
  return updateObject(state, { loading: true });
};
const createProjectSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    projects: state.projects.concat(action.project)
  });
};
const createProjectFail = state => updateObject(state, { loading: false });

const deleteProjectStart = state => {
  return updateObject(state, { loading: true });
};
const deleteProjectSuccess = (state, action) => {
  const updatedProjects = state.projects.filter(
    project => project._id !== action.projectId
  ); 
  return updateObject(state, {
    loading: false,
    projects: updatedProjects ? updatedProjects : []
  });
};
const deleteProjectFail = state => updateObject(state, { loading: false });

const createTodoStart = state => {
  return updateObject(state, { loading: true });
};
const createTodoSuccess = (state, action) => { //MUST BE FIXED
  let updatedProjects = state.projects.find(
    project => project.title === action.title
  );
  updatedProjects.todos.concat({ todo: action.todo });
  return updateObject(state, {
    loading: false,
    projects: [].push(updatedProjects)
  });
};
const createTodoFail = state => updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_START:
      return fetchProjectsStart(state);
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return fetchProjectsSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAIL:
      return fetchProjectsFail(state);

    case actionTypes.CREATE_PROJECTS_START:
      return createProjectStart(state);
    case actionTypes.CREATE_PROJECTS_SUCCESS:
      return createProjectSuccess(state, action);
    case actionTypes.CREATE_PROJECTS_FAIL:
      return createProjectFail(state);

    case actionTypes.DELETE_PROJECT_START:
      return deleteProjectStart(state);
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return deleteProjectSuccess(state, action);
    case actionTypes.DELETE_PROJECT_FAIL:
      return deleteProjectFail(state);

    case actionTypes.CREATE_TODO_START:
      return createTodoStart(state);
    case actionTypes.CREATE_TODO_SUCCESS:
      return createTodoSuccess(state, action);
    case actionTypes.CREATE_TODO_FAIL:
      return createTodoFail(state);

    default:
      return state;
  }
};

export default reducer;
