import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { goCreateEvent } from "./store/events";


class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      category: "",
      description: ""
    };
  }
  save = () => {
    const id = this.props.id;
    const newEvent = this.state;
    newEvent.ownerId = id;
    console.log(newEvent);
    this.props.saveEvent(newEvent)
    this.props.navigation.navigate('Events');
  };
  render() {
    const colorMap = {
      chore: "#AA8EB7",
      event: "#9BB8D5",
      appointment: "#BCD59B",
      errand: "#D79963"
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
        <View>
          <Picker
            selectedValue={this.state.category}
            onValueChange={category => this.setState({ category })}
            style={{ height: 30, width: 250 }}
            itemStyle={{ fontSize: 18 }}
          >
            <Picker.Item
              label="please select a category"
              value=""
            />
            <Picker.Item
              label="event"
              value="event"
            />
            <Picker.Item
              label="chore"
              value="chore"
            />
            <Picker.Item
              label="appointment"
              value="appointment"
            />
            <Picker.Item
              label="errand"
              value="errand"
            />
          </Picker>
        </View>

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    backgroundColor: "#D3D3D4",
    marginBottom: 20,
    width: 300,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#448AE6",
    padding: 10,
    width: 300,
    margin: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF"
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
