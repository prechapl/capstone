import React, { Component } from "react";
import { Picker, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { getActiveMood } from "./store/mood";
import { fetchFamilyMembers } from "./store/family";
import { fetchUserRelationships } from "./store/users";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { findMoodColor } from "./HelperFunctions";
import TwoUpEvents from "./Events/TwoUpEvents";
import TwoUpPolls from "./Polls/TwoUpPolls";

class TwoUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Polls"
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
      { hex: "#009510", val: 0.75 < value && value >= 1 },
      { hex: "#64c300", val: 1 > value && value >= 0.75 },
      { hex: "#d4b21f", val: 0.75 > value && value >= 0.5 },
      { hex: "#E68200", val: 0.5 > value && value >= 0.25 },
      { hex: "#FF2A00", val: 0.25 < value && value >= 0 }
    ];
    return colors.map(color => {
      let bgColor = color.val <= value ? color.hex : "#ffffff";
      return (
        <View
          key={color.hex}
          style={{
            height: 50,
            width: 130,
            backgroundColor: bgColor,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 20
          }}
        />
      );
    });
  };

  // generateReliabilityText = value => {
  //   const score = {
  //     1: 'extremely',
  //     0.75: 'very',
  //     0.5: 'kind of',
  //     0.25: 'not very',
  //     0: 'not at all'
  //   };
  //   return score[value];
  // };

  render() {
    const {
      user,
      navigation,
      mood,
      familyMembers,
      userRelationships,
      relativeRelationships
    } = this.props;

    const relative = navigation.getParam("relative");

    if (familyMembers.length && userRelationships.length) {
      const relationship = userRelationships.find(
        relation => relation.RelationshipId === relative.id
      );
      const relativeRelationship = relativeRelationships.find(
        relation => relation.userId === relative.id
      );

      const relativeMoodValue = familyMembers
        .find(member => member.id === relative.id)
        .moods.find(m => m.active).value;

      console.log("relationship.status", relationship.status);

      // const score = {
      //   1: "extremely",
      //   0.75: "very",
      //   0.5: "kind of",
      //   0.25: "not very",
      //   0: "not at all"
      // };

      return (
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
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
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 100
            }}
          >
            {this.state.display === "Reliability" ? (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",

                        marginRight: 35
                      }}
                    >
                      {this.generateStatusMeter(relationship.status)}
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "column", marginLeft: 35 }}>
                      {this.generateStatusMeter(relativeRelationship.status)}
                    </View>
                  </View>
                </View>
              </View>
            ) : null}

            {this.state.display === "Polls" ? <TwoUpPolls /> : null}

            {this.state.display === "Events" ? (
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

// <View style={{ flexDirection: "row" }}>
// <Text>
//   {/* I'm {score.relationship.status} */}
//   reliable to {relative.firstName}
// </Text>
// </View>
