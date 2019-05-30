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

// const AppNavigator = createBottomTabNavigator({
const AppNavigator = createStackNavigator({
  'Log In': Login,
  'Sign Up': SignUp,
  Family: Family,
  User: User,
  Mood: Mood,
  Polls: AllPolls,
  Poll: SinglePoll
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
