import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Header, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchEvents, fetchAssigned } from './store/events';

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
        ? (events = this.props.events)
        : (events = this.props.assignedEvents);
    }

    const colorMap = {
      chore: '#AA8EB7',
      event: '#9BB8D5',
      appointment: '#BCD59B',
      errand: '#D79963'
    };
    if (!events) {
      return <Text>Oops! We don't have any data!</Text>;
    }
    return (
      <View>
        <Header
          leftComponent={
            <Button
              type="clear"
              title="EVENTS"
              titleStyle={{ color: 'white' }}
              onPress={() => this.setState({ selection: 'MY EVENTS' })}
            />
          }
          centerComponent={
            <Button
              type="clear"
              title="INVITED"
              titleStyle={{ color: 'white' }}
              onPress={() => this.setState({ selection: 'ASSIGNED' })}
            />
          }
          rightComponent={
            <Button
              type="clear"
              title="ADD"
              titleStyle={{ color: 'white' }}
              onPress={() => this.props.navigation.navigate('AddEvent')}
            />
          }
        />
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
                subtitle={`${new Date(event.deadline).getMonth()}/${new Date(
                  event.deadline
                ).getDate()}`}
                badge={{
                  value: event.category,
                  badgeStyle: { backgroundColor: colorMap[event.category] }
                }}
              />
            </TouchableOpacity>
          );
        })}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
