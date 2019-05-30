const tempPoll = [
  { id: 1, title: "What's for dinner?", ownerId: 2 },
  { id: 2, title: 'What movie should we watch?', ownerId: 3 }
];

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { fetchUsers } from './store';

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
  }
});

class AllPolls extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>View Poll</Text>
        {tempPoll.map(poll => (
          <TouchableOpacity
            key={poll.id}
            style={styles.poll}
            title={poll.title}
            onPress={() =>
              this.props.navigation.navigate('Poll', {
                question: poll.title
              })
            }
          >
            <Text style={styles.buttonText}>{poll.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  };
};

const mapStateToProps = ({ users }) => {
  return {
    users
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPolls);
