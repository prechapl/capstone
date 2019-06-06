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

import { createPollThunk, createChoiceThunk } from './store/polls';

class CreatePoll extends Component {
  constructor() {
    super();

    this.state = {
      pollId: '',
      text: '',
      ownerId: '47713ff6-3ac6-4631-92ed-532828dcfef4'
    };
  }

  handleSubmit = () => {
    this.props
      .createPoll('7ae98093-504d-4137-9acd-81d976990b42', this.state)
      .then(({ poll }) => this.setState({ pollId: poll.id }));
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="What is your question?"
            onChangeText={text => this.setState({ text })}
          />

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
    createPoll: (userId, poll) => dispatch(createPollThunk(userId, poll)),
    createChoice: (pollId, choice) =>
      dispatch(createChoiceThunk(pollId, choice))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePoll);
