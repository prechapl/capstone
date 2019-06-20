import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchEvents, fetchAssigned } from '../store/events';
import { withNavigation } from 'react-navigation';
import EventList from './EventList';
import axios from 'axios';

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
    alignSelf: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#52c2cc',
    width: 300
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

class TwoUpEvents extends Component {
  constructor() {
    super();
    this.state = {
      showingAssigned: false,
      events: []
    };
  }
  componentDidMount() {
    const id = this.props.relative.id;
    if (!this.state.events.length || !this.props.assignedEvents.length) {
      this.props.fetchAssigned(this.props.user.id);
      axios
        .get(
          `https://capstone-api-server.herokuapp.com/api/events/assigned/${id}`
        )
        .then(res => res.data)
        .then(events => this.setState({ events }))
        .catch(e => console.log('error fetching events'));
    }
  }
  render() {
    if (!this.state.events || !this.props.assignedEvents) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }
    const relative = this.props.relative;
    let events;
    let type;
    if (this.state.showingAssigned) {
      events = this.props.assignedEvents.filter(
        ev => ev.ownerId === relative.id
      );
      type = 'ASSIGNED';
    } else {
      events = this.state.events.filter(
        ev => ev.ownerId === this.props.user.id
      );
      type = 'MY EVENTS';
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.state.showingAssigned ? 'Assigned to Me' : 'Created by Me'}
        </Text>
        {events.length ? (
          <EventList eventlist={events} type={type} />
        ) : (
          <Text style={{ margin: 10, padding: 10, textAlign: 'center' }}>
            No Events
          </Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!this.state.showingAssigned) {
              this.setState({ showingAssigned: true });
            } else {
              this.setState({ showingAssigned: false });
            }
          }}
        >
          <Text style={styles.buttonText}>
            {this.state.showingAssigned
              ? `Show events I've assigned to ${relative.firstName}`
              : `Show events assigned to me by ${relative.firstName}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ user, events, assignedEvents }) => ({
  user,
  events,
  assignedEvents
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: id => dispatch(fetchEvents(id)),
  fetchAssigned: id => dispatch(fetchAssigned(id))
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TwoUpEvents)
);
