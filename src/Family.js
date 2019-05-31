import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { fetchUsers, fetchUser, fetchRelated } from "./store";
import { connect } from "react-redux";

class Family extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.load();
    // console.log('users in Family CDM', this.state.users);
  }

  load = () => {
    const id = "b40453fe-171e-4eee-8ea2-2efb93e70ad2";
    this.props.fetchUsers();
    this.props.fetchUser(id);
  };

  findFamily = user => {
    return this.props.users.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };

  keyExtractor = (item, index) => index.toString();

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

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.itemInvisible]} />;
    }
    return (
      <Avatar
        keyExtractor={this.keyExtractor}
        rounded
        overlayContainerStyle={styles.avatar}
        size={125}
        title={item.firstName}
        source={{
          uri: item.imgUrl
        }}
        onPress={() =>
          this.props.navigation.navigate("User", {
            firstName: item.firstName,
            imgUrl: item.imgUrl
          })
        }
      />
    );
  };

  render() {
    if (this.props.user.id && this.props.users.length) {
      const user = this.props.user;
      const family = this.findFamily(user);

      const numColumns = 3;

      return (
        <View style={styles.container}>
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
                this.props.navigation.navigate("User", {
                  firstName: user.firstName,
                  imgUrl: user.imgUrl
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
    // marginTop: 250
  },
  avatar: {
    borderWidth: 1,
    margin: 10
  },

  itemInvisible: {
    backgroundColor: "transparent"
  }
});

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
