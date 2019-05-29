import React, { Component } from "react";
import AppContainer from "./src/Nav";
import { store } from "./src/store";
import { Provider } from "react-redux";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
