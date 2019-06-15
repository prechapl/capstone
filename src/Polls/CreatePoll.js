import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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
  };

  handleSubmitChoices = () => {
    this.state.choices.map(choice => {
      this.props.createChoice(
        this.state.pollId,
        {
          pollId: this.state.pollId,
          text: choice.text
        },
        this.props.user.familyId
      );
    });
    this.props.navigation.pop();
  };

  handleClearChoices = () => {
    this.setState({ choices: [] });
  };

  render() {
    if (!this.state.submitted) {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.subheader}>Poll Question</Text>
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
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <View style={styles.container}>
              <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.subheader}>{this.state.text}</Text>
                {this.state.choices.map(choice => (
                  <View key={choice.text} style={styles.choiceContainer}>
                    <Text style={styles.choiceText}>{choice.text}</Text>
                  </View>
                ))}
                <TextInput
                  style={styles.input}
                  placeholder="Add a choice"
                  onChangeText={currentChoice =>
                    this.setState({ currentChoice })
                  }
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: '#7DC6CD',
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
                    backgroundColor: '#FF0000',
                    padding: 10,
                    margin: 10,
                    width: 300
                  }}
                  onPress={this.handleClearChoices}
                >
                  <Text style={styles.buttonText}>Clear Choices</Text>
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
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
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
    color: '#000000',
    width: 300,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5
  }
});

const mapDispatchToProps = dispatch => {
  return {
    createPoll: poll => dispatch(createPollThunk(poll)),
    createChoice: (pollId, choice, familyId) =>
      dispatch(createChoiceThunk(pollId, choice, familyId))
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
