import React from "react";
import { View } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

const AvatarChild = props => {
  const generateButtons = () => {
    const buttonsChild = [
      "Events",
      "Grades",
      "Gratitude",
      "Goals",
      "Location",
      "Mood",
      "Polls",
      "Sports",
      "Values"
    ];
    return (
      <View>
        {buttonsChild.map((title, idx) => (
          <View
            style={{
              flexDirection: "column"
              // justifyContent: "space-between"
            }}
            key={idx}
          >
            <Button
              title={title}
              onPress={() => props.navigation.navigate(title)}
              buttonStyle={{ backgroundColor: "#7DC6CD", margin: 24 }}
            />
          </View>
        ))}
      </View>
    );
  };

  const navigation = props.navigation;
  // const userTitle = navigation.getParam("firstName", "no name");
  const url = navigation.getParam("imgUrl", "no url");
  const user = navigation.getParam("user", "no user");
  // const user = props.user;
  console.log("url", url);
  console.log("user", user);
  // console.log("navigation", navigation);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column"
      }}
    >
      {generateButtons()}

      <Avatar
        keyExtractor={index => index.toString()}
        rounded
        overlayContainerStyle={{
          borderWidth: 1,
          margin: 10
        }}
        size={125}
        title={user.firstName}
        source={{
          uri: user.imgUrl
        }}
        onPress={() =>
          props.navigation.navigate("AvatarChild", {
            firstName: user.firstName,
            imgUrl: user.imgUrl,
            user: user
          })
        }
      />
    </View>
  );
};

export default withNavigation(AvatarChild);
