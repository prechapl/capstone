import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import { fetchUser, fetchRelated } from "./store";
import { connect } from "react-redux";

class Family extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      related: []
    };
  }
  componentDidMount() {
    this.load();
    console.log("user in Family CDM", this.state.user);
  }

  load = () => {
    const id = "feb104b5-bdc0-48eb-9998-9d8794f02b3e";
    this.props
      .fetchUser(id)
      .then(() => {
        this.props.fetchRelated(id);
      })
      .then(() => {
        this.setState({ user: this.props.user, related: this.props.related });
      });
  };

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ user: this.props.user, related: this.props.related });
      // console.log('users in Family CDU', this.props.users);
    }
    console.log("CDU in family ran");
  }

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
          this.props.navigation.navigate("User", {
            firstName: item.firstName,
            imgUrl: item.imgUrl
          })
        }
      />
    );
  };

  render() {
    if (this.state.user) {
      const user = this.state.user;
      const related = this.state.related;
      console.log("user in Family render", user);
      console.log("related in Family render", related);

      return (
        <View style={styles.container}>
          <View style={styles.col} />
          {/* {this.renderItem(related[0])} */}
          <View style={styles.col}>
            {/* <View style={styles.fitButton}>{this.renderItem(related[1])}</View> */}
            <Avatar
              rounded
              overlayContainerStyle={styles.avatar}
              size={150}
              source={{
                uri: `${user.url}`
              }}
              // title={user.firstName.slice(0, 1)}
            />
            {/* {this.renderItem(related[2])} */}
          </View>
          {/* {this.renderItem(related[3])} */}
          <View style={styles.col} />
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
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250
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
    fetchUser: id => dispatch(fetchUser(id)),
    fetchRelated: () => dispatch(fetchRelated())
  };
};

const mapStateToProps = ({ user, related }) => {
  return {
    user,
    related
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
