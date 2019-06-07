import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Family from './Family';
import Login from './Login';
import SignUp from './SignUp';
import Mood from './Mood';
import AllPolls from './Polls/AllPolls';
import SinglePoll from './/Polls/SinglePoll';
import CreatePoll from './Polls/CreatePoll';
import OpenPoll from './Polls/OpenPoll';
import ForgotPassword from './ForgotPassword';
import Events from './Events';
import SingleEvent from './SingleEvent';
import AddEvent from './AddEvent';
import AvatarGenerator from './AvatarGenerator';

const PollsNavigator = createStackNavigator({
  Polls: AllPolls,
  Poll: SinglePoll,
  CreatePoll: CreatePoll,
  OpenPoll: OpenPoll
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
