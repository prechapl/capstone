import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Slider } from 'react-native-elements';
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
    console.log('mount ran, mood: ', JSON.stringify(this.props.mood.value));
    // console.log('mount ran, moods: ', this.props.moods);
  }

  componentDidUpdate(prevProps) {
    if (this.props.mood.id !== prevProps.mood.id) {
      console.log('update ran, moods: ', this.props.moods.length);
      this.load();
    }
  }

  load = () => {
    this.props.getActiveMood(this.props.navigation.getParam('userId', 'no id'));
    this.props.getAllMoods(this.props.navigation.getParam('userId', 'no id'));
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
          <Text>active mood value: {this.props.mood.value}</Text>
          <Text>
            mood set: {this.props.mood.createdAt.slice(0, 10)} @{' '}
            {this.props.mood.createdAt.slice(11, 19)}
          </Text>
          <Text>previous mood entries: {this.props.moods.length}</Text>
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
              step={0.2}
              onValueChange={value => this.setState({ mood: value })}
              // onSlidingComplete={() => console.log("onSlidingComplete!")}
              onSlidingComplete={() =>
                this.props.setActiveMood(id, this.state.mood)
              }

              // debugTouchArea={true}
            />
            <Text>Mood Meter: {String(this.state.mood).slice(0, 3)}</Text>
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
    } else {
      return null;
    }
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
