import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-circular-action-menu';
import { findMoodColor } from './HelperFunctions';
import AllPolls from './Polls/AllPolls';
import Events from './Events/Events';
import Mood from './Mood';
import Location from './Location';
// import SocketIOClient from 'socket.io-client';

class AvatarGenerator extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // AsyncStorage.getItem('token')
    //   this.socket = SocketIOClient('https://capstone-api-server.herokuapp.com/', {
    //     extraHeaders: { authorization: token }
    //   });
    // this.socket.connect();
  }

  componentDidUpdate(prevProps) {
    if (this.props.mood.value !== prevProps.mood.value) {
      this.props.navigation.setParams({
        mood: this.props.mood
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const familyMember = navigation.getParam('familyMember');
    const mood = navigation.getParam('mood');
    const buttonSet = navigation.getParam('buttonSet');
    const componentToNest = navigation.getParam('nestComponent');
    const moodColor = findMoodColor(mood.value);

    // console.log('user', user);
    // console.log('familyMember', familyMember);

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View style={{ flexDirection: 'row', marginBottom: 60 }}>
          {componentToNest ? componentToNest : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingEnd: 25,
            marginBottom: 25
          }}
        >
          <ActionButton
            active={true}
            degrees={360}
            radius={146}
            outRangeScale={1}
            buttonColor="transparent"
            icon={
              <View>
                <Avatar
                  rounded
                  overlayContainerStyle={{
                    borderWidth: 7,
                    borderColor: moodColor
                  }}
                  size={160}
                  source={{
                    uri: user ? user.imgUrl : familyMember.imgUrl
                  }}
                  title={user ? user.firstName : familyMember.firstName}
                />
              </View>
            }
          >
            {buttons[buttonSet].map((button, idx) => {
              return button.componentToNest ? (
                <ActionButton.Item
                  key={idx}
                  onPress={() =>
                    this.props.navigation.setParams({
                      nestComponent: button.componentToNest
                    })
                  }
                >
                  <View
                    style={{
                      width: button.width,
                      height: button.height,
                      backgroundColor: button.color,
                      borderRadius: 40,
                      position: 'relative',
                      paddingStart: 14,
                      paddingTop: 13
                    }}
                  >
                    <Text style={styles.text}>{button.title}</Text>
                  </View>
                </ActionButton.Item>
              ) : (
                <ActionButton.Item
                  key={idx}
                  onPress={() =>
                    this.props.navigation.navigate(button.title, {
                      user: user,
                      mood: mood,
                      familyMember: familyMember
                    })
                  }
                >
                  <View
                    style={{
                      width: button.width,
                      backgroundColor: button.color,
                      height: button.height,
                      borderRadius: 40,
                      position: 'relative',
                      paddingStart: 14,
                      paddingTop: 12
                    }}
                  >
                    <Text style={styles.text}>{button.title}</Text>
                  </View>
                </ActionButton.Item>
              );
            })}
          </ActionButton>
        </View>
      </View>
    );
  }
}

const buttons = {
  UserButtons: [
    {
      title: 'Mood',
      color: '#FF9900',
      width: 80,
      height: 50,
      componentToNest: <Mood />
    },
    {
      title: 'Family',
      color: '#8EB51A',
      width: 83,
      height: 50,
      componentToNest: null
    },
    {
      title: 'Polls',
      color: '#7DC6CD',
      width: 70,
      height: 50,
      componentToNest: <AllPolls />
    },
    {
      title: 'Events',
      color: '#EF5029',
      width: 87,
      height: 50,
      componentToNest: <Events />
    }
  ],
  RelativeButtons: [
    {
      title: 'Family',
      color: '#8EB51A',
      width: 83,
      height: 50,
      componentToNest: null
    },
    {
      title: 'Location',
      color: '#AD0978',
      width: 99,
      height: 50,
      componentToNest: <Location />
    }
  ]
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20
  }
});

const mapStateToProps = ({ user, mood }) => {
  return {
    user,
    mood
  };
};

export default withNavigation(connect(mapStateToProps)(AvatarGenerator));
