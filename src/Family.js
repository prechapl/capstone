<<<<<<< HEAD
import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
  fetchUsers,
  fetchUser,
  fetchRelated,
  getActiveMood
} from './store/users';
import { connect } from 'react-redux';
import ActionButton from 'react-native-circular-action-menu';
=======
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { getActiveMood, getMoodsByFamilyId } from "./store/mood";
import { connect } from "react-redux";
import ActionButton from "react-native-circular-action-menu";
import { findMoodColor, findMoodText } from "./HelperFunctions";
>>>>>>> 67215ebf7266a44048678b0c883aeee4f65571a4


class Family extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (this.props.mood.id !== prevProps.mood.id) {
      this.load();
    }
  }

  load = () => {
<<<<<<< HEAD
    // HARD CODING USER ID HERE!!
    const id = 'e5fce01a-b34d-4472-8989-7368d033e6eb';
    this.props.fetchUsers();
    this.props.fetchUser(id);
=======
    this.props.getActiveMood(this.props.user.id);
    this.props.getMoodsByFamilyId(this.props.user.familyId);
>>>>>>> 67215ebf7266a44048678b0c883aeee4f65571a4
  };

  findFamily = (user, fam) => {
    return fam.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };

  render() {
<<<<<<< HEAD
    const user = this.props.user;
    const family = this.findFamily(user);

    if (family.length) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
=======
    const { user, mood, moods } = this.props;

    if (mood.id && this.props.moods !== undefined) {
      const family = this.findFamily(user, moods);
      const moodColor = findMoodColor(mood.value);
      const moodText = findMoodText(mood.value);
      return (
        <View
          style={{
            flex: 0.9,
            flexDirection: "column",
            justifyContent: "flex-end"
>>>>>>> 67215ebf7266a44048678b0c883aeee4f65571a4
          }}
        >
          <View
            style={{
<<<<<<< HEAD
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingEnd: 25
=======
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingEnd: 25,
              marginBottom: 25
>>>>>>> 67215ebf7266a44048678b0c883aeee4f65571a4
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
                  buttonSet: 'UserButtons'
                })
              }
              icon={
                <Avatar
                  rounded
                  overlayContainerStyle={{
                    borderWidth: 3
                  }}
                  size={175}
                  source={{
                    uri: `${user.imgUrl}`
                  }}
                  title={user.firstName}
                />
=======
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
>>>>>>> 67215ebf7266a44048678b0c883aeee4f65571a4
              }
            >
              {family.map(person => {
                const personMoodColor = findMoodColor(
                  person.moods.find(m => m.active).value
                );
                const personMoodText = findMoodText(
                  person.moods.find(m => m.active).value
                );
                return (
                  <ActionButton.Item key={person.id}>
<<<<<<< HEAD
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
                        this.props.navigation.navigate('AvatarGenerator', {
                          user: person,
                          buttonSet:
                            person.age > 18 ? 'RelativeButtons' : 'ChildButtons'
                        })
                      }
                    />
=======
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
                            mood: person.moods.find(m => m.active)
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
>>>>>>> 67215ebf7266a44048678b0c883aeee4f65571a4
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
<<<<<<< HEAD
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUser: id => dispatch(fetchUser(id)),
    fetchRelated: id => dispatch(fetchRelated(id)),
    getActiveMood: id => dispatch(getActiveMood(id))
=======
    getActiveMood: id => dispatch(getActiveMood(id)),
    getMoodsByFamilyId: familyId => dispatch(getMoodsByFamilyId(familyId))
>>>>>>> 67215ebf7266a44048678b0c883aeee4f65571a4
  };
};

const mapStateToProps = ({ mood, moods, user }) => {
  return {
    user,
<<<<<<< HEAD
    related
=======
    mood,
    moods
>>>>>>> 67215ebf7266a44048678b0c883aeee4f65571a4
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
