import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { store } from './src/store';
import Family from './src/Family';
import User from './src/User';

const AppNavigator = createStackNavigator({
  Home: Family,
  User: User
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
