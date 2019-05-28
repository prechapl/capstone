import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppContainer from './src/Nav';
import { store } from './src/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
