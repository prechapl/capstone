import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-circular-action-menu';

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

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingEnd: 25
          }}
        >
          <ActionButton
            active={true}
            degrees={360}
            radius={130}
            outRangeScale={0.75}
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
