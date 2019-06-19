import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchEvents, fetchAssigned } from '../store/events';
import { withNavigation } from 'react-navigation';
import EventList from './EventList';

const styles = StyleSheet.create({
  header: {
    padding: 10,
    margin: 10,
    fontSize: 30,
    textAlign: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#dce5f2',
    alignSelf: 'center',
    borderRadius: 50
  },
  submitButton: {
    backgroundColor: '#64c300',
    alignSelf: 'center',
    borderRadius: 50
  }
});

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'MY EVENTS'
    };
  }
  componentDidMount() {
    //must fetch events
    const id = this.props.id;
    if (!this.props.events.length) {
      this.props.fetchEvents(id);
      this.props.fetchAssigned(id);
    }
  }
  // eslint-disable-next-line complexity
  render() {
    let events = [];
    if (this.props.events.length) {
      this.state.selection === 'MY EVENTS'
        ? (events = [
            ...this.props.events.sort(
              (a, b) => new Date(a.deadline) - new Date(b.deadline)
            )
          ])
        : (events = [
            ...this.props.assignedEvents.sort(
              (a, b) => new Date(a.deadline) - new Date(b.deadline)
            )
          ]);
    }

    if (!this.props.events || !this.props.assignedEvents) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          paddingBottom: 100
        }}
      >
        <Text style={styles.header}>Events</Text>
        {events.length ? (
          <EventList
            eventlist={events}
            id={this.props.id}
            type={this.state.selection}
          />
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              margin: 10
            }}
          >
            You do not have any events.
          </Text>
        )}
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: '#8EB51A',
            padding: 10,
            margin: 10,
            width: 300
          }}
          onPress={() => this.props.navigation.navigate('AddEvent')}
        >
          <Text style={styles.buttonText}>Add a New Event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: '#7DC6CD',
            padding: 10,
            margin: 10,
            width: 300
          }}
          onPress={() => {
            if (this.state.selection === 'MY EVENTS') {
              this.setState({ selection: 'ASSIGNED' });
            } else {
              this.setState({ selection: 'MY EVENTS' });
            }
          }}
        >
          <Text style={styles.buttonText}>
            {this.state.selection === 'MY EVENTS'
              ? 'My Assigned Events'
              : 'My Created Events'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ events, assignedEvents, user }) => {
  return {
    id: user.id,
    events,
    assignedEvents
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: id => dispatch(fetchEvents(id)),
    fetchAssigned: id => dispatch(fetchAssigned(id))
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Events)
);
