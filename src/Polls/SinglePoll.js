import React from 'react';
import { connect } from 'react-redux';
import { fetchChoices, fetchVotes } from '../store/polls';
import VotedPoll from './VotedPoll';
import VotePoll from './VotePoll';

class SinglePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollId: props.navigation.getParam('id')
    };
  }
  componentDidMount() {
    this.props.fetchChoices(this.state.pollId);
    this.props.fetchVotes(this.state.pollId);
  }

  render() {
    const { votes, user } = this.props;

    const poll = this.props.navigation.getParam('poll');
    const question = this.props.navigation.getParam('question');

    const usersWithVotes = votes.reduce((acc, vote) => {
      acc.push(vote.userId);
      return acc;
    }, []);

    if (usersWithVotes.includes(user.id) || poll.status === 'closed') {
      return (
        <VotedPoll
          pollId={this.state.pollId}
          question={question}
          status={poll.status === 'open' ? 'open' : 'closed'}
        />
      );
    } else {
      return <VotePoll pollId={this.state.pollId} question={question} />;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchChoices: id => dispatch(fetchChoices(id)),
    fetchVotes: id => dispatch(fetchVotes(id))
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
