import { createStackNavigator, createAppContainer } from 'react-navigation';
import Family from './Family';
import User from './User';
import Login from './Login';
import SignUp from './SignUp';
import Mood from './Mood';

const AppNavigator = createStackNavigator({
  Home: Login,
  SignUp: SignUp,
  Family: Family,
  User: User,
  Mood: Mood
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
