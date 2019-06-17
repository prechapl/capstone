import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { getActiveMood, getMoodsByFamilyId } from './store/mood';
import { fetchUserRelationships, fetchUserRelativeRelationships } from './store/users';
import { connect } from 'react-redux';
import ActionButton from 'react-native-circular-action-menu';
import { findMoodColor } from './HelperFunctions';
import { fetchEvents, fetchAssigned, goUpdateEvent, goUpdateAssigned } from './store/events';
import axios from 'axios';
import SocketIOClient from 'socket.io-client';
import { fetchAlerts, createAlert } from './store/alerts';


class Family extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient('https://capstone-api-server.herokuapp.com/', {
      secure: true,
      transports: ['websocket'],
    });
  }

  componentDidMount() {
    this.socket.connect();
    this.socket.on('connect', () => console.log('connected'))
    this.socket.on('hello', () => console.log('hello hello hello'))
    this.socket.on('new_alert', () => {
      this.props.loadAlerts(this.props.user.id)
    });
    this.socket.on('new_event', () => this.loadEvents());
    this.load();
    this.loadEvents();
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
    this.props.fetchRelativeRelationships(this.props.user.id);
  }
  loadEvents = () => {
    const now = new Date();
    this.props.fetchEvents(this.props.user.id)
      .then(() => {
        this.props.events
          .filter(ev => new Date(ev.deadline) < now && ev.status === 'upcoming')
          .forEach(ev => this.setOverdue(ev));
      });
    this.props.fetchAssigned(this.props.user.id)
      .then(() => {
        this.props.assignedEvents
          .filter(ev => new Date(ev.deadline) < now && ev.status === 'upcoming')
          .forEach(ev => this.setOverdue(ev));
      });
  };
  setOverdue = (ev) => {
    if (ev.ownerId === this.props.user.id) {
      this.props.goUpdateEvent(ev.id, { status: 'overdue' });
    } else {
      this.props.goUpdateAssigned(ev.id, { status: 'overdue' });
    }
    this.props.createAlert({
      alertType: 'event',
      message: `Your event ${ev.title} is overdue!`,
      targetId: ev.id,
      userId: this.props.user.id
    }, this.props.user.id)
  }
  findFamily = (user, fam) => {
    return fam.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };

  render() {
    const { user, navigation, mood, moods, userRelationships } = this.props;
    if (mood.id && moods !== undefined && userRelationships !== undefined) {
      const family = this.findFamily(user, moods);
      const moodColor = findMoodColor(mood.value);
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
              autoInactive={false}
              degrees={0}
              radius={135}
              buttonColor="rgba(0, 0, 0, 0)"
              btnOutRange="rgba(0, 0, 0, 0)"
              outRangeScale={1}
              onLongPress={() => {
                navigation.navigate('AvatarGenerator', {
                  user: user,
                  buttonSet: 'UserButtons',
                  mood: mood
                });
              }}
              icon={
                <View>
                  <Avatar
                    rounded
                    overlayContainerStyle={{
                      borderWidth: 7,
                      borderColor: moodColor
                    }}
                    size={120}
                    source={{
                      uri: `${user.imgUrl}`
                    }}
                    title={user.firstName}
                    onPress={() => {
                      navigation.navigate('AvatarGenerator', {
                        user: user,
                        buttonSet: 'UserButtons',
                        mood: mood
                      });
                    }}
                  />
                </View>
              }
            >
              {family.map(person => {
                const personMoodColor = findMoodColor(
                  person.moods.find(m => m.active).value
                );

                return (
                  <ActionButton.Item key={person.id}>
                    <View>
                      <Avatar
                        rounded
                        overlayContainerStyle={{
                          borderWidth: 7,
                          borderColor: personMoodColor
                        }}
                        size={100}
                        source={{
                          uri: `${person.imgUrl}`
                        }}
                        title={person.firstName}
                        onPress={() =>
                          navigation.navigate('AvatarGenerator', {
                            user: person,
                            buttonSet:
                              person.age > 18
                                ? 'RelativeButtons'
                                : 'ChildButtons',
                            mood: person.moods.find(m => m.active)
                          })
                        }
                        onLongPress={() =>
                          navigation.navigate('TwoUp', {
                            relative: person
                          })
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
    getActiveMood: id => dispatch(getActiveMood(id)),
    getMoodsByFamilyId: familyId => dispatch(getMoodsByFamilyId(familyId)),
    fetchUserRelationships: id => dispatch(fetchUserRelationships(id)),
    fetchEvents: id => dispatch(fetchEvents(id)),
    fetchAssigned: id => dispatch(fetchAssigned(id)),
    goUpdateAssigned: (id, updates) => dispatch(goUpdateAssigned(id, updates)),
    goUpdateEvent: (id, updates) => dispatch(goUpdateEvent(id, updates)),
    fetchRelativeRelationships: (id) => dispatch(fetchUserRelativeRelationships(id)),
    loadAlerts: (id) => dispatch(fetchAlerts(id)),
    createAlert: (alert, id) => dispatch(createAlert(alert, id))
  };
};

const mapStateToProps = ({
  mood,
  moods,
  user,
  userRelationships,
  events,
  assignedEvents
}) => {
  return {
    user,
    mood,
    moods,
    userRelationships,
    events,
    assignedEvents
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
