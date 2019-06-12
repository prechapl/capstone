import React, { Component } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { MapView } from "expo";

class GeoLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
  }

  componentDidMount() {
    this.findCoordinates();
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  calDelta = (lat, accuracy) => {
    lat = this.state.location.coords.latitude;
    accuracy = this.state.location.coords.accuracy;
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta =
      accuracy /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    return {
      latitudeDelta: latDelta,
      longitudeDelta: longDelta
    };
  };

  render() {
    // console.log(this.state.location);
    console.log(this.calDelta().latitudeDelta);

    return (
      <View style={styles.container}>
        {this.state.location !== null ? (
          <MapView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: this.calDelta().latitudeDelta,
              longitudeDelta: this.calDelta().longitudeDelta
            }}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default GeoLocation;
