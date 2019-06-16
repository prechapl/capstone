import axios from 'axios';

//CONSTANTS
const GET_POLLS = 'GET_POLLS';
const GET_CHOICES = 'GET_CHOICES';
const GET_VOTES = 'GET_VOTES';
const GET_POLL = 'GET_POLL';

//ACTION CREATORS
const getPolls = polls => ({
  type: GET_POLLS,
  polls
});

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

const fetchPoll = pollId => {
  return dispatch => {
    return axios
      .get(`http://capstone-api-server.herokuapp.com/api/polls/${pollId}`)
      .then(({ data }) => dispatch(getPoll(data)))
      .catch(err => console.log(err));
  };
};

const fetchPolls = familyId => {
  return dispatch => {
    return axios
      .get(
        `http://capstone-api-server.herokuapp.com/api/families/${familyId}/polls`
      )
      .then(({ data }) => dispatch(getPolls(data)))
      .catch(err => console.log(err));
  };
};

const updatePollStatusThunk = (id, status, familyId) => {
  console.log(familyId);
  return dispatch => {
    return axios
      .put(`https://capstone-api-server.herokuapp.com/api/polls/${id}/`, status)
      .then(() => dispatch(fetchPolls(familyId)))
      .catch(err => console.log(err));
  };
};

const deletePollThunk = (pollId, familyId) => {
  return dispatch => {
    return axios
      .delete(`https://capstone-api-server.herokuapp.com/api/polls/${pollId}/`)
      .then(() => dispatch(fetchPolls(familyId)))
      .catch(err => console.log(err));
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
      .then(({ data }) => dispatch(getPoll(data)))
      .catch(err => console.log(err));
  };
};

const createChoiceThunk = (pollId, choice, familyId) => {
  return dispatch => {
    return axios
      .post(
        `https://capstone-api-server.herokuapp.com/api/polls/${pollId}/choices`,
        choice
      )
      .then(() => dispatch(fetchPolls(familyId)))
      .catch(err => console.log(err));
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

const pollsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POLLS:
      return action.polls;
    default:
      return state;
  }
};

export {
  fetchPoll,
  fetchPolls,
  fetchChoices,
  fetchVotes,
  updatePollStatusThunk,
  deletePollThunk,
  castVoteThunk,
  createPollThunk,
  changeVoteThunk,
  createChoiceThunk,
  choicesReducer,
  votesReducer,
  pollReducer,
  pollsReducer
};
