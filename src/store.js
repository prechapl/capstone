import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

//CONSTANTS
const GET_USERS = "GET_USERS";
const GET_USER = "GET_USER";
const GET_RELATED = "GET_RELATED";
const SET_MOOD = "SET_MOOD";
const GET_MOOD = "GET_MOOD";
const GET_MOODS = "GET_MOODS";

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
const setMood = mood => ({
  type: SET_MOOD,
  mood
});
const getMood = mood => ({
  type: GET_MOOD,
  mood
});
const getMoods = moods => ({
  type: GET_MOODS,
  moods
});

//THUNKS

const fetchUsers = () => {
  return dispatch => {
    return axios
      .get("https://capstone-api-server.herokuapp.com/api/users/")
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

const setActiveMood = (userId, value) => {
  return dispatch => {
    return axios
      .post(`https://capstone-api-server.herokuapp.com/api/moods/${userId}`, {
        value: value,
        active: true
      })
      .then(data => {
        dispatch(setMood(data));
      })
      .catch(e => console.log(e));
  };
};

const getActiveMood = id => {
  return dispatch => {
    return axios
      .get(`https://capstone-api-server.herokuapp.com/api/moods/${id}`)
      .then(response => response.data)
      .then(data => dispatch(getMood(data)))
      .catch(e => console.log(e));
  };
};

const getAllMoods = id => {
  return dispatch => {
    return axios
      .get(`https://capstone-api-server.herokuapp.com/api/moods/${id}/all`)
      .then(response => response.data)
      .then(data => dispatch(getMoods(data)))
      .catch(e => console.log(e));
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
const moodReducer = (state = [], action) => {
  switch (action.type) {
    case SET_MOOD:
      return action.mood;
    case GET_MOOD:
      return action.mood;
    case GET_MOODS:
      return action.moods;
    default:
      return state;
  }
};

const reducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  related: relatedReducer,
  mood: moodReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export {
  store,
  fetchUsers,
  fetchUser,
  fetchRelated,
  setActiveMood,
  getActiveMood,
  getAllMoods
};
