import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Slider } from 'react-native-elements';

export default class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 0
    };
  }
  render() {
    const { navigation } = this.props;
    const userTitle = navigation.getParam('firstName', 'no name');
    const url = navigation.getParam('imgUrl', 'no url');

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            width: 300,
            paddingTop: 100,
            paddingBottom: 50,
            // alignItems: 'stretch',
            justifyContent: 'center'
          }}
        >
          <Slider
            value={this.state.mood}
            onValueChange={value => this.setState({ mood: value })}
            // debugTouchArea={true}
          />
          <Text>Mood Meter: {this.state.mood}</Text>
        </View>

        <View style={{ marginTop: 5 }}>
          <Avatar
            rounded
            overlayContainerStyle={styles.avatar}
            size={150}
            source={{
              uri: `${url}`
            }}
            title={userTitle.slice(0, 1)}
          />
        </View>
        <View style={{}}>
          <Button
            title="Family"
            onPress={() => this.props.navigation.navigate('Family')}
            buttonStyle={{ backgroundColor: '#8EB51A', margin: 24 }}
          />

          <Button
            title="Values"
            onPress={() => this.props.navigation.navigate('Values')}
            buttonStyle={{ backgroundColor: '#7DC6CD', margin: 24 }}
          />

          <Button
            title="Events"
            onPress={() => this.props.navigation.navigate('Events')}
            buttonStyle={{ backgroundColor: '#EF5029', margin: 24 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
