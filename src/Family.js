import React, { Component } from "react";
import { View, Text } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { fetchUsers, fetchUser, fetchRelated } from "./store/users";
import { getActiveMood, getMoodById } from "./store/mood";
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
    const id = "bd941ccf-155d-4186-b4d2-4949180b859f";
    this.props.fetchUsers();
    this.props.fetchUser(id);
    this.props.getActiveMood(id);
    // console.log("findMoodText", findMoodText(id));
  };

  findFamily = user => {
    return this.props.users.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };

  render() {
    const user = this.props.user;
    const family = this.findFamily(user);
    const { mood } = this.props;
    // console.log("mood", mood);
    if (family.length && mood.id) {
      const moodColor = findMoodColor(this.props.mood.value);
      const moodText = findMoodText(this.props.mood.value);
      console.log(moodText);
      return (
        <View
          style={{
            flex: 0.9,
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingEnd: 25
            }}
          >
            <ActionButton
              active={true}
              degrees={0}
              radius={130}
              outRangeScale={0.65}
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
                      borderWidth: 18,
                      borderColor: moodColor
                    }}
                    size={175}
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
                      backgroundColor: moodColor
                    }}
                    value={
                      <Text
                        style={{ fontSize: 12, color: "white" }}
                      >{`${moodText}`}</Text>
                    }
                  />
                </View>
              }
            >
              {family.map(person => {
                const personMood = getMoodById(person.id);
                console.log("personMood", personMood);
                const personMoodColor = findMoodColor(personMood.value);
                const personMoodText = findMoodText(personMood.value);
                return (
                  <ActionButton.Item key={person.id}>
                    <View>
                      <Avatar
                        rounded
                        overlayContainerStyle={{
                          borderWidth: 3
                        }}
                        size={100}
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
                            mood: personMood
                          })
                        }
                      />
                      <Badge
                        containerStyle={{ position: "relative" }}
                        badgeStyle={{
                          backgroundColor: personMoodColor
                        }}
                        value={personMoodText}
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
