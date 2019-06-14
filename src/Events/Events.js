import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchEvents, fetchAssigned } from '../store/events';
import { withNavigation } from 'react-navigation';


const styles = StyleSheet.create({
  header: {
    padding: 10,
    margin: 10,
    fontSize: 30,
    textAlign: 'center'
  },
  buttonText: {
    textAlign: 'center'
  },
  button: {
    margin: 10,
    padding: 10
  }
})

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
  render() {
    let events = [];
    if (this.props.events.length) {
      this.state.selection === 'MY EVENTS'
        ? (events = [...this.props.events.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))])
        : (events = [...this.props.assignedEvents.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))]);
    }

    const colorMap = {
      chore: '#AA8EB7',
      event: '#9BB8D5',
      appointment: '#BCD59B',
      errand: '#D79963'
    };

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
          justifyContent: 'center',
          paddingBottom: 150
        }}
      >
        <Text style={styles.header}>Events</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (this.state.selection === 'MY EVENTS') {
              this.setState({ selection: 'ASSIGNED' });
            } else {
              this.setState({ selection: 'MY EVENTS' })
            }
          }}
        >
          <Text
            style={styles.buttonText}>
            {this.state.selection === 'MY EVENTS' ? 'see events assigned to me' : 'see events created by me'}
          </Text>
        </TouchableOpacity>


        <View />
        {events.length ? (
          <View>
            {events.map((event, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    if (this.state.selection === 'MY EVENTS') {
                      this.props.navigation.navigate('Event', {
                        event: event
                      });
                    } else {
                      this.props.navigation.navigate('EventAssigned', {
                        event: event
                      });
                    }
                  }}
                >
                  <ListItem
                    key={i}
                    title={event.title}
                    subtitle={`${new Date(
                      event.deadline
                    ).getMonth()}/${new Date(event.deadline).getDate()}`}
                    badge={{
                      value: event.category,
                      badgeStyle: { backgroundColor: colorMap[event.category] }
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
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
          style={styles.button}
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
