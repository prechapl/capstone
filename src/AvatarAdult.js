import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';

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
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <ActionButton
            degrees={360}
            radius={150}
            icon={
              <Avatar
                rounded
                overlayContainerStyle={{
                  borderWidth: 1
                }}
                size={150}
                source={{
                  uri: `${user.imgUrl}`
                }}
                title={user.firstName}
              />
            }
          >
            <ActionButton.Item
              onPress={() =>
                this.props.navigation.navigate('Mood', {
                  user: user
                })
              }
            >
              <Text style={styles.text}>Mood</Text>
            </ActionButton.Item>
          </ActionButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  text: {
    margin: 0,
    paddingStart: 5,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 2,
    color: 'white',
    backgroundColor: '#FF9900',
    fontSize: 24,
    width: 70
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    borderWidth: 1
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  fitButton: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default withNavigation(AvatarAdult);
