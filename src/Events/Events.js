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
  }
})

class Events extends Component {
  constructor() {
    super();
    this.state = {
      selection: 'MY EVENTS'
    };
  }
  componentDidMount() {
    //must fetch events
    const id = this.props.id;
    this.props.fetchEvents(id);
    this.props.fetchAssigned(id);
  }
  render() {
    let events;
    if (this.props.events.length) {
      this.state.selection === 'MY EVENTS'
        ? (events = this.props.events.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)))
        : (events = this.props.assignedEvents.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)));
    }

    const colorMap = {
      chore: '#AA8EB7',
      event: '#9BB8D5',
      appointment: '#BCD59B',
      errand: '#D79963'
    };

    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: 350,
          paddingBottom: 150
        }}
      >
        <Text style={styles.header}>Events</Text>
        <TouchableOpacity
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

        {/* <Header
          leftComponent={
            <Button
              type="outline"
              title="Events"
              titleStyle={{ color: 'white' }}
              containerStyle={{ width: 100, paddingHorizontal: 10 }}
              onPress={() => this.setState({ selection: 'MY EVENTS' })}
            />
          }
          centerComponent={
            <Button
              type="outline"
              title="Invited"
              titleStyle={{ color: 'white' }}
              containerStyle={{ width: 100, paddingHorizontal: 10 }}
              onPress={() => this.setState({ selection: 'ASSIGNED' })}
            />
          }
          rightComponent={
            <Button
              type="outline"
              title="Add"
              titleStyle={{ color: 'white' }}
              containerStyle={{ width: 100, paddingHorizontal: 10 }}
              onPress={() => this.props.navigation.navigate('AddEvent')}
            />
          }
        /> */}
        <View />
        {events ? (
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
            <Text>You do not have any events.</Text>
          )}
        <TouchableOpacity
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
