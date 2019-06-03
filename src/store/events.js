import axios from 'axios';
import { RSA_NO_PADDING } from 'constants';

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
            .then(res => res.data)
            .then(events => dispatch(getEvents(events)))
    }
}

const fetchAssigned = (id) => {
    return dispatch => {
        return axios
            .get(`https://capstone-api-server.herokuapp.com/api/events/assigned/${id}`)
            .then(res => res.data)
            .then(events => dispatch(getAssigned(events)))
    }
}

