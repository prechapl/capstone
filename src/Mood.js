import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import { setActiveMood, getActiveMood } from './store';

class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 0
    };
  }

  componentDidMount() {
    this.load();
    console.log('mount ran, mood: ', JSON.stringify(this.props.mood.value));
    // console.log('mount ran, moods: ', this.props.moods);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.mood &&
      prevProps.mood &&
      this.props.mood.value !== prevProps.mood.value
    ) {
      this.load();
    }
  }

  load = () => {
    const user = this.props.navigation.getParam('user', 'no user');
    const id = user.id;
    this.props.getActiveMood(id);
    this.setState({ mood: this.props.mood.value });
  };

  findColor = value => {
    const colors = {
      0.0: '#FF2A00',
      0.25: '#E68200',
      0.5: '#FAD400',
      0.75: '#80E600',
      1.0: '#00FF53'
    };
    return colors[value];
  };

  findMood = value => {
    const feelings = {
      0.0: 'bad',
      0.25: 'kinda bad',
      0.5: 'neutral',
      0.75: 'pretty good',
      1.0: 'excellent'
    };
    return feelings[value];
  };

  render() {
    const user = this.props.navigation.getParam('user', 'no user');

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
        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 66
          }}
        >
          My mood is {this.findMood(this.state.mood)}
        </Text>

        <View
          style={{
            width: 300,
            paddingTop: 50,
            paddingBottom: 50,
            justifyContent: 'center'
          }}
        >
          <Slider
            value={this.state.mood}
            step={0.25}
            onValueChange={value => this.setState({ mood: value })}
            onSlidingComplete={() =>
              this.props.setActiveMood(user.id, this.state.mood)
            }
            thumbStyle={{
              height: 80,
              width: 80,
              borderRadius: 40
            }}
            thumbTintColor={this.findColor(this.state.mood)}
            thumbTouchSize={{ width: 120, height: 120 }}
            minimumTrackTintColor={this.findColor(this.state.mood)}
          />
        </View>

        <View>
          <Avatar
            rounded
            overlayContainerStyle={{ borderWidth: 1 }}
            size={150}
            source={{
              uri: `${user.imgUrl}`
            }}
            title={user.firstName}
          />
          <Badge
            containerStyle={{ position: 'absolute', top: 4, right: 4 }}
            badgeStyle={{
              backgroundColor: this.findColor(this.state.mood)
            }}
            value={this.findMood(this.state.mood)}
          />
        </View>
        <View>
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

const mapDispatchToProps = dispatch => {
  return {
    setActiveMood: (userId, value) => dispatch(setActiveMood(userId, value)),
    getActiveMood: id => dispatch(getActiveMood(id))
  };
};

const mapStateToProps = ({ mood }) => {
  return {
    mood: mood
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mood);
