import axios from 'axios';

const API_URL = 'https://capstone-api-server.herokuapp.com/api';
const GET_FAMILYMEMBERS = 'GET_FAMILYMEMBERS';

const getFamilyMembers = members => ({
    type: GET_FAMILYMEMBERS,
    members
});

const familyMembersReducer = (state = [], action) => {
    switch (action.type) {
        case GET_FAMILYMEMBERS:
            return action.members;
        default:
            return state;
    }
};

const fetchFamilyMembers = id => {
    return dispatch => {
        return axios.get(`${API_URL}/families/${id}`)
            .then(res => res.data)
            .then(members => dispatch(getFamilyMembers(members)))
    }
}

export {
    fetchFamilyMembers,
    familyMembersReducer
}
