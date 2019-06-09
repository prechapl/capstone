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

    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: 300,
          // flex: 1,
          // paddingTop: 50,
          paddingBottom: 150
        }}
      >
        <Header
          leftComponent={
            <Button
              type="solid"
              title="Events"
              titleStyle={{ color: 'white' }}
              containerStyle={{ width: 100, paddingHorizontal: 10 }}
              onPress={() => this.setState({ selection: 'EVENTS' })}
            />
          }
          centerComponent={
            <Button
              type="solid"
              title="Invited"
              titleStyle={{ color: 'white' }}
              containerStyle={{ width: 100, paddingHorizontal: 10 }}
              onPress={() => this.setState({ selection: 'ASSIGNED' })}
            />
          }
          rightComponent={
            <Button
              type="solid"
              title="Add"
              titleStyle={{ color: 'white' }}
              containerStyle={{ width: 100, paddingHorizontal: 10 }}
              onPress={() => this.props.navigation.navigate('AddEvent')}
            />
          }
          containerStyle={{ backgroundColor: 'transparent' }}
          // containerStyle={{ backgroundColor: '#EF5029'}}
        />
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
                    containerStyle={{
                      backgroundColor: colorMap[event.category]
                    }}
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
