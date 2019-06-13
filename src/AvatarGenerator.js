import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-circular-action-menu';
import { findMoodColor, findMoodText } from './HelperFunctions';
import AllPolls from './Polls/AllPolls';
import Events from './Events/Events';
import Mood from './Mood';
import Family from './Family';

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
    const moodText = findMoodText(mood.value);

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
            radius={140}
            outRangeScale={1}
            icon={
              <View>
                <Avatar
                  rounded
                  overlayContainerStyle={{
                    borderWidth: 5,
                    borderColor: moodColor
                  }}
                  size={165}
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
            {buttons[buttonSet].map((button, idx) => {
              return button.title === 'Family' ? (
                <ActionButton.Item
                  key={idx}
                  onPress={() =>
                    this.props.navigation.navigate(button.title, {
                      user: user
                    })
                  }
                >
                  <View
                    style={{
                      width: button.width,
                      backgroundColor: button.color,

                      position: 'absolute'
                    }}
                  >
                    <Text style={styles.text}>{button.title}</Text>
                  </View>
                </ActionButton.Item>
              ) : (
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
                        backgroundColor: button.color,

                        position: 'absolute'
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
      width: 62,
      componentToNest: <Mood />
    },
    {
      title: 'Family',
      color: '#8EB51A',
      width: 66,
      componentToNest: <Family />
    },
    {
      title: 'Events',
      color: '#EF5029',
      width: 68,
      componentToNest: <Events />
    },
    {
      title: 'Polls',
      color: '#7DC6CD',
      width: 53,
      componentToNest: <AllPolls />
    }
  ],
  RelativeButtons: [
    {
      title: 'Family',
      color: '#8EB51A',
      width: 66,
      componentToNest: <Family />
    },
    {
      title: 'Events',
      color: '#EF5029',
      width: 68,
      componentToNest: <Events />
    },
    {
      title: 'Polls',
      color: '#7DC6CD',
      width: 53,
      componentToNest: <AllPolls />
    }
  ],
  ChildButtons: [
    {
      title: 'Family',
      color: '#8EB51A',
      width: 66,
      componentToNest: <Family />
    },
    {
      title: 'Events',
      color: '#EF5029',
      width: 68,
      componentToNest: <Events />
    },
    {
      title: 'Polls',
      color: '#7DC6CD',
      width: 53,
      componentToNest: <AllPolls />
    },
    {
      title: 'Location',
      color: '#AD0978',
      width: 84,
      componentToNest: null
    },
    {
      title: 'Goals',
      color: '#1500FA',
      width: 61,
      componentToNest: null
    },
    {
      title: 'Records',
      color: '#E0BF00',
      width: 82,
      componentToNest: null
    }
  ]
};

const styles = StyleSheet.create({
  text: {
    paddingStart: 5,
    paddingTop: 0,
    paddingBottom: 1,
    marginBottom: 1,
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
