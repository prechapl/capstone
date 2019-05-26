import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//CONSTANTS

const GET_USERS = 'GET_USERS';

//ACTION CREATORS

const getUsers = users => ({
  type: GET_USERS,
  users
});

//THUNKS

const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(response => response.data)
      .then(users => dispatch(getUsers(users)));
  };
};

//REDUCERS

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
};

const reducer = combineReducers({
  usersReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store, fetchUsers };
