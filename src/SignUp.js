import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    backgroundColor: "#D3D3D4",
    marginBottom: 20,
    width: 300,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#448AE6",
    padding: 10,
    width: 300,
    margin: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF"
  },
  header: {
    padding: 10,
    margin: 10,
    fontSize: 50
    // fontFamily: 'AmericanTypewriter-Condensed'
  }
});

export default class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      password: "",
      image: "",
      familyCode: "",
      page: 1
    };
  }

  handleSubmit = (ev, history) => {
    // console.log(this.state);
    this.props.navigation.navigate("Family");
    this.setState({ page: 1 });
  };

  nextPage = () => {
    this.setState({
      page: this.state.page + 1
    });
  };

  previousPage = () => {
    this.setState({
      page: this.state.page - 1
    });
  };

  render() {
    if (this.state.page === 1) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.header}>Mend</Text>
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

            <TouchableOpacity style={styles.button} onPress={this.nextPage}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }

    if (this.state.page === 2) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.header}>Mend</Text>
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

            <TouchableOpacity style={styles.button} onPress={this.nextPage}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.previousPage}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }

    if (this.state.page === 3) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.header}>Mend</Text>
            <TextInput
              style={styles.input}
              placeholder="Image"
              onChangeText={image => this.setState({ image })}
            />

            <TouchableOpacity style={styles.button} onPress={this.nextPage}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.previousPage}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }

    if (this.state.page === 4) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.header}>Mend</Text>
            <TextInput
              style={styles.input}
              placeholder="Family Code"
              onChangeText={familyCode => this.setState({ familyCode })}
            />

            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.previousPage}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}
