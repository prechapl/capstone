import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { updateRelationshipType, fetchRelated } from './store/users';

class SetSingleRelationship extends Component {
  constructor({ relative }) {
    super();
    this.state = {
      type: relative.type,
    };
  }
  handleSubmit() {
    const { relative } = this.props;
    updateRelationshipType(
      relative.userId,
      relative.RelationshipId,
      this.state.type
    ).then(() => this.props.fetchRelated(this.state.relative.userId));
  }
  render() {
    const { relative } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View key={relative.id}>
          <Text>{`${relative.firstName} ${relative.lastName}`}</Text>
          <TextInput
            style={styles.input}
            value={this.state.type}
            placeholder={this.state.type}
            onChangeText={type => this.setState({ type })}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#D3D3D4',
    marginBottom: 20,
    width: 300,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#448AE6',
    padding: 10,
    width: 300,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  header: {
    padding: 10,
    marginBottom: 30,
    fontSize: 75,
  },
  header2: {
    padding: 10,
    marginBottom: 30,
    fontSize: 42,
  },
});

const mapDispatchToProps = dispatch => ({
  fetchRelated: id => dispatch(fetchRelated(id)),
});

export default connect(
  null,
  mapDispatchToProps
)(SetSingleRelationship);
