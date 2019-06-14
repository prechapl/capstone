import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import { connect } from 'react-redux';
import { goDeleteEvent, fetchAssignees, goUpdateEvent, invite } from '../store/events';
import { updateRelationshipStatus } from '../store/users';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    padding: 10,
    margin: 10
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
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});

class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStatusPicker: false,
      showAssigneePicker: false,
      assignee: '',
      status: ''
    };
  }
  componentDidMount() {
    this.props.fetchAssignees(this.props.navigation.getParam('event').id);
  }
  invite = id => {
    this.props.invite(id, this.state.assignee);
    this.toggleAssigneePicker();
  }
  delete = (id, userId) => {
    this.props.deleteEvent(id, userId);
    this.props.navigation.pop();
  };
  updateStatus = id => {
    this.props.updateEvent(id, { status: this.state.status });
    if (this.state.status === 'completed') {
      this.props.assignees.forEach(assignee => {

        this.props.updateRel(this.props.user.id, assignee.id, 0.25)
      })
    }
    this.toggleStatusPicker();
  };
  toggleStatusPicker = () => {
    const show = !this.state.showStatusPicker;
    this.setState({ showStatusPicker: show });
  };
  toggleAssigneePicker = () => {
    this.setState({ showAssigneePicker: !this.state.showAssigneePicker });
  };

  render() {
    const event = this.props.events.find(
      ev => ev.id === this.props.navigation.getParam('event').id
    );
    const deadline = new Date(event.deadline);
    const statusColor = {
      upcoming: 'blue',
      overdue: 'orange',
      'completed-pending': 'yellow',
      completed: 'green',
      missed: 'red'
    };
    const colorMap = {
      chore: '#AA8EB7',
      event: '#9BB8D5',
      appointment: '#BCD59B',
      errand: '#D79963'
    };
    if (!event) {
      return (
        <View>
          <Text>OOPS! There is nothing here</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, color: colorMap[event.category], padding: 15 }}>
          {event.title} ({event.category})
        </Text>

        {this.state.showAssigneePicker ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Picker
              selectedValue={this.state.assignee}
              style={{ height: 150, width: 250, margin: 10 }}
              onValueChange={(val, idx) => this.setState({ assignee: val })}
            >
              <Picker.Item label="select a family member to invite" value="" />
              {this.props.family.filter(user => user.id !== event.ownerId && !this.props.assignees.find(assignee => assignee.id === user.id))
                .map(user => {
                  return (
                    <Picker.Item label={user.firstName} value={user.id} key={user.id} />
                  )
                })
              }
            </Picker>
            <TouchableOpacity
              onPress={() => this.invite(event.id)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>invite</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toggleAssigneePicker}
              style={styles.button}
            >
              <Text style={styles.buttonText}>cancel</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {this.state.showStatusPicker ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Picker
              selectedValue={this.state.status}
              style={{ height: 150, width: 250, margin: 10 }}
              onValueChange={(val, idx) => this.setState({ status: val })}
            >
              <Picker.Item label="upcoming" value="upcoming" />
              <Picker.Item label="completed" value="completed" />
              <Picker.Item label="overdue" value="overdue" />
              <Picker.Item label="missed" value="missed" />
            </Picker>

            <View>
              <TouchableOpacity
                onPress={() => this.updateStatus(event.id)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.toggleStatusPicker}
                style={styles.button}
              >
                <Text style={styles.buttonText}>cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {!this.state.showStatusPicker && !this.state.showAssigneePicker ? (
          <View
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: statusColor[event.status],
                margin: 10,
                padding: 10,
                width: 100
              }}
              onPress={this.toggleStatusPicker}
            >
              <Text
                style={styles.buttonText}
              >
                {event.status}
              </Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              {deadline.getMonth()}/{deadline.getDate()}/{deadline.getFullYear()} at
              {deadline.getHours()}:
              {('0' + deadline.getMinutes()).slice(-2)}
            </Text>
            <Text style={styles.text}>{event.description}</Text>
            <Text style={styles.text}>
              {this.props.assignees.length
                ? `Assigned to: ${this.props.assignees.map(user => user.firstName).join(', ')}`
                : 'not yet assigned'}
            </Text>
            <TouchableOpacity
              onPress={this.toggleAssigneePicker}
              style={styles.button}
            >
              <Text style={styles.buttonText}>invite someone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.delete(event.id, event.ownerId)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>delete</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = ({ assignees, events, moods, user }) => {
  return {
    user,
    assignees,
    events,
    family: moods
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteEvent: (id, userId) => dispatch(goDeleteEvent(id, userId)),
    fetchAssignees: id => dispatch(fetchAssignees(id)),
    updateEvent: (id, updates) => dispatch(goUpdateEvent(id, updates)),
    invite: (evId, userId) => dispatch(invite(evId, userId)),
    updateRel: (userId, relationshipId, diff) => dispatch(updateRelationshipStatus(userId, relationshipId, diff))
  };
};

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleEvent));
