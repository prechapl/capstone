import React, { Component } from 'react';
import { Alert } from 'react-native';
import { MapView } from 'expo';

class GeoLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { coords: null }
    };
  }

  componentDidMount() {
    this.findCoordinates();
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = position;
        this.setState({ location: location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 5000 }
    );
  };

  render() {
    const location = this.state.location;
    if (location.coords !== null) {
      const accuracy = location.coords.accuracy;
      const latitude = location.coords.latitude;
      const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
      const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
      const longDelta =
        accuracy /
        (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));
      console.log('latitude', location.coords.latitude);
      console.log('longitude', location.coords.longitude);
      console.log('latitudeDelta', latDelta);
      console.log('longitudeDelta', longDelta);

      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: latitude,
            longitude: location.coords.longitude,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta
          }}
        />
      );
    } else {
      return null;
    }
  }
}

export default GeoLocation;
