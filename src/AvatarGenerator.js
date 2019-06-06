import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-circular-action-menu';
import { findMoodColor, findMoodText } from './HelperFunctions';

class AvatarGenerator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'no user');
    const buttonSet = navigation.getParam('buttonSet');

    const buttons = {
      UserButtons: [
        { title: 'Mood', color: '#FF9900', width: 62 },
        { title: 'Family', color: '#8EB51A', width: 66 },
        { title: 'Events', color: '#EF5029', width: 68 },
        { title: 'Polls', color: '#7DC6CD', width: 53 }
      ],
      RelativeButtons: [
        { title: 'Family', color: '#8EB51A', width: 66 },
        { title: 'Events', color: '#EF5029', width: 68 },
        { title: 'Polls', color: '#7DC6CD', width: 53 }
      ],
      ChildButtons: [
        { title: 'Family', color: '#8EB51A', width: 66 },
        { title: 'Events', color: '#EF5029', width: 68 },
        { title: 'Polls', color: '#7DC6CD', width: 53 },
        { title: 'Location', color: '#AD0978', width: 84 },
        { title: 'Goals', color: '#1500FA', width: 61 },
        { title: 'Records', color: '#E0BF00', width: 82 }
      ]
    };
    const mood = navigation.getParam('mood');
    // console.log('mood', mood.value);
    const moodColor = findMoodColor(mood.value);
    const moodText = findMoodText(mood.value);

    return (
      <View
        style={{
          flex: 0.9,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
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
              return (
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
                      backgroundColor: button.color
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

export default withNavigation(AvatarGenerator);
