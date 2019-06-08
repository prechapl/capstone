import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Family from './Family';
import Login from './Login';
import SignUp from './SignUp';
import Mood from './Mood';
import AllPolls from './AllPolls';
import SinglePoll from './SinglePoll';
import CreatePoll from './CreatePoll';
import ForgotPassword from './ForgotPassword';
import Events from './Events';
import SingleEvent from './SingleEvent';
import AddEvent from './AddEvent';
import AvatarGenerator from './AvatarGenerator';
import SingleEventAssigned from './SingleEventAssigned';

const PollsNavigator = createStackNavigator({
  Polls: AllPolls,
  Poll: SinglePoll,
  CreatePoll: CreatePoll
});

const AuthNavigator = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword
});

const UserNavigator = createStackNavigator({
  Family: Family,
  Mood: Mood,
  Events: Events,
  AvatarGenerator: AvatarGenerator
});

const EventNavigator = createStackNavigator({
  Events: Events,
  Event: SingleEvent,
  EventAssigned: SingleEventAssigned,
  AddEvent: AddEvent
});

const RootNavigator = createBottomTabNavigator({
  Account: AuthNavigator,
  User: UserNavigator,
  Polls: PollsNavigator,
  Events: EventNavigator
});

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
