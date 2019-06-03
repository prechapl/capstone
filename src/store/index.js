import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { moodObjReducer, moodArrReducer } from './mood';
import { userReducer, usersReducer, relatedReducer } from './users';
import { eventReducer, assignedEventReducer } from './events';

const reducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  related: relatedReducer,
  mood: moodObjReducer,
  moods: moodArrReducer,
  events: eventReducer,
  assignedEvents: assignedEventReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };
