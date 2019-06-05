import axios from 'axios';
import { fetchUserPolls } from './users';

//CONSTANTS

const GET_CHOICES = 'GET_CHOICES';
const GET_VOTES = 'GET_VOTES';
const GET_USER_VOTES = 'GET_USER_VOTES';

//ACTION CREATORS

const getChoices = choices => ({
  type: GET_CHOICES,
  choices
});

const getVotes = votes => ({
  type: GET_VOTES,
  votes
});

const getUserVotes = votes => ({
  type: GET_USER_VOTES,
  votes
});

//THUNKS

const fetchChoices = id => {
  return dispatch => {
    return axios
      .get(`https://capstone-api-server.herokuapp.com/api/polls/${id}/choices`)
      .then(({ data }) => dispatch(getChoices(data)))
      .catch(error => console.log(error));
  };
};

const fetchVotes = id => {
  return dispatch => {
    return axios
      .get(`https://capstone-api-server.herokuapp.com/api/polls/${id}/votes`)
      .then(({ data }) => dispatch(getVotes(data)))
      .catch(error => console.log(error));
  };
};

const fetchUserVotes = (pollId, userId) => {
  return dispatch => {
    return axios
      .get(
        `https://capstone-api-server.herokuapp.com/api/polls/${pollId}/votes/${userId}`
      )
      .then(({ data }) => dispatch(getUserVotes(data)))
      .catch(error => console.log(error));
  };
};
const castVoteThunk = (id, vote) => {
  return dispatch => {
    return axios
      .post(
        `https://capstone-api-server.herokuapp.com/api/polls/${id}/votes`,
        vote
      )
      .then(() => dispatch(fetchVotes(id)))
      .catch(error => console.log(error));
  };
};

const changeVoteThunk = (pollId, voteId) => {
  return dispatch => {
    return axios
      .delete(
        `https://capstone-api-server.herokuapp.com/api/polls/${pollId}/votes/${voteId}`
      )
      .then(() => dispatch(fetchVotes(pollId)))
      .catch(error => console.log(error));
  };
};

const createPollThunk = (userId, poll) => {
  return dispatch => {
    return axios
      .post(`https://capstone-api-server.herokuapp.com/api/polls/`, poll)
      .then(() => dispatch(fetchUserPolls(userId)));
  };
};

//REDUCERS

const choicesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CHOICES:
      return action.choices;
    default:
      return state;
  }
};

const votesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_VOTES:
      return action.votes;
    default:
      return state;
  }
};

const userVotesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_VOTES:
      return action.votes;
    default:
      return state;
  }
};

export {
  fetchChoices,
  fetchVotes,
  fetchUserVotes,
  castVoteThunk,
  createPollThunk,
  changeVoteThunk,
  choicesReducer,
  votesReducer,
  userVotesReducer
};
