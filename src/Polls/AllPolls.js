import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { fetchUsers } from '../store/users';
import { fetchPolls } from '../store/polls';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    padding: 10,
    margin: 10,
    fontSize: 50
  },
  poll: {
    backgroundColor: '#D3D3D4',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    width: 300
  },
  createButtonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  }
});

class AllPolls extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchPolls(this.props.user.familyId);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.props) {
      this.props.fetchPolls(this.props.user.familyId);
    }
  }

  render() {
    const { polls } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your Polls</Text>
        {polls.map(poll => (
          <TouchableOpacity
            key={poll.id}
            style={styles.poll}
            text={poll.text}
            onPress={() =>
              this.props.navigation.navigate('Poll', {
                poll: poll,
                id: poll.id,
                question: poll.text
              })
            }
          >
            <Text style={styles.buttonText}>{poll.text}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={{
            backgroundColor: '#8EB51A',
            padding: 10,
            margin: 10,
            width: 300
          }}
          onPress={() => this.props.navigation.navigate('CreatePoll')}
        >
          <Text style={styles.createButtonText}>Create New Poll</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchPolls: id => dispatch(fetchPolls(id))
  };
};

const mapStateToProps = ({ user, users, polls }) => {
  return {
    user,
    users,
    polls
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPolls);
