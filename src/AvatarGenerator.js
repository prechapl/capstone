import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { withNavigation } from "react-navigation";
import ActionButton from "react-native-circular-action-menu";

//user, button data,

class AvatarGenerator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { navigation } = this.props;
    // const user = navigation.getParam("user", "no user");

    const { user, buttons } = this.props;

    // if (user.age > 18) {
    return (
      <ActionButton
        active={true}
        degrees={360}
        radius={130}
        outRangeScale={0.8}
        icon={
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
        }
      />

        { buttons.map(button => {
          return (
          <ActionButton.Item
            key={button.title}
            onPress={() =>
              this.props.navigation.navigate(button.title, {
                user: user
              })
            }
          >
            <View style={{ width: 62, backgroundColor: "#FF9900" }}>
              <Text style={styles.text}>Mood</Text>
            </View>
          </ActionButton.Item>
        )})
      } 
  }
}

const styles = StyleSheet.create({
  text: {
    paddingStart: 5,
    paddingTop: 0,
    paddingBottom: 1,
    marginBottom: 1,
    color: "white",
    fontSize: 20
  }
});

export default withNavigation(AvatarGenerator);
