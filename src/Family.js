import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { Avatar } from "react-native-elements";
import { fetchUsers, fetchUser, fetchRelated } from "./store";
import { connect } from "react-redux";

class Family extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    // HARD CODING USER ID HERE!!
    const id = '587f40ad-3cbb-42e6-8d0e-752bf14bb759';
    this.props.fetchUsers();
    this.props.fetchUser(id);
  };

  findFamily = user => {
    return this.props.users.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };

  // begin >> create family grid layout <<

  formatGrid = (data, numColumns) => {
    const numFullRows = Math.floor(data.length / numColumns);
    let numElementsLastRow = data.length - numFullRows * numColumns;
    while (numElementsLastRow !== numColumns && numElementsLastRow !== 0) {
      // while (numElementsLastRow !== numColumns) {
      data.push({ key: `blank-${numElementsLastRow}`, empty: true });
      numElementsLastRow = numElementsLastRow + 1;
    }
    return data;
  };

  keyExtractor = index => index.toString();

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return (
        <View
          style={{
            backgroundColor: "transparent"
          }}
        />
      );
    }
    if (item.age > 18) {
      return (
        <Avatar
          keyExtractor={this.keyExtractor}
          rounded
          overlayContainerStyle={{
            borderWidth: 1,
            margin: 10
          }}
          size={125}
          title={item.firstName}
          source={{
            uri: item.imgUrl
          }}
          onPress={() =>
            this.props.navigation.navigate('User', {
              user: item
            })
          }
        />
      );
    } else {
      return (
        <Avatar
          keyExtractor={this.keyExtractor}
          rounded
          overlayContainerStyle={{
            borderWidth: 1,
            margin: 10
          }}
          size={125}
          title={item.firstName}
          source={{
            uri: item.imgUrl
          }}
          onPress={() =>
            this.props.navigation.navigate('AvatarChild', {
              user: item
            })
          }
        />
      );
    }
  };

  // end >> create family grid layout <<

  render() {
    const user = this.props.user;
    const family = this.findFamily(user);
    const numColumns = 3;

    if (this.props.user.id && this.props.users.length) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Avatar
              rounded
              overlayContainerStyle={{ borderWidth: 1 }}
              size={150}
              title={user.firstName}
              source={{
                uri: user.imgUrl
              }}
              onPress={() =>
                this.props.navigation.navigate('User', {
                  user: user
                })
              }
            />
          </View>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <FlatList
              data={this.formatGrid(family, numColumns)}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUser: id => dispatch(fetchUser(id)),
    fetchRelated: id => dispatch(fetchRelated(id))
  };
};

const mapStateToProps = ({ users, user, related }) => {
  return {
    users,
    user,
    related
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
