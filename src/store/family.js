import axios from 'axios';

const API_URL = 'https://capstone-api-server.herokuapp.com/api';
const GET_FAMILY_MEMBERS = 'GET_FAMILY_MEMBERS';

const getFamilyMembers = members => ({
  type: GET_FAMILY_MEMBERS,
  members
});

const familyMembersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_FAMILY_MEMBERS:
      return action.members;
    default:
      return state;
  }
};

const fetchFamilyMembers = id => {
  return dispatch => {
    return axios
      .get(`${API_URL}/families/${id}/users`)
      .then(res => res.data)
      .then(members => dispatch(getFamilyMembers(members)));
  };
};

export { fetchFamilyMembers, familyMembersReducer };
