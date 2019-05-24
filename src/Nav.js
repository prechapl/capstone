import { createStackNavigator, createAppContainer } from 'react-navigation';
import Family from './Family';
import User from './User';

const AppNavigator = createStackNavigator({
  Home: Family,
  User: User
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
