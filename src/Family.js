import React, { Component } from "react";
import { View, Text } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { fetchUsers, fetchUser, fetchRelated } from "./store/users";
import { getActiveMood } from "./store/mood";
import { connect } from "react-redux";
import ActionButton from "react-native-circular-action-menu";
import { findMoodColor, findMoodText } from "./HelperFunctions";

class Family extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (this.props.related.length !== prevProps.related.length) {
      this.load();
    }
  }

  load = () => {
    // HARD CODING USER ID HERE!!
    this.props.fetchUsers();
    this.props.getActiveMood(this.props.user.id);
  };

  findFamily = user => {
    return this.props.users.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };

  render() {
    const user = this.props.user;
    const family = this.findFamily(user);
    const mood = this.props.mood;

    if (family.length && mood.id) {
      const moodColor = findMoodColor(mood.value);
      const moodText = findMoodText(mood.value);
      return (
        <View
          style={{
            flex: 0.9,
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingEnd: 25,
              marginBottom: 25
            }}
          >
            <ActionButton
              active={true}
              degrees={0}
              radius={145}
              outRangeScale={1}
              onLongPress={() =>
                this.props.navigation.navigate("AvatarGenerator", {
                  user: user,
                  buttonSet: "UserButtons",
                  mood: mood
                })
              }
              icon={
                <View>
                  <Avatar
                    rounded
                    overlayContainerStyle={{
                      borderWidth: 5,
                      borderColor: moodColor
                    }}
                    size={120}
                    source={{
                      uri: `${user.imgUrl}`
                    }}
                    title={user.firstName}
                  />
                  <Badge
                    containerStyle={{
                      position: "relative",
                      top: -18
                    }}
                    badgeStyle={{
                      backgroundColor: moodColor,
                      paddingHorizontal: 10,
                      borderColor: "transparent"
                    }}
                    value={
                      <Text style={{ fontSize: 12, color: "white" }}>
                        {`${moodText}`} mood
                      </Text>
                    }
                  />
                </View>
              }
            >
              {family.map(person => {
                //temp hardcoding values here
                const personMoodColor = findMoodColor(0.5);
                const personMoodText = findMoodText(0.5);
                return (
                  <ActionButton.Item key={person.id}>
                    <View>
                      <Avatar
                        rounded
                        overlayContainerStyle={{
                          borderWidth: 5,
                          borderColor: personMoodColor
                        }}
                        size={110}
                        source={{
                          uri: `${person.imgUrl}`
                        }}
                        title={person.firstName}
                        onPress={() =>
                          this.props.navigation.navigate("AvatarGenerator", {
                            user: person,
                            buttonSet:
                              person.age > 18
                                ? "RelativeButtons"
                                : "ChildButtons",
                            mood: { value: 0.5 }
                          })
                        }
                      />
                      <Badge
                        containerStyle={{
                          position: "relative",
                          top: -18
                        }}
                        badgeStyle={{
                          backgroundColor: personMoodColor,
                          paddingHorizontal: 10,
                          borderColor: "transparent"
                        }}
                        value={
                          <Text style={{ fontSize: 12, color: "white" }}>
                            {`${personMoodText}`} mood
                          </Text>
                        }
                      />
                    </View>
                  </ActionButton.Item>
                );
              })}
            </ActionButton>
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
    fetchRelated: id => dispatch(fetchRelated(id)),
    getActiveMood: id => dispatch(getActiveMood(id))
  };
};

const mapStateToProps = ({ mood, users, user, related }) => {
  return {
    users,
    user,
    related,
    mood
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
