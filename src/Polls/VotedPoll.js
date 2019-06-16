import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  deletePollThunk,
  changeVoteThunk,
  updatePollStatusThunk,
  fetchPoll
} from '../store/polls';
import { findChoiceText } from '../HelperFunctions';
import PureChart from 'react-native-pure-chart';
import axios from 'axios';

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
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  }
});

class VotedPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      pollId: '',
      familyId: ''
    };
  }
  componentDidMount() {
    this.props.fetchPoll(this.props.pollId);
    this.setState({
      userId: this.props.user.id,
      pollId: this.props.pollId,
      familyId: this.props.user.familyId
    });
  }

  changeVote = () => {
    this.props.changeVote(this.state.pollId, this.state.userId);
  };

  handleDelete = () => {
    this.props.deletePoll(this.state.pollId, this.state.familyId);
    this.props.navigation.pop();
  };

  handleStatus = () => {
    if (this.props.poll.status === 'closed') {
      this.props.changeStatus(
        this.state.pollId,
        { status: 'open' },
        this.state.familyId
      );
      this.props.family.forEach(user => {
        axios.post('https://capstone-api-server.herokuapp.com/api/alerts/', {
          alertType: 'poll',
          message: `${this.props.user.firstName} has re-opened voting for '${
            this.props.question
            }'. Go Vote!`,
          targetId: this.state.pollId,
          userId: user.id
        });
      });
    } else {
      this.props.changeStatus(
        this.state.pollId,
        { status: 'closed' },
        this.state.familyId
      );
      this.setState({ status: 'closed' });
      this.props.family.forEach(user => {
        axios.post('https://capstone-api-server.herokuapp.com/api/alerts/', {
          alertType: 'poll',
          message: `${this.props.user.firstName} has closed voting for '${
            this.props.question
            }'. Go check out the winner!`,
          targetId: this.state.pollId,
          userId: user.id
        });
      });
    }
    this.props.navigation.pop();
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
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.question}</Text>
        {votesData.length && <PureChart data={votesData} type="pie" />}

        {this.props.poll.status === 'open' ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#7DC6CD',
              padding: 10,
              margin: 10,
              width: 300
            }}
            onPress={this.changeVote}
          >
            <Text style={styles.buttonText}>Change Vote</Text>
          </TouchableOpacity>
        ) : null}
        {this.props.user.id === this.props.poll.ownerId ? (
          this.props.poll.status === 'closed' ? (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#8EB51A',
                  padding: 10,
                  margin: 10,
                  width: 300
                }}
                onPress={this.handleStatus}
              >
                <Text style={styles.buttonText}>Open Poll</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#FF0000',
                  padding: 10,
                  margin: 10,
                  width: 300
                }}
                onPress={this.handleDelete}
              >
                <Text style={styles.buttonText}>Delete Poll</Text>
              </TouchableOpacity>
            </View>
          ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF0000',
                  padding: 10,
                  margin: 10,
                  width: 300
                }}
                onPress={this.handleStatus}
              >
                <Text style={styles.buttonText}>Close Poll</Text>
              </TouchableOpacity>
            )
        ) : null}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePoll: (id, familyId) => dispatch(deletePollThunk(id, familyId)),
    changeVote: (pollId, voteId) => dispatch(changeVoteThunk(pollId, voteId)),
    changeStatus: (pollId, status, familyId) =>
      dispatch(updatePollStatusThunk(pollId, status, familyId)),
    fetchPoll: pollId => dispatch(fetchPoll(pollId))
  };
};

const mapStateToProps = ({ user, choices, votes, moods, poll }) => {
  return {
    user,
    choices,
    votes,
    family: moods,
    poll
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VotedPoll);
