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
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  }
});

class ClosedPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      pollId: '',
      status: ''
    };
  }
  componentDidMount() {
    this.props.fetchChoices(this.state.pollId);
    this.props.fetchVotes(this.state.pollId);
    this.setState({
      userId: this.props.user.id,
      pollId: this.props.pollId,
      status: this.props.status
    });
  }

  handleDelete = () => {
    this.props.changeVote(this.state.pollId, this.state.userId);
  };

  handleStatus = () => {
    if (this.state.status === 'closed') {
      this.props.changeStatus(this.state.pollId, { status: 'open' });
      this.setState({ status: 'open' });
    } else {
      this.props.changeStatus(this.state.pollId, { status: 'closed' });
      this.setState({ status: 'closed' });
    }
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

        {this.state.status === 'open' ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#7DC6CD',
              padding: 10,
              margin: 10,
              width: 300
            }}
            onPress={this.handleDelete}
          >
            <Text style={styles.buttonText}>Change Vote</Text>
          </TouchableOpacity>
        ) : null}

        {this.state.status === 'closed' ? (
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
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchChoices: id => dispatch(fetchChoices(id)),
    fetchVotes: id => dispatch(fetchVotes(id)),
    changeVote: (pollId, voteId) => dispatch(changeVoteThunk(pollId, voteId)),
    changeStatus: (pollId, status) =>
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
)(ClosedPoll);
