import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Avatar rounded size={100} title="PC" />
        <Avatar rounded size={100} title="DS" />
        <Avatar rounded size={100} title="RB" />
        <Avatar rounded size={100} title="LW" />
        <Text>
          This is the beginning of Mender! Many thanks to Dave, Ruby and Lauren
          for taking this on!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
