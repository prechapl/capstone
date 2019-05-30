import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//CONSTANTS

const GET_USERS = 'GET_USERS';
const GET_USER = 'GET_USERS';
const GET_RELATED = 'GET_RELATED';

//ACTION CREATORS

const getUsers = users => ({
  type: GET_USERS,
  users
});

const getUser = user => ({
  type: GET_USER,
  user
});

const getRelated = related => ({
  type: GET_RELATED,
  related
});
//THUNKS

const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('https://capstone-api-server.herokuapp.com/api/users/')
      .then(response => response.data)
      .then(users => dispatch(getUsers(users)))
      .catch(error => console.log(error));
  };
};

const fetchUser = id => {
  return dispatch => {
    return axios
      .get(`https://capstone-api-server.herokuapp.com/api/users/${id}`)
      .then(response => response.data)
      .then(user => dispatch(getUser(user)))
      .catch(error => console.log(error));
  };
};

const fetchRelated = id => {
  return dispatch => {
    return axios
      .get(
        `https://capstone-api-server.herokuapp.com/api/users/${id}/relationships`
      )
      .then(response => response.data)
      .then(related => dispatch(getRelated(related)))
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

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
};

const relatedReducer = (state = [], action) => {
  switch (action.type) {
    case GET_RELATED:
      return action.related;
    default:
      return state;
  }
};
const reducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  related: relatedReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store, fetchUsers, fetchUser, fetchRelated };
