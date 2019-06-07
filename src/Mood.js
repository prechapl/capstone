import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Badge, Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import { setActiveMood, getActiveMood } from './store/mood';
import ActionButton from 'react-native-circular-action-menu';

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
    const user = this.props.navigation.getParam('user', 'no user');

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
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
              // marginTop: 66
            }}
          >
            My mood is {this.findMood(this.state.mood)}
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
        </View>

        <View
          style={{
            flexDirection: 'column',
            paddingTop: 100,
            paddingEnd: 35,
            marginBottom: 150
          }}
        >
          <ActionButton
            // active={true}
            degrees={360}
            radius={130}
            outRangeScale={0.8}
            icon={
              <View>
                <Avatar
                  rounded
                  overlayContainerStyle={{
                    borderWidth: 1
                  }}
                  size={175}
                  source={{
                    uri: `${user.imgUrl}`
                  }}
                  title={user.firstName}
                />
                <Badge
                  containerStyle={{ position: 'relative' }}
                  badgeStyle={{
                    backgroundColor: this.findColor(this.state.mood)
                  }}
                  value={this.findMood(this.state.mood) + ' mood'}
                />
              </View>
            }
          >
            {/* MOOD */}
            <ActionButton.Item
              onPress={() =>
                this.props.navigation.navigate('Mood', {
                  user: user
                })
              }
            >
              <View style={{ width: 62, backgroundColor: '#FF9900' }}>
                <Text style={styles.text}>Mood</Text>
              </View>
            </ActionButton.Item>

            {/* FAMILY */}
            <ActionButton.Item
              onPress={() =>
                this.props.navigation.navigate('Family', {
                  user: user
                })
              }
            >
              <View style={{ width: 66, backgroundColor: '#8EB51A' }}>
                <Text style={styles.text}>Family</Text>
              </View>
            </ActionButton.Item>

            {/* EVENTS */}
            <ActionButton.Item
              onPress={() =>
                this.props.navigation.navigate('Events', {
                  user: user
                })
              }
            >
              <View style={{ width: 68, backgroundColor: '#EF5029' }}>
                <Text style={styles.text}>Events</Text>
              </View>
            </ActionButton.Item>

            {/* POLLS */}

            <ActionButton.Item
              onPress={() =>
                this.props.navigation.navigate('Polls', {
                  user: user
                })
              }
            >
              <View style={{ width: 53, backgroundColor: '#7DC6CD' }}>
                <Text style={styles.text}>Polls</Text>
              </View>
            </ActionButton.Item>
          </ActionButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingStart: 5,
    paddingTop: 0,
    paddingBottom: 1,
    marginBottom: 1,
    color: 'white',
    fontSize: 20
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
