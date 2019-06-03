import React, { Component } from "react";
import { View } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

class AvatarChild extends Component {
  render() {
    const { navigation } = this.props;
    const user = navigation.getParam("user", "no user");

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Button
              title="Events"
              onPress={() => this.props.navigation.navigate("Events")}
              buttonStyle={{ backgroundColor: "#7DC6CD", margin: 6 }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Button
              title="Grades"
              onPress={() => this.props.navigation.navigate("Grades")}
              buttonStyle={{ backgroundColor: "#7DC6CD", margin: 6 }}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Button
              title="Gratitude"
              onPress={() => this.props.navigation.navigate("Gratitude")}
              buttonStyle={{ backgroundColor: "#7DC6CD", margin: 6 }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Button
              title="Goals"
              onPress={() => this.props.navigation.navigate("Goals")}
              buttonStyle={{ backgroundColor: "#7DC6CD", margin: 6 }}
            />
          </View>
          <Avatar
            keyExtractor={item => item.key}
            rounded
            overlayContainerStyle={{
              borderWidth: 1,
              margin: 10
            }}
            size={150}
            title={user.firstName}
            source={{
              uri: user.imgUrl
            }}
            onPress={() =>
              this.props.navigation.navigate("AvatarChild", {
                firstName: user.firstName,
                imgUrl: user.imgUrl,
                user: user
              })
            }
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Button
              title="Location"
              onPress={() => this.props.navigation.navigate("Location")}
              buttonStyle={{ backgroundColor: "#7DC6CD", margin: 6 }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Button
              title="Moods"
              onPress={() => this.props.navigation.navigate("Moods")}
              buttonStyle={{ backgroundColor: "#7DC6CD", margin: 6 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Button
                title="Polls"
                onPress={() => this.props.navigation.navigate("Polls")}
                buttonStyle={{ backgroundColor: "#7DC6CD", margin: 6 }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Button
              title="Sports"
              onPress={() => this.props.navigation.navigate("Sports")}
              buttonStyle={{ backgroundColor: "#7DC6CD", margin: 6 }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Button
              title="Values"
              onPress={() => this.props.navigation.navigate("Values")}
              buttonStyle={{ backgroundColor: "#7DC6CD", margin: 6 }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(AvatarChild);
