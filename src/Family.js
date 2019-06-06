<<<<<<< HEAD
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { fetchUsers, fetchUser, fetchRelated } from "./store/users";
import { getActiveMood, findMoodById } from "./store/mood";
import { connect } from "react-redux";
import ActionButton from "react-native-circular-action-menu";
import { findMoodColor, findMoodText } from "./HelperFunctions";
=======
import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
  fetchUsers,
  fetchUser,
  fetchRelated,
  getActiveMood,
} from './store/users';
import { connect } from 'react-redux';
import ActionButton from 'react-native-circular-action-menu';
>>>>>>> ff698de22529a06ea708584d0f7e7890a8e70eb2

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
<<<<<<< HEAD
    const id = "4587f43b-eb75-4af7-b942-7d9ea1c36f84";
    this.props.fetchUsers();
    this.props.fetchUser(id);
    // .then(() => {
    //   this.props.getMoodsByFamilyId(this.props.user.familyId);
    // });
    this.props.getActiveMood(id);
=======
    // const id = 'bd941ccf-155d-4186-b4d2-4949180b859f';
    // this.props.fetchUsers();
    // this.props.fetchUser(id);
    this.props.fetchUsers();
>>>>>>> ff698de22529a06ea708584d0f7e7890a8e70eb2
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
      // console.log('mood', mood);

      const moodColor = findMoodColor(mood.value);
      const moodText = findMoodText(mood.value);
      // console.log(moodText);
      return (
        <View
          style={{
<<<<<<< HEAD
            flex: 0.9,
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: "flex-end"
=======
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
>>>>>>> ff698de22529a06ea708584d0f7e7890a8e70eb2
          }}
        >
          <View
            style={{
<<<<<<< HEAD
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingEnd: 25,
              marginBottom: 25
=======
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingEnd: 25,
>>>>>>> ff698de22529a06ea708584d0f7e7890a8e70eb2
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
<<<<<<< HEAD
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
=======
                  buttonSet: 'UserButtons',
                })
              }
              icon={
                <Avatar
                  rounded
                  overlayContainerStyle={{
                    borderWidth: 3,
                  }}
                  size={175}
                  source={{
                    uri: `${user.imgUrl}`,
                  }}
                  title={user.firstName}
                />
>>>>>>> ff698de22529a06ea708584d0f7e7890a8e70eb2
              }
            >
              {family.map(person => {
                // const personMood = findMoodById(person.id);
                // console.log(personMood);
                const personMoodColor = findMoodColor(0.5);
                const personMoodText = findMoodText(0.5);
                return (
                  <ActionButton.Item key={person.id}>
<<<<<<< HEAD
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
=======
                    <Avatar
                      rounded
                      overlayContainerStyle={{
                        borderWidth: 3,
                      }}
                      size={100}
                      source={{
                        uri: `${person.imgUrl}`,
                      }}
                      title={person.firstName}
                      onPress={() =>
                        this.props.navigation.navigate('AvatarGenerator', {
                          user: person,
                          buttonSet:
                            person.age > 18
                              ? 'RelativeButtons'
                              : 'ChildButtons',
                        })
                      }
                    />
>>>>>>> ff698de22529a06ea708584d0f7e7890a8e70eb2
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
    getActiveMood: id => dispatch(getActiveMood(id)),
<<<<<<< HEAD
    getMoodsByFamilyId: familyId => dispatch(getMoodsByFamilyId(familyId))
=======
>>>>>>> ff698de22529a06ea708584d0f7e7890a8e70eb2
  };
};

const mapStateToProps = ({ mood, users, user, related, familyMoods }) => {
  return {
    users,
    user,
    related,
<<<<<<< HEAD
    mood,
    familyMoods
=======
>>>>>>> ff698de22529a06ea708584d0f7e7890a8e70eb2
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
