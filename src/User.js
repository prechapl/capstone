import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    borderWidth: 1
  }
});

export default class User extends React.Component {
  render() {
    const { navigation } = this.props;
    const userTitle = navigation.getParam('firstName', 'no name');
    const url = navigation.getParam('imgUrl', 'no url');

    return (
      <View style={styles.container}>
        <Avatar
          rounded
          overlayContainerStyle={styles.avatar}
          size={150}
          source={{
            uri: `${url}`
          }}
          title={userTitle.slice(0, 1)}
        />

        <Text>This is the single user view</Text>
      </View>
    );
  }
}
