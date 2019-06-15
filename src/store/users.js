import axios from 'axios';
import { AsyncStorage } from 'react-native';

//CONSTANTS

const GET_USERS = 'GET_USERS';
const GET_USER = 'GET_USER';
const GET_USER_RELATIONSHIPS = 'GET_USER_RELATIONSHIPS';
const GET_USER_POLLS = 'GET_USER_POLLS';

//ACTION CREATORS

const getUsers = users => ({
  type: GET_USERS,
  users
});
const getUser = user => ({
  type: GET_USER,
  user
});
const getUserRelationships = relationships => ({
  type: GET_USER_RELATIONSHIPS,
  relationships
});
const getUserPolls = polls => ({
  type: GET_USER_POLLS,
  polls
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
      password
    })
    .then(response => response.data)
    .then(token => AsyncStorage.setItem('token', token));
};

const getAuthedUser = () => {
  return dispatch => {
    return AsyncStorage.getItem('token')
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

const signUp = userData => {
  return axios
    .post('https://capstone-api-server.herokuapp.com/api/users', userData)
    .then(response => response.data)
    .then(token => AsyncStorage.setItem('token', token));
};

const fetchUserRelationships = id => {
  return dispatch => {
    return axios
      .get(
        `https://capstone-api-server.herokuapp.com/api/users/${id}/relationships`
      )
      .then(response => response.data)
      .then(relationships => dispatch(getUserRelationships(relationships)))
      .catch(error => console.log(error));
  };
};

const updateRelationshipType = (userId, RelationshipId, type) => {
  return axios
    .put(
      `https://capstone-api-server.herokuapp.com/api/users/${userId}/relationships/type`,
      { RelationshipId, type }
    )
    .catch(e => console.log(e));
};

const fetchUserPolls = id => {
  return dispatch => {
    return axios
      .get(`http://capstone-api-server.herokuapp.com/api/users/${id}/polls`)
      .then(({ data }) => dispatch(getUserPolls(data)))
      .catch(error => console.log(error));
  };
};

const updateRelationshipStatus = (userId, relationshipId, diff) => {
  return dispatch => {
    return axios
      .put(`https://capstone-api-server.herokuapp.com/api/users/${userId}`, {
        relationshipId,
        diff
      })
      .then(rel => {
        console.log(rel);
        return dispatch(fetchUserRelationships);
      })
      .catch(er => console.log(er));
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

const userRelationshipsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_RELATIONSHIPS:
      return action.relationships;
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
  signUp,
  fetchUserRelationships,
  fetchUserPolls,
  updateRelationshipType,
  userReducer,
  usersReducer,
  userRelationshipsReducer,
  userPollsReducer,
  updateRelationshipStatus
};
