import React from 'react';
import { Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import { setActiveMood, getActiveMood } from './store/mood';
import { findMoodColor, findMoodText } from './HelperFunctions';

class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 0.5
    };
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (this.props.mood.value !== prevProps.mood.value) {
      this.load();
    }
  }

  load = () => {
    const user = this.props.navigation.getParam('user', 'no user');

    const id = user.id;
    this.props.getActiveMood(id);
    this.setState({ mood: this.props.mood.value });
  };

  render() {
    const user = this.props.navigation.getParam('user', 'no user');

    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          My mood is {findMoodText(this.state.mood)}
        </Text>

        <View
          style={{
            width: 300,
            paddingTop: 50,
            paddingBottom: 150,
            justifyContent: 'center'
          }}
        >
          <Slider
            value={this.state.mood}
            step={0.25}
            onValueChange={value => this.setState({ mood: value })}
            onSlidingComplete={() => {
              this.props.setActiveMood(user.id, this.state.mood);
            }}
            thumbStyle={{
              height: 80,
              width: 80,
              borderRadius: 40
            }}
            thumbTintColor={findMoodColor(this.state.mood)}
            thumbTouchSize={{ width: 120, height: 120 }}
            minimumTrackTintColor={findMoodColor(this.state.mood)}
          />
        </View>
      </View>
    );
  }
}

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

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Mood)
);
