import axios from 'axios';

const API_URL = 'https://capstone-api-server.herokuapp.com/api';
const GET_EVENTS = 'GET_EVENTS';
const GET_ASSIGNED = 'GET_ASSIGNED';
const UPDATE_EVENT = 'UPDATE_EVENT';
const CREATE_EVENT = 'CREATE_EVENT';
const UPDATE_ASSIGNED = 'UPDATE_ASSIGNED';
const DELETE_EVENT = 'DELETE_EVENT';
const GET_ASSIGNEES = 'GET_ASSIGNEES';

const getAssignees = assignees => ({
  type: GET_ASSIGNEES,
  assignees
})

const getEvents = events => ({
  type: GET_EVENTS,
  events
});

const getAssigned = events => ({
  type: GET_ASSIGNED,
  events
});

const updateEvent = event => ({
  type: UPDATE_EVENT,
  event
});

const createEvent = event => ({
  type: CREATE_EVENT,
  event
});

const updateAssigned = event => ({
  type: UPDATE_ASSIGNED,
  event
});

const deleteEvent = id => ({
  type: DELETE_EVENT,
  id
})

const eventReducer = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    case UPDATE_EVENT:
      return [
        ...state.filter(event => event.id !== action.event.id),
        action.event
      ];
    case CREATE_EVENT:
      return [...state, action.event];
    case DELETE_EVENT:
      return state.filter(ev => ev.id !== action.id);
    default:
      return state;
  }
};

const assignedEventReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ASSIGNED:
      return action.events;
    case UPDATE_ASSIGNED:
      return [
        ...state.filter(event => event.id !== action.event.id),
        action.event
      ];
    default:
      return state;
  }
};

const assigneeReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ASSIGNEES:
      return action.assignees;
    default:
      return state;
  }
}

const fetchEvents = id => {
  return dispatch => {
    return axios
      .get(`${API_URL}/events/user/${id}`)
      .then(res => {
        return res.data;
      })
      .then(events => dispatch(getEvents(events)));
  };
};

const fetchAssigned = id => {
  return dispatch => {
    return axios
      .get(`${API_URL}/events/assigned/${id}`)
      .then(res => res.data)
      .then(events => dispatch(getAssigned(events)));
  };
};

const goUpdateAssigned = (id, updates) => {
  return dispatch => {
    return axios
      .put(`${API_URL}/events/${id}`, updates)
      .then(res => res.data)
      .then(updatedEvent => dispatch(updateAssigned(updatedEvent)));
  };
};

const goUpdateEvent = (id, updates) => {
  return dispatch => {
    return axios
      .put(`${API_URL}/events/${id}`, updates)
      .then(res => res.data)
      .then(updatedEvent => dispatch(updateEvent(updatedEvent)));
  };
};

const goCreateEvent = newEvent => {
  return dispatch => {
    return axios
      .post(`${API_URL}/events`, newEvent)
      .then(res => res.data)
      .then(event => dispatch(createEvent(event)));
  };
};

const goDeleteEvent = id => {
  return dispatch => {
    return axios
      .delete(`${API_URL}/events/${id}`)
      .then((res) => {
        if (res.status === 204) {
          dispatch(deleteEvent(id))
        }
      })
  }
}

const fetchAssignees = id => {
  return dispatch => {
    return axios
      .get(`${API_URL}/events/${id}/assignees`)
      .then(res => res.data)
      .then(assignees => dispatch(getAssignees(assignees)))
  }
}

export {
  fetchEvents,
  fetchAssigned,
  goCreateEvent,
  goUpdateAssigned,
  goUpdateEvent,
  eventReducer,
  assignedEventReducer,
  goDeleteEvent,
  fetchAssignees,
  assigneeReducer
};
