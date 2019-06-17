import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Alert, Text, View } from 'react-native';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import { Avatar } from 'react-native-elements';
import { findMoodColor } from './HelperFunctions';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { coords: null }
    };
  }

  componentDidMount() {
    // this.findCoordinates();
  }

  // findCoordinates = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       const loc = position;
  //       this.setState({ location: loc });
  //     },
  //     error => Alert.alert(error.message),
  //     { enableHighAccuracy: true, timeout: 30000, maximumAge: 5000 }
  //   );
  // };

  render() {
    const familyMember = this.props.navigation.getParam('familyMember');
    // const user = this.props.navigation.getParam('user');
    const mood = this.props.navigation.getParam('mood');
    const locate = this.state.location;
    if (locate.coords !== null) {
      const accuracy = locate.coords.accuracy;
      const latitude = locate.coords.latitude;
      const longitude = locate.coords.longitude;
      const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
      const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
      const longDelta =
        accuracy /
        (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));
      console.log('latitude', locate.coords.latitude);
      console.log('longitude', locate.coords.longitude);
      console.log('latitudeDelta', latDelta);
      console.log('longitudeDelta', longDelta);

      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: latitude,
            longitude: locate.coords.longitude,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta
          }}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude
            }}
            title="username"
            description="location of user"
          >
            <View>
              <Avatar
                rounded
                overlayContainerStyle={{
                  borderWidth: 7,
                  borderColor: findMoodColor(mood.value)
                }}
                size={50}
                source={{
                  uri: `${familyMember.imgUrl}`
                }}
                title={familyMember.firstName}
              />
            </View>
          </Marker>
        </MapView>
      );
    } else {
      return (
        <View style={{ paddingBottom: 50 }}>
          <Text>No FamilyMember coordinates</Text>
        </View>
      );
    }
  }
}

export default withNavigation(Location);
