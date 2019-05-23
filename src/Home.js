import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="MyFamily" type="outline" raised />

        <Text>
          This is the beginning of Mender or whatever we'll call it! Many thanks
          to Dave, Ruby and Lauren for taking this on!
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
