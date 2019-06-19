import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  TouchableOpacity,
  View,
  DatePickerIOS
} from 'react-native';
import { connect } from 'react-redux';
import { goCreateEvent } from '../store/events';
import { withNavigation } from 'react-navigation';

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      category: 'Event',
      description: '',
      showDatePicker: false,
      showCatPicker: false
    };
    this.showDatePicker = false;
  }
  setDate = newDate => {
    this.setState({ deadline: newDate });
  };
  save = () => {
    const id = this.props.id;
    const newEvent = this.state;
    if (!newEvent.description.length) delete newEvent.description;
    newEvent.ownerId = id;
    this.props.saveEvent(newEvent);
    this.setState({
      title: '',
      category: 'Event',
      description: '',
      showDatePicker: false,
      showCatPicker: false
    });
    this.props.navigation.pop();
  };
  toggleDatePicker = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  };
  toggleCategoryPicker = () => {
    this.setState({ showCatPicker: !this.state.showCatPicker });
  };
  // eslint-disable-next-line complexity
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        {!this.state.showCatPicker && !this.state.showDatePicker ? (
          <View style={styles.container}>
            <Text style={styles.mainHeader}>New Event</Text>
            <Text style={styles.header}>Title</Text>
            <TextInput
              onChangeText={title => this.setState({ title })}
              style={styles.input}
              value={this.state.title}
            />
            <Text style={styles.header}>Description</Text>
            <TextInput
              onChangeText={description => this.setState({ description })}
              style={styles.descriptionInput}
              value={this.state.description}
            />
            {this.state.deadline ? (
              <Text style={styles.text}>
                Deadline: {this.state.deadline.toString()}
              </Text>
            ) : (
              <Text style={styles.header}>No Deadline</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={this.toggleDatePicker}
            >
              <Text style={styles.buttonText}>Add or Edit Deadline</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Category: {this.state.category} </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.toggleCategoryPicker}
            >
              <Text style={styles.buttonText}>Edit Category</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                !this.state.title.length ? styles.buttonDisabled : styles.button
              }
              onPress={this.save}
              disabled={!this.state.title.length ? true : false}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {this.state.showCatPicker ? (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly'
            }}
          >
            <Picker
              selectedValue={this.state.category}
              onValueChange={category => this.setState({ category })}
              style={{ flex: 0.5, height: 30, width: 250 }}
              itemStyle={{ fontSize: 18 }}
            >
              <Picker.Item label="Event" value="event" />
              <Picker.Item label="Chore" value="chore" />
              <Picker.Item label="Appointment" value="appointment" />
              <Picker.Item label="Errand" value="errand" />
            </Picker>
            <TouchableOpacity
              style={styles.button}
              onPress={this.toggleCategoryPicker}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {this.state.showDatePicker ? (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly'
            }}
          >
            <DatePickerIOS
              style={{ height: 30, width: 250, flex: 0.5 }}
              date={this.state.deadline || new Date()}
              onDateChange={this.setDate}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.toggleDatePicker}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    id: user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveEvent: newEvent => dispatch(goCreateEvent(newEvent))
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    backgroundColor: '#D3D3D4',
    marginBottom: 20,
    width: 300,
    paddingHorizontal: 10
  },
  descriptionInput: {
    height: 70,
    backgroundColor: '#D3D3D4',
    marginBottom: 20,
    width: 300,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#448AE6',
    padding: 10,
    width: 300,
    margin: 10,
    textAlign: 'center',
    borderRadius: 50
  },
  buttonDisabled: {
    backgroundColor: '#dce5f2',
    padding: 10,
    width: 300,
    margin: 10,
    borderRadius: 50
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  header: {
    padding: 5,
    margin: 5,
    fontSize: 18
  },
  mainHeader: {
    padding: 5,
    margin: 5,
    fontSize: 26
  },
  text: {
    textAlign: 'center',
    padding: 10,
    margin: 10
  }
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddEvent)
);
