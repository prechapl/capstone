import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

export default class ForgotPassord extends Component {
  constructor() {
    super();
  }

  handleSubmit = (ev, history) => {
    // console.log(this.state);
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.header}>Mender</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
          />

          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Send Password Reset Link</Text>
          </TouchableOpacity>
          {/*
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    backgroundColor: '#D3D3D4',
    marginBottom: 20,
    width: 300,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#448AE6',
    padding: 10,
    margin: 10,
    width: 300
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  header: {
    padding: 10,
    marginBottom: 30,
    fontSize: 75
  }
});
