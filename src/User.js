import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    borderWidth: 1
  },
  col: {
    flexDirection: "column",
    alignItems: "center"
  },
  fitButton: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

class User extends React.Component {
  render() {
    const { navigation } = this.props;
    const userTitle = navigation.getParam("firstName", "no name");
    const url = navigation.getParam("imgUrl", "no url");
    console.log("url in User", url);

    return (
      <View style={styles.container}>
        <View style={styles.col} />
        <Button
          title="Family"
          onPress={() => this.props.navigation.navigate("Family")}
          buttonStyle={{ backgroundColor: "#8EB51A", margin: 24 }}
        />
        <View style={styles.col}>
          <View style={styles.fitButton}>
            <Button
              title="Mood"
              onPress={() => this.props.navigation.navigate("Mood")}
              buttonStyle={{ backgroundColor: "#FF9900", margin: 24 }}
            />
          </View>
          <Avatar
            rounded
            overlayContainerStyle={styles.avatar}
            size={150}
            source={{
              uri: `${url}`
            }}
            title={userTitle.slice(0, 1)}
          />
          <Button
            title="Values"
            onPress={() => this.props.navigation.navigate("Values")}
            buttonStyle={{ backgroundColor: "#7DC6CD", margin: 24 }}
          />
        </View>
        <Button
          title="Events"
          onPress={() => this.props.navigation.navigate("Events")}
          buttonStyle={{ backgroundColor: "#EF5029", margin: 24 }}
        />
        <View style={styles.col} />
      </View>
    );
  }
}

export default withNavigation(User);

//testing connecting lines

{
  /* <View style={{ paddingLeft: 0 }}>
<Svg width="300" height="300" style={{ paddingTop: 0 }}>
  <Line x1="0" y1="0" x2="35" y2="35" stroke="red" strokeWidth="3" />
</Svg>
</View> */
}
