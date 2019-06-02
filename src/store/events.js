import axios from 'axios';

const GET_EVENTS = 'GET_EVENTS';
const GET__ASSIGNED = 'GET_ASSIGNED';

const getEvents = events => ({
    type: GET_EVENTS,
    events
});

const getAssigned = events => ({
    type: GET__ASSIGNED,
    events
});

const fetchEvents = (id) => {
    return dispatch => {
        return axios
            .get(`https://capstone-api-server.herokuapp.com/api/events/user/${id}`)
    }
}

