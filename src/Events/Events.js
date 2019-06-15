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
    margin: 10,
    padding: 10,
    width: 200,
    alignSelf: 'center'
  }
});

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: 'MY EVENTS',
      viewPast: false
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
        ? (events = [...this.props.events.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))])
        : (events = [...this.props.assignedEvents.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))]);
    }
    if (this.state.viewPast) {
      events = events.filter(ev => {
        if (ev.status === 'completed' || ev.status === 'missed') {
          return ev;
        }
      });
    }
    else {
      events = events.filter(ev => {
        if (ev.status !== 'completed' && ev.status !== 'missed') {
          return ev;
        }
      })
    }
    if (!this.props.events || !this.props.assignedEvents) {
      return (
        <View>
          <Text>loading...</Text>
        </View>)
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          paddingBottom: 150
        }}
      >
        <Text style={styles.header}>Events</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: '#81769e' }}
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
                ? 'see events assigned to me'
                : 'see events created by me'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: '#9e8376' }}
            onPress={() => {
              this.setState({ viewPast: !this.state.viewPast })
            }}
          >
            <Text style={styles.buttonText}>
              {this.state.viewPast
                ? 'current' : 'past'}
            </Text>
          </TouchableOpacity>
        </View>
        <View />
        {events.length ? (
          <EventList eventlist={events} type={this.state.selection} />
        ) : (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                margin: 10,
              }}
            >You do not have any events.
            </Text>
          )}
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: '#668e6c' }}
          onPress={() => this.props.navigation.navigate('AddEvent')}
        >
          <Text style={styles.buttonText}>Add a New Event</Text>
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
