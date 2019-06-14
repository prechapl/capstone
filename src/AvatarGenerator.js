import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-circular-action-menu';
import { findMoodColor } from './HelperFunctions';
import AllPolls from './Polls/AllPolls';
import Events from './Events/Events';
import Mood from './Mood';
import Family from './Family';
import Location from './Location';

class AvatarGenerator extends Component {
  constructor(props) {
    super(props);
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
    const mood = navigation.getParam('mood');
    const buttonSet = navigation.getParam('buttonSet');
    const componentToNest = navigation.getParam('nestComponent');
    const moodColor = findMoodColor(mood.value);
    // const moodText = findMoodText(mood.value);

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
          {componentToNest}
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
                    uri: `${user.imgUrl}`
                  }}
                  title={user.firstName}
                />
              </View>
            }
          >
            {buttons[buttonSet].map((button, idx) => {
              return button.title !== 'Location' &&
                button.title !== 'Family' ? (
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
                      mood: mood
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
      componentToNest: <Family />
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
    },
    {
      title: 'Location',
      color: '#AD0978',
      width: 99,
      height: 50,
      componentToNest: <Location />
    }
  ],
  RelativeButtons: [
    {
      title: 'Family',
      color: '#8EB51A',
      width: 83,
      height: 50,
      componentToNest: <Family />
    },
    {
      title: 'Events',
      color: '#EF5029',
      width: 87,
      height: 50,
      componentToNest: <Events />
    },
    {
      title: 'Polls',
      color: '#7DC6CD',
      width: 70,
      height: 50,
      componentToNest: <AllPolls />
    },
    {
      title: 'Location',
      color: '#AD0978',
      width: 99,
      height: 50,
      componentToNest: <Location />
    }
  ],
  ChildButtons: [
    {
      title: 'Location',
      color: '#AD0978',
      width: 99,
      height: 50,
      componentToNest: <Location />
    },

    {
      title: 'Events',
      color: '#EF5029',
      width: 87,
      height: 50,
      componentToNest: <Events />
    },
    {
      title: 'Polls',
      color: '#7DC6CD',
      width: 70,
      height: 50,
      componentToNest: <AllPolls />
    },
    {
      title: 'Family',
      color: '#8EB51A',
      width: 83,
      height: 50,
      componentToNest: <Family />
    },
    {
      title: 'Goals',
      color: '#1500FA',
      width: 78,
      height: 50,
      componentToNest: null
    },
    {
      title: 'Awards',
      color: '#E0BF00',
      width: 98,
      height: 50,
      componentToNest: null
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
