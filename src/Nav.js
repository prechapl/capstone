import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Family from './Family';
import User from './User';
import Login from './Login';
import SignUp from './SignUp';
import Mood from './Mood';
import AllPolls from './AllPolls';
import SinglePoll from './SinglePoll';
import ForgotPassword from './ForgotPassword';
import Events from './Events';
import SingleEvent from './SingleEvent';
import AddEvent from './AddEvent';
import AvatarChild from './AvatarChild';

const PollsNavigator = createStackNavigator({
  Polls: AllPolls,
  Poll: SinglePoll
});

const AuthNavigator = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  ForgotPassword: ForgotPassword
});

const UserNavigator = createStackNavigator({
  User: User,
  Family: Family,
  Mood: Mood,
  Events: Events,
  AvatarChild: AvatarChild
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
