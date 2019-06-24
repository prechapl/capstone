import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { getActiveMood } from './store/mood';
import { fetchFamilyMembers } from './store/family';
import { fetchUserRelationships } from './store/users';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { findMoodColor } from './HelperFunctions';
import TwoUpEvents from './Events/TwoUpEvents';
import TwoUpPolls from './Polls/TwoUpPolls';

class TwoUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'Events'
    };
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    this.props.getActiveMood(this.props.user.id);
    this.props.fetchFamilyMembers(this.props.user.familyId);
  };

  generateStatusMeter = value => {
    const colors = [
      { hex: '#009510', val: 1 },
      { hex: '#64c300', val: 0.75 },
      { hex: '#d4b21f', val: 0.5 },
      { hex: '#E68200', val: 0.25 },
      { hex: '#FF2A00', val: 0 }
    ];

    return colors.map(color => {
      let bgColor = color.val <= value ? color.hex : '#ffffff';
      return (
        <View
          key={color.val}
          style={{
            height: 50,
            width: 110,
            backgroundColor: bgColor,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 20
          }}
        />
      );
    });
  };

  generateStatusText = value => {
    const val =
      value < 0.25
        ? 0
        : null || (value > 0 && value < 0.5)
        ? 0.25
        : null || (value > 0.5 && value < 0.75)
        ? 0.5
        : null || (value > 0.75 && value < 1)
        ? 0.75
        : null;

    const score = {
      1: 'extremely ',
      0.75: 'very ',
      0.5: 'somewhat ',
      0.25: 'not very ',
      0: 'not at all '
    };

    return score[val];
  };

  render() {
    const {
      user,
      navigation,
      mood,
      familyMembers,
      userRelationships,
      relativeRelationships
    } = this.props;

    const relative = navigation.getParam('relative');

    if (familyMembers.length && userRelationships.length) {
      const relationship = userRelationships.find(
        relation => relation.RelationshipId === relative.id
      ).status;

      const relativeRelationship = relativeRelationships.find(
        relation => relation.userId === relative.id
      ).status;

      const relativeMoodValue = familyMembers
        .find(member => member.id === relative.id)
        .moods.find(m => m.active).value;

      return (
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingTop: 50,
              paddingHorizontal: 10
            }}
          >
            <Avatar
              rounded
              overlayContainerStyle={{
                borderWidth: 5,
                borderColor: findMoodColor(mood.value)
              }}
              size={100}
              source={{
                uri: `${user.imgUrl}`
              }}
              title={user.firstName}
            />

            <Picker
              selectedValue={this.state.display}
              style={{ height: 100, width: 100, marginBottom: 50 }}
              onValueChange={itemValue => this.setState({ display: itemValue })}
            >
              <Picker.Item label="Reliability" value="Reliability" />
              <Picker.Item label="Events" value="Events" />
              <Picker.Item label="Polls" value="Polls" />
            </Picker>

            <Avatar
              rounded
              overlayContainerStyle={{
                borderWidth: 5,
                borderColor: findMoodColor(relativeMoodValue)
              }}
              size={100}
              source={{
                uri: `${relative.imgUrl}`
              }}
              title={relative.firstName}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 100
            }}
          >
            {this.state.display === 'Reliability' ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row'
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'column',

                        marginRight: 35
                      }}
                    >
                      {this.generateStatusMeter(relationship)}
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', marginLeft: 35 }}>
                      {this.generateStatusMeter(relativeRelationship)}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 35
                  }}
                >
                  <Text>
                    I'm {this.generateStatusText(relationship)}
                    reliable to {relative.firstName}.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 35
                  }}
                >
                  <Text>
                    {relative.firstName} is{' '}
                    {this.generateStatusText(relativeRelationship)}
                    reliable to me.
                  </Text>
                </View>
              </View>
            ) : null}

            {this.state.display === 'Polls' ? <TwoUpPolls /> : null}

            {this.state.display === 'Events' ? (
              <TwoUpEvents relative={relative} />
            ) : null}
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
    getActiveMood: id => dispatch(getActiveMood(id)),
    fetchFamilyMembers: familyId => dispatch(fetchFamilyMembers(familyId)),
    fetchUserRelationships: id => dispatch(fetchUserRelationships(id))
  };
};

const mapStateToProps = ({
  mood,
  user,
  familyMembers,
  userRelationships,
  relativeRelationships
}) => {
  return {
    user,
    mood,
    familyMembers,
    userRelationships,
    relativeRelationships
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TwoUp)
);
