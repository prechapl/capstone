import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { fetchUsers } from './store';
import { connect } from 'react-redux';

class Family extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.load();
    console.log('users in Family CDM', this.state.users);
  }

  load = () => {
    this.props.fetchUsers().then(() => {
      this.setState({ users: this.props.users });
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.users !== prevProps.users) {
      this.setState({ users: this.props.users });
      // console.log('users in Family CDU', this.props.users);
    }
    console.log('update ran');
  }

  keyExtractor = (item, index) => index.toString();

  formatGrid = (data, numColumns) => {
    const numFullRows = Math.floor(data.length / numColumns);
    let numElementsLastRow = data.length - numFullRows * numColumns;
    // while (numElementsLastRow !== numColumns && numElementsLastRow !== 0) {
    while (numElementsLastRow !== numColumns) {
      data.push({ key: `blank-${numElementsLastRow}`, empty: true });
      numElementsLastRow = numElementsLastRow + 1;
    }
    return data;
  };

  renderItem = ({ item }) => {
    // if (item.empty === true) {
    //   return <View style={[styles.itemInvisible]} />;
    // }
    return (
      <Avatar
        // style={styles.signedInUser}
        keyExtractor={this.keyExtractor}
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
      const user = this.state.users[0];
      const family = this.state.users.slice(1, 4);
      console.log('users in Family render', this.state.users[0]);
      // const userArr = users.slice(0, 1);
      // const familyMembers = users.slice(1, 4);
      const numColumns = 3;
      return (
        <View style={styles.container}>
          <FlatList
            data={this.formatGrid(this.state.users, numColumns)}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            numColumns={numColumns}
          />
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
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250
  },
  avatar: {
    borderWidth: 1,
    margin: 10
  },

  itemInvisible: {
    backgroundColor: 'transparent'
  }
});

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
