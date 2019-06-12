import React, { Component } from "react";
import { MapView } from "expo";

class Mapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
  }

  componentDidMount() {
    // console.log(this.props);
    // this.setState({ location: this.props.navigation.getParam("location") });
  }
  // calDelta = (lat, accuracy) => {
  //   lat = this.state.location.coords.latitude;
  //   accuracy = this.state.location.coords.accuracy;
  //   const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  //   const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
  //   const longDelta =
  //     accuracy /
  //     (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

  //   this.setState({
  //     delta: {
  //       latitudeDelta: latDelta,
  //       longitudeDelta: longDelta
  //     }
  //   });
  // };

  render() {
    return (
      <MapView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: this.state.delta.latitudeDelta,
          longitudeDelta: this.state.delta.longitudeDelta
        }}
      />
    );
  }
}

export default Mapper;
