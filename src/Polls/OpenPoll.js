import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchChoices,
  fetchVotes,
  changeVoteThunk,
  updatePollStatusThunk
} from '../store/polls';
import { findChoiceText } from '../HelperFunctions';
import PureChart from 'react-native-pure-chart';

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
    fontSize: 24,
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

class SinglePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      pollId: ''
    };
  }
  componentDidMount() {
    this.props.fetchChoices(this.state.pollId);
    this.props.fetchVotes(this.state.pollId);
    this.setState({ userId: this.props.user.id, pollId: this.props.pollId });
  }

  handleDelete = () => {
    this.props.changeVote(this.state.pollId, this.state.userId);
  };

  handleClose = () => {
    this.props.closePoll(this.state.pollId, { status: 'closed' });
  };

  render() {
    const { choices, votes } = this.props;

    const votesObj =
      votes.length &&
      votes.reduce((acc, item) => {
        if (!acc[item.choiceId]) {
          acc[item.choiceId] = 1;
        } else {
          acc[item.choiceId]++;
        }
        return acc;
      }, {});

    const keys = Object.keys(votesObj);

    const votesData =
      keys.length &&
      keys.reduce((acc, item) => {
        const label = choices.length && findChoiceText(item, choices);
        const obj = {};
        obj.value = votesObj[item];
        obj.label = label;
        acc.push(obj);
        return acc;
      }, []);

    // const question = this.props.navigation.getParam('question', 'no question');

    return (
      <View style={styles.container}>
        {/* <Text style={styles.header}>{question}</Text> */}
        {votesData.length && <PureChart data={votesData} type="pie" />}

        <TouchableOpacity
          style={{
            backgroundColor: '#8EB51A',
            padding: 10,
            margin: 10,
            width: 300
          }}
          onPress={this.handleDelete}
        >
          <Text style={styles.buttonText}>Change Vote</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#FF0000',
            padding: 10,
            margin: 10,
            width: 300
          }}
          onPress={this.handleClose}
        >
          <Text style={styles.buttonText}>Close Poll</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchChoices: id => dispatch(fetchChoices(id)),
    fetchVotes: id => dispatch(fetchVotes(id)),
    changeVote: (pollId, voteId) => dispatch(changeVoteThunk(pollId, voteId)),
    closePoll: (pollId, status) =>
      dispatch(updatePollStatusThunk(pollId, status))
  };
};

const mapStateToProps = ({ user, choices, votes }) => {
  return {
    user,
    choices,
    votes
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePoll);
