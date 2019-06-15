import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { goUpdateAssigned } from '../store/events';
// import withNavigation from 'react-navigation';

const SingleEventAssigned = props => {
  const event = props.assignedEvents.find(
    ev => ev.id === props.navigation.getParam('event').id
  );
  const deadline = new Date(event.deadline);
  const badgeStatusMap = {
    upcoming: 'primary',
    completed: 'success',
    'completed-pending': 'warning',
    overdue: 'warning',
    missed: 'error'
  };
  const colorMap = {
    chore: '#AA8EB7',
    event: '#9BB8D5',
    appointment: '#BCD59B',
    errand: '#D79963'
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: colorMap[event.category], padding: 15 }}>
        {event.title} ({event.category})
        </Text>
      <Badge value={event.status} status={badgeStatusMap[event.status]} />
      <Text style={styles.text}>
        {deadline.getMonth()}/{deadline.getDate()}/{deadline.getFullYear()} at
              {deadline.getHours()}:
              {('0' + deadline.getMinutes()).slice(-2)}
      </Text>
      <Text>Invited by: {props.family.find(user => user.id === event.ownerId).firstName}</Text>
      {event.description ? (<Text style={styles.text}>{event.description}</Text>) : null}
      <TouchableOpacity
        onPress={() =>
          props.completeAssignedTask(event.id, { status: 'completed-pending' })
        }
        style={styles.button}
      >
        <Text>complete</Text>
      </TouchableOpacity>
    </View>

  );
};

const mapStateToProps = ({ assignedEvents, moods }) => {
  return {
    assignedEvents,
    family: moods
  };
};

const mapDispatchToProps = dispatch => {
  return {
    completeAssignedTask: (id, updates) =>
      dispatch(goUpdateAssigned(id, updates))
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#448AE6',
    padding: 10,
    width: 300,
    margin: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  header: {
    padding: 10,
    marginBottom: 30,
    fontSize: 35
  },
  text: {
    textAlign: 'center',
    padding: 10,
    margin: 10
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleEventAssigned);
