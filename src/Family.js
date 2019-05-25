import React, { Component } from 'react';
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

export default class Family extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Avatar
          rounded
          size={120}
          title="PC"
          source={{
            uri: 'http://i64.tinypic.com/292mj3k.jpg'
          }}
          onPress={() =>
            this.props.navigation.navigate('User', {
              firstName: 'Preston',
              imgUrl: 'http://i64.tinypic.com/292mj3k.jpg'
            })
          }
        />

        <Avatar
          rounded
          size={120}
          title="DS"
          source={{
            uri: 'http://i64.tinypic.com/14tm2v7.png'
          }}
          onPress={() =>
            this.props.navigation.navigate('User', {
              firstName: 'Dave',
              imgUrl: 'http://i64.tinypic.com/14tm2v7.png'
            })
          }
        />
        <Avatar
          rounded
          size={120}
          title="RB"
          source={{
            uri: 'http://i64.tinypic.com/11lu3qc.png'
          }}
          onPress={() =>
            this.props.navigation.navigate('User', {
              firstName: 'Ruby',
              imgUrl: 'http://i64.tinypic.com/11lu3qc.png'
            })
          }
        />
        <Avatar
          rounded
          size={120}
          title="LW"
          source={{
            uri: 'http://i68.tinypic.com/1zd6wpx.png'
          }}
          onPress={() =>
            this.props.navigation.navigate('User', {
              firstName: 'Lauren',
              imgUrl: 'http://i68.tinypic.com/1zd6wpx.png'
            })
          }
        />
        <Text>This is the Family view</Text>
      </View>
    );
  }
}
