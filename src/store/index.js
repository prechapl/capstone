import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { moodObjReducer, moodArrReducer } from './mood';
import {
  userReducer,
  usersReducer,
  relatedReducer,
  userPollsReducer
} from './users';
import { eventReducer, assignedEventReducer, assigneeReducer } from './events';
import { choicesReducer, votesReducer, pollReducer } from './polls';

const reducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  related: relatedReducer,
  mood: moodObjReducer,
  moods: moodArrReducer,
  events: eventReducer,
  assignees: assigneeReducer,
  assignedEvents: assignedEventReducer,
  userPolls: userPollsReducer,
  choices: choicesReducer,
  votes: votesReducer,
  poll: pollReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };
