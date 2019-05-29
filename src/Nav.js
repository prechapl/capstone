import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Family from './Family';
import User from './User';
import Login from './Login';
import SignUp from './SignUp';
import Mood from './Mood';

const AppNavigator = createBottomTabNavigator({
  'Log In': Login,
  'Sign Up': SignUp,
  Family: Family,
  User: User,
  Mood: Mood
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
