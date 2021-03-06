import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons';
import { connect } from 'react-redux';
import { castVoteThunk, deletePollThunk } from '../store/polls';
import SocketIoClient from 'socket.io-client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    padding: 10,
    margin: 10,
    fontSize: 18,
    width: 400,
    textAlign: 'center'
  },
  selected: {
    backgroundColor: '#D3D3D4',
    textAlign: 'center',
    padding: 10,
    width: 300,
    borderWidth: 1
  },
  unselected: {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 10,
    width: 300,
    borderWidth: 1
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  }
});

class VotePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      choiceId: '',
      selectedOption: '',
      pollId: '',
      familyId: ''
    };
    this.socket = SocketIoClient('https://capstone-api-server.herokuapp.com');
  }
  componentDidMount() {
    this.setState({
      userId: this.props.user.id,
      pollId: this.props.pollId,
      familyId: this.props.user.familyId
    });
  }

  handleSubmit = () => {
    this.props.castVote(this.props.pollId, this.state);
    this.socket.emit('new_vote');
  };

  handleDelete = () => {
    this.props.deletePoll(this.state.pollId, this.state.familyId);
    this.props.navigation.pop();
  };

  render() {
    const { choices } = this.props;

    const options = choices.reduce((acc, item) => {
      acc.push(item.text);
      return acc;
    }, []);

    const setSelectedOption = selectedOption => {
      const selected = choices.filter(choice => choice.text === selectedOption);
      this.setState({
        selectedOption,
        choiceId: selected[0].id
      });
    };

    const renderOption = (option, selected, onSelect, index) => {
      const selectedStyle = styles.selected;
      const unselectedStyle = styles.unselected;
      const style = selected ? selectedStyle : unselectedStyle;

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      );
    };

    function renderContainer(optionNodes) {
      return <View>{optionNodes}</View>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.question}</Text>

        <RadioButtons
          options={options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={renderContainer}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#8EB51A',
            padding: 10,
            margin: 10,
            width: 300,
            borderRadius: 50
          }}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {this.props.user.id === this.props.poll.ownerId && (
          <TouchableOpacity
            style={{
              backgroundColor: '#FF0000',
              padding: 10,
              margin: 10,
              width: 300,
              borderRadius: 50
            }}
            onPress={this.handleDelete}
          >
            <Text style={styles.buttonText}>Delete Poll</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    castVote: (id, vote) => dispatch(castVoteThunk(id, vote)),
    deletePoll: (id, familyId) => dispatch(deletePollThunk(id, familyId))
  };
};

const mapStateToProps = ({ user, choices }) => {
  return {
    user,
    choices
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VotePoll);
