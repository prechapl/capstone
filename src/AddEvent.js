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
import { goCreateEvent } from './store/events';


class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      category: 'event',
      description: '',
      showDatePicker: false,
      showCatPicker: false
    };
    this.showDatePicker = false;
  }
  setDate = (newDate) => {
    this.setState({ deadline: newDate });
  }
  save = () => {
    const id = this.props.id;
    const newEvent = this.state;
    if (!newEvent.description.length) delete newEvent.description;
    newEvent.ownerId = id;
    this.props.saveEvent(newEvent);
    this.props.navigation.navigate('Events');
  }
  toggleDatePicker = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  }
  toggleCategoryPicker = () => {
    this.setState({ showCatPicker: !this.state.showCatPicker });
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.header}>New Event</Text>
        {!this.state.showCatPicker && !this.state.showDatePicker ? (
          <View>
            <Text>Title</Text>
            <TextInput
              onChangeText={title => this.setState({ title })}
              style={styles.input}
            />
            <Text>Description</Text>
            <TextInput
              onChangeText={description => this.setState({ description })}
              style={styles.input}
            />
            {this.state.deadline ? (
              <Text>
                Deadline: {this.state.deadline.toString()}
              </Text>
            ) : (
                <Text>
                  No Deadline
                </Text>
              )}
            <TouchableOpacity style={styles.button} onPress={this.toggleDatePicker}>
              <Text>Add or Edit Deadline</Text>
            </TouchableOpacity>
            <Text>Category: {this.state.category} </Text>
            <TouchableOpacity style={styles.button} onPress={this.toggleCategoryPicker}>
              <Text>Edit Category</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.save}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {this.state.showCatPicker ? (
          <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}>
            <Picker
              selectedValue={this.state.category}
              onValueChange={category => this.setState({ category })}
              style={{ flex: 0.5, height: 30, width: 250 }}
              itemStyle={{ fontSize: 18 }}
            >
              <Picker.Item label="event" value="event" />
              <Picker.Item label="chore" value="chore" />
              <Picker.Item label="appointment" value="appointment" />
              <Picker.Item label="errand" value="errand" />
            </Picker>
            <TouchableOpacity
              style={styles.button}
              onPress={this.toggleCategoryPicker}
            >
              <Text>back</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {this.state.showDatePicker ? (
          <View style={{
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
              <Text>back</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </KeyboardAvoidingView >
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent);
