import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';

import { createChoiceThunk } from '../store/polls';

class CreateChoices extends Component {
  constructor() {
    super();

    this.state = {
      pollId: '',
      text: '',
      choices: [],
      currentChoice: ''
    };
  }

  componenDidMount() {
    this.setState({ pollId: this.props.pollId });
  }

  handleSubmit = () => {
    this.state.choices.map(choice => {
      this.props.createChoice(this.state.pollId, choice);
    });
  };

  handleChoiceSubmit = () => {
    this.setState({
      choices: [...this.state.choices, { text: this.state.currentChoice }]
    });
    this.setState({ currentChoice: '' });
  };

  render() {
    console.log(this.state.choices);
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
          <Text>{this.state.text}</Text>
          {this.state.choices.map(choice => (
            <Text>{choice.text}</Text>
          ))}
          <TextInput
            style={styles.input}
            placeholder="Add a choice"
            onChangeText={currentChoice => this.setState({ currentChoice })}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#8EB51A',
              padding: 10,
              margin: 10,
              width: 300
            }}
            onPress={this.handleChoiceSubmit}
          >
            <Text style={styles.createButtonText}>Add Choice</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#8EB51A',
              padding: 10,
              margin: 10,
              width: 300
            }}
            onPress={this.handleSubmit}
          >
            <Text style={styles.createButtonText}>Submit</Text>
          </TouchableOpacity>
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

const mapDispatchToProps = dispatch => {
  return {
    createChoice: (pollId, choice) =>
      dispatch(createChoiceThunk(pollId, choice))
  };
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateChoices);
