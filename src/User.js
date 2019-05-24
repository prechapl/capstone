import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class App extends React.Component {
  render() {
    const { navigation } = this.props;
    const userTitle = navigation.getParam('firstName', 'no name');
    const url = navigation.getParam('imgUrl', 'no url');

    return (
      <View style={styles.container}>
        <Avatar
          rounded
          size={100}
          source={{
            uri: `${url}`
          }}
          title={userTitle}
        />

        <Text>This is the single user view</Text>
      </View>
    );
  }
}
