import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { fetchUsers, fetchUserPolls } from './store/users';

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
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  }
});

class AllPolls extends Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchUserPolls('5a6b80e9-f20d-450b-905d-bc14c8149bd2');
  }

  render() {
    const { userPolls } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>View Poll</Text>
        {userPolls.map(poll => (
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
        ))}

        <TouchableOpacity
          style={{
            backgroundColor: '#7DC6CD',
            padding: 10,
            margin: 10,
            width: 300
          }}
          onPress={() => this.props.navigation.navigate('CreatePoll')}
        >
          {' '}
          <Text style={styles.buttonText}>CreatePoll</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUserPolls: id => dispatch(fetchUserPolls(id))
  };
};

const mapStateToProps = ({ users, userPolls }) => {
  return {
    users,
    userPolls
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPolls);
