import axios from 'axios';

const API_URL = 'https://capstone-api-server.herokuapp.com/api';

const GET_ALERTS = 'GET_ALERTS';
const DISMISS_ALERT = 'DISMISS_ALERTS';

const getAlerts = alerts => ({
  type: GET_ALERTS,
  alerts
});

const dismissAlert = alert => ({
  type: DISMISS_ALERT,
  alert
});

const alertsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALERTS: {
      return action.alerts;
    }
    case DISMISS_ALERT: {
      return [...state.filter(ev => ev.id !== action.alert.id), action.alert];
    }
    default:
      return state;
  }
};

const fetchAlerts = id => {
  return dispatch => {
    axios
      .get(`${API_URL}/alerts/user/${id}`)
      .then(res => res.data)
      .then(alerts => dispatch(getAlerts(alerts)))
      .catch(e => console.log(e));
  };
};

const goDismissAlert = id => {
  return dispatch => {
    axios
      .delete(`${API_URL}/alerts/${id}`)
      .then(res => res.data)
      .then(alert => dispatch(dismissAlert(alert)))
      .catch(e => console.log(e));
  };
};

export { fetchAlerts, alertsReducer, goDismissAlert };
