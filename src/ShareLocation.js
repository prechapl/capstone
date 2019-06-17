import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import openSocket from 'socket.io-client';
// import io from "socket.io-client";

class ShareLocation extends Component {
  constructor() {
    super();
    this.state = {
      permitLocationShare: false,
      location: null,
      errorMessage: null
    };
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    const { permitLocationShare, location } = this.state;

    if (location !== null) {
      const accuracy = location.coords.accuracy;
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
      const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
      const longDelta =
        accuracy /
        (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));
      console.log('latitude', latitude);
      console.log('longitude', longitude);
      console.log('latitudeDelta', latDelta);
      console.log('longitudeDelta', longDelta);
    }
    // const socket = io("http://localhost");

    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (location) {
      text = JSON.stringify(location);
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Switch
          value={permitLocationShare}
          onValueChange={() =>
            this.setState({ permitLocationShare: !permitLocationShare })
          }
        />
        {location && permitLocationShare ? (
          <View>
            <Text> Sharing my location: </Text>
            <Text> {text} </Text>
          </View>
        ) : null}
      </View>
    );
  }
}
export default ShareLocation;

//location request with a users object { target: [target user's id], requester: [requester's user id] }

//   socket.on('request_loc', users =>
//     socket.to(users.target).emit('request_loc', users.requester)
//   );

//location respond with the id of the user who requested it, and the coordinates in an object

//   socket.on('response_location', response =>
//     socket.to(response.requester).emit('response_location', response.coords)
//   );