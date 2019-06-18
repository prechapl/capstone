import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { AsyncStorage, Alert, Text, View } from 'react-native';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import { Avatar } from 'react-native-elements';
import { findMoodColor } from './HelperFunctions';
import SocketIOClient from 'socket.io-client';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { coords: null }
    };
  }

  componentDidMount() {
    const getToken = async () => {
      const _token = await AsyncStorage.getItem('token');
      console.log('token in Two Up', _token);
      return _token;
    };

    const socket = SocketIOClient(
      'https://capstone-api-server.herokuapp.com/',
      {
        extraHeaders: { authorization: getToken() }
      }
    );
    socket.connect();

    const { user, relative } = this.props;
    // console.log('relative in location', relative);
    socket.on('request_loc', {
      target: relative.id,
      requester: user.id
    });
    // .then(positionData => {
    //   console.log('positionData in location', positionData);
    //   this.setState({
    //     location: positionData
    //   });
    // });
  }

  // findCoordinates = () => {

  //   // const user = this.props.navigation.getParam('user');
  //   // const relative = this.props.navigation.getParam('relative');

  //     .then(positionData => {
  //       console.log('positionData in location', positionData);
  //       this.setState({
  //         location: positionData
  //       });
  //     });
  // };

  // findCoordinates = () => {
  //   this.socket.on('response_location', positionData => {
  //     console.log('positionData', positionData);
  //     this.setState({
  //       location: positionData
  //     });
  //   });
  // };

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
    // const user = this.props.navigation.getParam('user');
    const relative = this.props.navigation.getParam('relative');
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
