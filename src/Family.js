import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { getActiveMood, getMoodsByFamilyId } from './store/mood';
import { fetchUserRelationships } from './store/users';
import { connect } from 'react-redux';
import ActionButton from 'react-native-circular-action-menu';
import { findMoodColor, findMoodText, findStatus } from './HelperFunctions';

class Family extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.mood.id !== prevProps.mood.id ||
      this.props.userRelationships.length !== prevProps.userRelationships.length
    ) {
      this.load();
    }
  }

  load = () => {
    this.props.getActiveMood(this.props.user.id);
    this.props.getMoodsByFamilyId(this.props.user.familyId);
    this.props.fetchUserRelationships(this.props.user.id);
  };

  findFamily = (user, fam) => {
    return fam.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };

  render() {
    const { user, mood, moods, userRelationships } = this.props;

    if (mood.id && moods !== undefined && userRelationships !== undefined) {
      const family = this.findFamily(user, moods);
      const moodColor = findMoodColor(mood.value);
      const moodText = findMoodText(mood.value);
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ActionButton
              active={true}
              degrees={0}
              radius={130}
              outRangeScale={0.8}
              onLongPress={() =>
                this.props.navigation.navigate('AvatarGenerator', {
                  user: user,
                  buttonSet: 'UserButtons',
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
                      position: 'relative',
                      top: -18
                    }}
                    badgeStyle={{
                      backgroundColor: moodColor,
                      paddingHorizontal: 10,
                      borderColor: 'transparent'
                    }}
                    value={
                      <Text style={{ fontSize: 12, color: 'white' }}>
                        {`${moodText}`} mood
                      </Text>
                    }
                  />
                </View>
              }
            >
              {family.map(person => {
                const personMoodColor = findMoodColor(
                  person.moods.find(m => m.active).value
                );
                const personMoodText = findMoodText(
                  person.moods.find(m => m.active).value
                );

                const relationship = userRelationships.find(
                  r => r.RelationshipId === person.id
                );

                return (
                  <ActionButton.Item key={person.id}>
                    <View>
                      <Avatar
                        rounded
                        overlayContainerStyle={{
                          borderWidth: 5,
                          borderColor: personMoodColor
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
                              person.age > 18
                                ? 'RelativeButtons'
                                : 'ChildButtons',
                            mood: person.moods.find(m => m.active)
                          })
                        }
                        onLongPress={() =>
                          this.props.navigation.navigate('TwoUp', {
                            relative: person
                          })
                        }
                      />
                      {relationship !== undefined ? (
                        //status badge
                        <View
                          style={{
                            position: 'absolute',
                            top: -3,

                            backgroundColor: findStatus(relationship.status)
                              .color,
                            paddingHorizontal: 10,
                            marginLeft: 24,
                            borderRadius: 50
                          }}
                        >
                          <Text style={{ color: 'white', fontSize: 10 }}>
                            {personMoodText}
                          </Text>
                        </View>
                      ) : null}

                      <View
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          backgroundColor: personMoodColor,
                          paddingHorizontal: 10,
                          marginLeft: 24,
                          borderRadius: 50
                        }}
                      >
                        <Text style={{ color: 'white', fontSize: 10 }}>
                          {personMoodText}
                        </Text>
                      </View>
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
    getActiveMood: id => dispatch(getActiveMood(id)),
    getMoodsByFamilyId: familyId => dispatch(getMoodsByFamilyId(familyId)),
    fetchUserRelationships: id => dispatch(fetchUserRelationships(id))
  };
};

const mapStateToProps = ({ mood, moods, user, userRelationships }) => {
  return {
    user,
    mood,
    moods,
    userRelationships
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
