import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { fetchUser, fetchUsers, fetchRelated } from './store';
import { connect } from 'react-redux';

class Family extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      user: {}
    };
  }
  componentDidMount() {
    // this.load();
    // this.loadUser();
    this.loadUsers();
    // this.loadRelated();
    // console.log('user in Family CDM', this.state.user);
  }

  // load = () => {
  //   const tempUserId = 'feb104b5-bdc0-48eb-9998-9d8794f02b3e';

  //   this.props
  //     .fetchUsers()
  //     .then(() => {
  //       this.props.fetchUser(tempUserId);
  //     })
  //     .then(() => {
  //       this.props.fetchRelated(tempUserId);
  //     })
  //     .then(() => {
  //       this.setState({
  //         user: this.props.user,
  //         related: this.props.related,
  //         users: this.props.users
  //       });
  //     });
  // };

  // loadUser = () => {
  //   const tempUserId = 'feb104b5-bdc0-48eb-9998-9d8794f02b3e';
  //   this.props.fetchUser(tempUserId).then(() => {
  //     this.setState({ user: this.props.user });
  //   });
  // };
  loadUsers = () => {
    this.props.fetchUsers().then(() => {
      this.setState({ users: this.props.users });
    });
  };
  // loadRelated = () => {
  //   const tempUserId = 'feb104b5-bdc0-48eb-9998-9d8794f02b3e';
  //   this.props.fetchRelated(tempUserId).then(() => {
  //     this.setState({ related: this.props.related });
  //   });
  // };

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({
        users: this.props.users,
        user: this.props.user
      });
    }
    console.log('CDU in family ran');
  }

  // findUser = id => {
  //   return this.props.users.find(id);
  // };

  renderItem = ({ item }) => {
    return (
      <Avatar
        rounded
        overlayContainerStyle={styles.avatar}
        size={125}
        title={item.firstName}
        source={{
          uri: item.imgUrl
        }}
        onPress={() =>
          this.props.navigation.navigate('User', {
            firstName: item.firstName,
            imgUrl: item.imgUrl
          })
        }
      />
    );
  };

  render() {
    if (this.state.users) {
      const users = this.state.users;
      // const user = this.state.user;
      // const related = this.state.related;
      // console.log('user in Family render', user);
      console.log('users in Family render', users);
      // console.log('related in Family render', related);
      // const usersFamily = related.map(rel => this.findUser(rel.RelationshipId));
      // console.log('usersFamily', usersFamily);

      return (
        <View style={styles.container}>
          {/* <View style={styles.col} />
          {this.renderItem(related[0])}
          <View style={styles.col}>
            <View>{this.renderItem(related[1])}</View>
            <Avatar
              rounded
              overlayContainerStyle={styles.avatar}
              size={150}
              source={{
                uri: `${user.url}`
              }}
              title={user.firstName.slice(0, 1)}
            />
            {this.renderItem(related[2])}
          </View>
          {this.renderItem(related[2])}
          <View style={styles.col} /> */}
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250
  },
  avatar: {
    borderWidth: 1,
    margin: 10
  },
  col: {
    flex: 1,
    flexDirection: 'column'
  },
  itemInvisible: {
    backgroundColor: 'transparent'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
    // fetchUser: id => dispatch(fetchUser(id)),
    // fetchRelated: id => dispatch(fetchRelated(id))
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
