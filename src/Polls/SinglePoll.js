import React from 'react';
import { connect } from 'react-redux';
import { fetchChoices, fetchVotes, fetchPoll } from '../store/polls';
import VotedPoll from './VotedPoll';
import VotePoll from './VotePoll';
import SocketIoClient from 'socket.io-client';

class SinglePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollId: props.navigation.getParam('id'),
    };
  }
  componentDidMount() {
    this.props.fetchChoices(this.state.pollId);
    this.props.fetchVotes(this.state.pollId);
    this.props.fetchPoll(this.state.pollId);
    const socket = SocketIoClient('https://capstone-api-server.herokuapp.com', {
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      console.log('CONNECTED!');
      socket.on('new_vote', () => {
        this.props.fetchVotes(this.state.pollId);
      });
    });
  }

  render() {
    const { votes, user, poll } = this.props;
    const usersWithVotes = votes.reduce((acc, vote) => {
      acc.push(vote.userId);
      return acc;
    }, []);

    if (usersWithVotes.includes(user.id) || poll.status === 'closed') {
      return (
        <VotedPoll
          pollId={this.state.pollId}
          status={poll.status === 'open' ? 'open' : 'closed'}
          question={poll.text}
          poll={poll}
          navigation={this.props.navigation}
        />
      );
    } else {
      return (
        <VotePoll
          pollId={this.state.pollId}
          question={poll.text}
          poll={poll}
          navigation={this.props.navigation}
        />
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchChoices: id => dispatch(fetchChoices(id)),
    fetchVotes: id => dispatch(fetchVotes(id)),
    fetchPoll: id => dispatch(fetchPoll(id)),
  };
};

const mapStateToProps = ({ user, choices, votes, poll }) => {
  return {
    user,
    choices,
    votes,
    poll,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePoll);
