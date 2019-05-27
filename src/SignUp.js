import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

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
    width: 200,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#448AE6',
    padding: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  }
});

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      password: '',
      image: '',
      familyCode: ''
    };
  }

  handleSubmit = (ev, history) => {
    console.log(this.state);
    this.props.navigation.navigate('Family');
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={firstName => this.setState({ firstName })}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={lastName => this.setState({ lastName })}
          />

          <TextInput
            style={styles.input}
            placeholder="Age"
            onChangeText={age => this.setState({ age })}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
          />

          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="password"
            onChangeText={password => {
              this.setState({ password });
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Image"
            onChangeText={image => this.setState({ image })}
          />

          <TextInput
            style={styles.input}
            placeholder="Family Code"
            onChangeText={familyCode => this.setState({ familyCode })}
          />

          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
