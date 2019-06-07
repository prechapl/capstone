import axios from 'axios';

//CONSTANTS

const GET_CHOICES = 'GET_CHOICES';
const GET_VOTES = 'GET_VOTES';
const GET_POLL = 'GET_POLL';

//ACTION CREATORS

const getChoices = choices => ({
  type: GET_CHOICES,
  choices
});

const getVotes = votes => ({
  type: GET_VOTES,
  votes
});

const getPoll = poll => ({
  type: GET_POLL,
  poll
});

//THUNKS

const updatePollStatusThunk = (id, status) => {
  return dispatch => {
    return axios
      .put(`https://capstone-api-server.herokuapp.com/api/polls/${id}/`, status)
      .then(({ data }) => dispatch(getPoll(data)))
      .catch(error => console.log(error));
  };
};

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

const changeVoteThunk = (pollId, userId) => {
  return dispatch => {
    return axios
      .delete(
        `https://capstone-api-server.herokuapp.com/api/polls/${pollId}/votes/${userId}`
      )
      .then(() => dispatch(fetchVotes(pollId)))
      .catch(error => console.log(error));
  };
};

const createPollThunk = poll => {
  return dispatch => {
    return axios
      .post(`https://capstone-api-server.herokuapp.com/api/polls/`, poll)
      .then(({ data }) => dispatch(getPoll(data)));
  };
};

const createChoiceThunk = (pollId, choice) => {
  return dispatch => {
    return axios
      .post(
        `https://capstone-api-server.herokuapp.com/api/polls/${pollId}/votes`,
        choice
      )
      .then(() => dispatch(fetchChoices(pollId)));
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

const pollReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POLL:
      return action.poll;
    default:
      return state;
  }
};

export {
  fetchChoices,
  fetchVotes,
  updatePollStatusThunk,
  castVoteThunk,
  createPollThunk,
  changeVoteThunk,
  createChoiceThunk,
  choicesReducer,
  votesReducer,
  pollReducer
};
