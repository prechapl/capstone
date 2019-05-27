import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import { Constants } from 'expo';
const { manifest } = Constants;
const api =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost
        .split(`:`)
        .shift()
        .concat(`:3000`)
    : `api.example.com`;

//CONSTANTS

const GET_USERS = 'GET_USERS';

//ACTION CREATORS

const getUsers = users => ({
  type: GET_USERS,
  users
});

//THUNKS

const fetchUsers = () => {
  // console.log('manifest', manifest);
  console.log('api', api);
  return dispatch => {
    return (
      axios
        // .get(`http://${api}/api/users`)
        .get('http://96.246.143.116:3000/api/users')
        // .get('/api/users')
        // .get('http://192.168.1.218:3000/api/users')
        .then(response => response.data)
        .then(users => dispatch(getUsers(users)))
        .catch(error => console.log(error))
    );
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

// const reducer = combineReducers({
//   usersReducer
// });

const store = createStore(usersReducer, applyMiddleware(thunkMiddleware));

export { store, fetchUsers };
