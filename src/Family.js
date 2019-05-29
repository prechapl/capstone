import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { fetchUsers } from './store';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    borderWidth: 1
  }
});

class Family extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.load();
    console.log('users in Family CDM', this.props.users);
  }

  load = () => {
    this.props.fetchUsers().then(() => {
      this.setState({ users: this.props.users });
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.users !== prevProps.users) {
      this.setState({ users: this.props.users });
      console.log('users in Family CDU', this.props.users);
    }
    console.log('update ran');
  }

  render() {
    if (this.state.users) {
      return (
        <View style={styles.container}>
          {this.state.users.map(usr => (
            <Avatar
              key={usr.id}
              rounded
              overlayContainerStyle={styles.avatar}
              size={120}
              title={usr.firstName}
              source={{
                uri: usr.imgUrl
              }}
              onPress={() =>
                this.props.navigation.navigate('User', {
                  firstName: usr.firstName,
                  imgUrl: usr.imgUrl
                })
              }
            />
          ))}
        </View>
      );
    } else {
      return null;
    }
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
)(Family);
