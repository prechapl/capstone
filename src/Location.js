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
    // this.state = {
    //   location: { coords: null }
    // };
    this.state = {
      location: {
        coords: {
          accuracy: 5,
          altitude: 0,
          altitudeAccuracy: -1,
          heading: -1,
          latitude: 37.785834,
          longitude: -122.406417,
          speed: -1
        }
      }
    };
  }

  // componentDidMount() {
  //   const findCoordinates = async () =>
  //     await navigator.geolocation.getCurrentPosition(
  //       position => {
  //         const location = JSON.stringify(position);
  //         this.setState({ location });
  //       },
  //       error => Alert.alert(error.message),
  //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //     );
  //   findCoordinates();
  // }

  render() {
    const relative = this.props.navigation.getParam('relative');
    // const mood = this.props.navigation.getParam('mood');
    // console.log('mood', mood);
    // console.log('relative', relative.moods[0].value);

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
                  borderColor: relative.moods[0].value
                }}
                size={50}
                source={{
                  uri: `${relative.imgUrl}`
                }}
                title={relative.firstName}
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
