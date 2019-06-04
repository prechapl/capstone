import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { goCreateEvent } from './store/events';

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      category: 'event',
      description: ''
    };
  }
  save = () => {
    const id = this.props.id
      ? this.props.id
      : '23af4a42-29c3-4ab2-8229-67bac74bea03';
    const newEvent = this.state;
    newEvent.ownerId = id;
    this.props.saveEvent(newEvent);
  };
  render() {
    const colorMap = {
      chore: '#AA8EB7',
      event: '#9BB8D5',
      appointment: '#BCD59B',
      errand: '#D79963'
    };
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.header}>New Event</Text>
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
        <Text>Category</Text>
        <Picker
          selectedValue={this.state.category}
          onValueChange={category => this.setState({ category })}
          style={{ height: 50, width: 100 }}
        >
          <Picker.Item label="event" value="event" style={{ color: 'red' }} />
          <Picker.Item
            label="chore"
            value="chore"
            style={{ backgroundColor: colorMap.chore }}
          />
          <Picker.Item
            label="appointment"
            value="appointment"
            style={{ backgroundColor: colorMap.appointment }}
          />
          <Picker.Item
            label="errand"
            value="errand"
            style={{ backgroundColor: colorMap.errand }}
          />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={() => this.save()}>
          <Text>Save</Text>
        </TouchableOpacity>
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
