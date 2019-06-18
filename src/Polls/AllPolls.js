import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/users';
import { fetchPolls } from '../store/polls';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60
  },
  header: {
    padding: 10,
    fontSize: 32,
    textAlign: 'center'
  },
  subheader: {
    padding: 10,
    fontSize: 24,
    textAlign: 'center'
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
  },
  pollContainer: {
    maxHeight: 300,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class AllPolls extends Component {
  constructor() {
    super();
    this.state = {
      status: 'open'
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchPolls(this.props.user.familyId);
  }

  changeViewStatus = () => {
    this.state.status === 'open'
      ? this.setState({ status: 'closed' })
      : this.setState({ status: 'open' });
  };

  componentDidUpdate(prevProps) {
    if (this.props.openPolls.length !== prevProps.openPolls.length) {
      this.props.fetchPolls(this.props.user.familyId);
    }
  }

  render() {
    const { openPolls, closedPolls } = this.props;
    const currentPolls = this.state.status === 'open' ? openPolls : closedPolls;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.state.status === 'open' ? 'Open' : 'Closed'} Polls
        </Text>
        <ScrollView styles={styles.pollContainer}>
          <Text style={styles.subheader}>Your Polls</Text>
          {currentPolls.map(
            poll =>
              poll.ownerId === this.props.user.id && (
                <TouchableOpacity
                  key={poll.id}
                  style={styles.poll}
                  text={poll.text}
                  onPress={() =>
                    this.props.navigation.navigate('Poll', {
                      id: poll.id,
                      question: poll.text
                    })
                  }
                >
                  <Text style={styles.buttonText}>{poll.text}</Text>
                </TouchableOpacity>
              )
          )}

          <Text style={styles.subheader}>Family Polls</Text>
          {currentPolls.map(
            poll =>
              poll.ownerId !== this.props.user.id && (
                <TouchableOpacity
                  key={poll.id}
                  style={styles.poll}
                  text={poll.text}
                  onPress={() =>
                    this.props.navigation.navigate('Poll', {
                      id: poll.id,
                      question: poll.text
                    })
                  }
                >
                  <Text style={styles.buttonText}>{poll.text}</Text>
                </TouchableOpacity>
              )
          )}
        </ScrollView>
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

        <TouchableOpacity
          style={{
            backgroundColor: '#7DC6CD',
            padding: 10,
            margin: 10,
            width: 300
          }}
          onPress={() => this.changeViewStatus()}
        >
          <Text style={styles.createButtonText}>
            View {this.state.status === 'open' ? 'Closed' : 'Open'} Polls
          </Text>
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
    openPolls: polls.filter(poll => poll.status === 'open'),
    closedPolls: polls.filter(poll => poll.status === 'closed')
  };
};
export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllPolls)
);
