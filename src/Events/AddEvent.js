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
    this.setState({
      title: '',
      category: 'event',
      description: '',
      showDatePicker: false,
      showCatPicker: false
    });
    this.props.navigation.pop();
  }
  toggleDatePicker = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  }
  toggleCategoryPicker = () => {
    this.setState({ showCatPicker: !this.state.showCatPicker });
  }
  // eslint-disable-next-line complexity
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.header}>New Event</Text>
        {!this.state.showCatPicker && !this.state.showDatePicker ? (
          <View style={styles.container}>
            <Text style={styles.text}>Title</Text>
            <TextInput
              onChangeText={title => this.setState({ title })}
              style={styles.input}
              value={this.state.title}
            />
            <Text style={styles.text}>Description</Text>
            <TextInput
              onChangeText={description => this.setState({ description })}
              style={styles.input}
              value={this.state.description}
            />
            {this.state.deadline ? (
              <Text style={styles.text}>
                Deadline: {this.state.deadline.toString()}
              </Text>
            ) : (
                <Text style={styles.text} >
                  No Deadline
                </Text>
              )}
            <TouchableOpacity style={styles.button} onPress={this.toggleDatePicker}>
              <Text style={styles.buttonText}>Add or Edit Deadline</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Category: {this.state.category} </Text>
            <TouchableOpacity style={styles.button} onPress={this.toggleCategoryPicker}>
              <Text style={styles.buttonText}>Edit Category</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.save}
              disabled={!this.state.title.length ? true : false}
              activeOpacity={0.3}
            >
              <Text style={styles.buttonText}>Save</Text>
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
    margin: 10,
    fontSize: 35
  },
  text: {
    textAlign: 'center',
    padding: 10,
    margin: 10
  }
});

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent));
