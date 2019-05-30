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
      .get('https://capstone-api-server.herokuapp.com/api/users')
      .then(response => response.data)
      .then(users => dispatch(getUsers(users)))
      .catch(error => console.log(error));
  };
};

//REDUCERS

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
};

const reducer = combineReducers({
  users: usersReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store, fetchUsers };
