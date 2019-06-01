import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Badge, Button, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import { setActiveMood, getActiveMood, getAllMoods } from './store';

class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 0
    };
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (this.props.mood.id !== prevProps.mood.id) {
      this.load();
    }
  }

  load = () => {
    this.props.getActiveMood(this.props.navigation.getParam('userId', 'no id'));
    this.props.getAllMoods(this.props.navigation.getParam('userId', 'no id'));
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
      0.0: 'horrible',
      0.25: 'bad',
      0.5: 'neutral',
      0.75: 'good',
      1.0: 'excellent'
    };
    return feelings[value];
  };

  render() {
    const { navigation } = this.props;
    const userTitle = navigation.getParam('firstName', 'no name');
    const url = navigation.getParam('imgUrl', 'no url');
    const id = navigation.getParam('userId', 'no id');

    if (this.props.mood.id) {
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
            My mood is {this.findMood(this.props.mood.value)}
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
              value={this.props.mood.value}
              step={0.25}
              onValueChange={value => this.setState({ mood: value })}
              onSlidingComplete={() =>
                this.props.setActiveMood(id, this.state.mood)
              }
              thumbStyle={{
                height: 80,
                width: 80,
                borderRadius: 40
              }}
              thumbTintColor={this.findColor(this.props.mood.value)}
              thumbTouchSize={{ width: 120, height: 120 }}
              minimumTrackTintColor={this.findColor(this.props.mood.value)}
            />
          </View>

          <View>
            <Avatar
              rounded
              overlayContainerStyle={{ borderWidth: 1 }}
              size={150}
              source={{
                uri: `${url}`
              }}
              title={userTitle.slice(0, 1)}
            />
            <Badge
              containerStyle={{ position: 'absolute', top: 4, right: 4 }}
              badgeStyle={{
                backgroundColor: this.findColor(this.props.mood.value)
              }}
              value={this.findMood(this.props.mood.value)}
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
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActiveMood: (userId, value) => dispatch(setActiveMood(userId, value)),
    getActiveMood: id => dispatch(getActiveMood(id)),
    getAllMoods: id => dispatch(getAllMoods(id))
  };
};

const mapStateToProps = ({ mood, moods }) => {
  return {
    mood: mood,
    moods: moods
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mood);
