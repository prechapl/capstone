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
      submitted: false,
      choices: [],
      currentChoice: ''
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
      .then(({ poll }) => this.setState({ pollId: poll.id }))
      .then(() => this.setState({ submitted: true }));
  };

  handleAddChoice = () => {
    this.setState({
      choices: [...this.state.choices, { text: this.state.currentChoice }]
    });
    this.setState({ currentChoice: '' });
  };

  handleSubmitChoices = () => {
    this.state.choices.map(choice => {
      this.props.createChoice(this.state.pollId, {
        pollId: this.state.pollId,
        text: choice.text
      });
    });
    this.props.navigation.navigate('Polls');
  };

  render() {
    if (!this.state.submitted) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.subheader}>Add your question</Text>
            <TextInput
              style={styles.input}
              placeholder="Question"
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
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.subheader}>{this.state.text}</Text>
            {this.state.choices.map(choice => (
              <View key={choice.text} style={styles.choiceContainer}>
                <Text style={styles.choiceText}>{choice.text}</Text>
              </View>
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
              onPress={this.handleAddChoice}
            >
              <Text style={styles.buttonText}>Add Choice</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#8EB51A',
                padding: 10,
                margin: 10,
                width: 300
              }}
              onPress={this.handleSubmitChoices}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
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
  },
  subheader: {
    padding: 10,
    marginBottom: 30,
    fontSize: 45
  },
  choiceText: {
    height: 40,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    color: '#000000',
    width: 300,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000000'
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
