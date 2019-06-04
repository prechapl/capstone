import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-circular-action-menu';

class AvatarChild extends Component {
  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'no user');

    if (user.id) {
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
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ActionButton
              degrees={360}
              radius={150}
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
              {/* Records */}

              <ActionButton.Item
                onPress={() =>
                  this.props.navigation.navigate('Records', {
                    user: user
                  })
                }
              >
                <View style={{ width: 82, backgroundColor: '#E0BF00' }}>
                  <Text style={styles.text}>Records</Text>
                </View>
              </ActionButton.Item>

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

              {/* Goals */}

              <ActionButton.Item
                onPress={() =>
                  this.props.navigation.navigate('Goals', {
                    user: user
                  })
                }
              >
                <View style={{ width: 61, backgroundColor: '#1500FA' }}>
                  <Text style={styles.text}>Goals</Text>
                </View>
              </ActionButton.Item>

              {/* Values */}

              <ActionButton.Item
                onPress={() =>
                  this.props.navigation.navigate('Values', {
                    user: user
                  })
                }
              >
                <View style={{ width: 66, backgroundColor: '#AD0978' }}>
                  <Text style={styles.text}>Values</Text>
                </View>
              </ActionButton.Item>

              {/* Location */}

              <ActionButton.Item
                onPress={() =>
                  this.props.navigation.navigate('Location', {
                    user: user
                  })
                }
              >
                <View style={{ width: 84, backgroundColor: '#7DC6CD' }}>
                  <Text style={styles.text}>Location</Text>
                </View>
              </ActionButton.Item>
            </ActionButton>
          </View>
        </View>
      );
    } else {
      return null;
    }
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

export default withNavigation(AvatarChild);
