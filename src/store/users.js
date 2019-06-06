import axios from 'axios';
import { AsyncStorage } from 'react-native';

//CONSTANTS

const GET_USERS = 'GET_USERS';
const GET_USER = 'GET_USER';
const GET_RELATED = 'GET_RELATED';
const GET_USER_POLLS = 'GET_USER_POLLS';

//ACTION CREATORS

const getUsers = users => ({
  type: GET_USERS,
  users,
});
const getUser = user => ({
  type: GET_USER,
  user,
});
const getRelated = related => ({
  type: GET_RELATED,
  related,
});
const getUserPolls = polls => ({
  type: GET_USER_POLLS,
  polls,
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

const loginUser = (email, password) => {
  return axios
    .put('https://capstone-api-server.herokuapp.com/api/users/login', {
      email,
      password,
    })
    .then(response => response.data)
    .then(token => AsyncStorage.setItem('token', token));
};

const getAuthedUser = () => {
  return dispatch => {
    AsyncStorage.getItem('token')
      .then(token => {
        return axios.get(
          'https://capstone-api-server.herokuapp.com/api/users/authed',
          { headers: { authorization: token } }
        );
      })
      .then(response => response.data)
      .then(user => dispatch(getUser(user)));
  };
};

const logoutUser = () => {
  return dispatch => {
    return AsyncStorage.removeItem('token').then(() => dispatch(getUser({})));
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

const fetchUserPolls = id => {
  return dispatch => {
    return axios
      .get(`http://capstone-api-server.herokuapp.com/api/users/${id}/polls`)
      .then(({ data }) => dispatch(getUserPolls(data)))
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

const userPollsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_POLLS:
      return action.polls;
    default:
      return state;
  }
};

export {
  fetchUsers,
  fetchUser,
  loginUser,
  logoutUser,
  getAuthedUser,
  fetchRelated,
  fetchUserPolls,
  userReducer,
  usersReducer,
  relatedReducer,
  userPollsReducer,
};
