import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  projects: [],
  loading: false,
};

const fetchProjectsStart = (state)=>updateObject(state, { loading: true });

const fetchProjectsSuccess = (state,action)=> updateObject(state, {
  projects: action.projects,
  loading: false
});

const fetchProjectsFail =(state)=> updateObject(state, {loading: false});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_START: return fetchProjectsStart(state); 
    case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state,action); 
    case actionTypes.FETCH_PROJECTS_FAIL: return fetchProjectsFail(state);
    default: return state;
  }
};

export default reducer;