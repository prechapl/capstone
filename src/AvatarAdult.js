import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-circular-action-menu';

class AvatarAdult extends Component {
  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'no user');
    // console.log('user in AvatarAdult', user);

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
            radius={120}
            // position="right"
            outRangeScale={0.75}
            icon={
              <Avatar
                rounded
                overlayContainerStyle={{
                  borderWidth: 1
                }}
                size={170}
                source={{
                  uri: `${user.imgUrl}`
                }}
                title={user.firstName}
              />
            }
          >
            {/* MOOD */}
            <ActionButton.Item
              onPress={() =>
                this.props.navigation.navigate('Mood', {
                  user: user
                })
              }
            >
              <View style={{ width: 62, backgroundColor: '#FF9900' }}>
                <Text style={styles.text}>Mood</Text>
              </View>
            </ActionButton.Item>

            {/* FAMILY */}
            <ActionButton.Item
              onPress={() =>
                this.props.navigation.navigate('Family', {
                  user: user
                })
              }
            >
              <View style={{ width: 66, backgroundColor: '#8EB51A' }}>
                <Text style={styles.text}>Family</Text>
              </View>
            </ActionButton.Item>

            {/* Events */}
            <ActionButton.Item
              onPress={() =>
                this.props.navigation.navigate('Events', {
                  user: user
                })
              }
            >
              <View style={{ width: 68, backgroundColor: '#EF5029' }}>
                <Text style={styles.text}>Events</Text>
              </View>
            </ActionButton.Item>

            {/* Polls */}

            <ActionButton.Item
              onPress={() =>
                this.props.navigation.navigate('Polls', {
                  user: user
                })
              }
            >
              <View style={{ width: 53, backgroundColor: '#7DC6CD' }}>
                <Text style={styles.text}>Polls</Text>
              </View>
            </ActionButton.Item>
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

export default withNavigation(AvatarAdult);
