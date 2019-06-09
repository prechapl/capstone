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

import { createPollThunk, createChoiceThunk } from '../store/polls';

class CreatePoll extends Component {
  constructor() {
    super();

    this.state = {
      pollId: '',
      text: '',
      ownerId: ''
    };
  }

  componenDidMount() {
    const user = this.props.user.id;
  }

  handleSubmit = () => {
    this.props
      .createPoll({
        text: this.state.text,
        ownerId: this.props.user.id,
        familyId: this.props.user.familyId
      })
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
    createPoll: poll => dispatch(createPollThunk(poll)),
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
)(CreatePoll);
