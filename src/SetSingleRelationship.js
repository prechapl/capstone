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
import { updateRelationshipType, fetchUserRelationships } from './store/users';
import console from 'console';

class SetSingleRelationship extends Component {
  constructor({ relative }) {
    super();
    this.state = {
      type: relative.type,
    };
  }
  handleSubmit = () => {
    const { relative } = this.props;
    updateRelationshipType(
      relative.userId,
      relative.RelationshipId,
      this.state.type
    )
      .then(() => this.props.fetchUserRelationships(relative.userId))
      .catch(e => console.log(e));
  };
  render() {
    const { relative } = this.props;
    return (
      <View key={relative.id} style={styles.row}>
        <Text style={styles.text}>{`${relative.firstName} ${
          relative.lastName
        }`}</Text>
        <TextInput
          value={this.state.type}
          style={styles.input}
          placeholder={this.state.type}
          onChangeText={type => this.setState({ type })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
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
  row: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    backgroundColor: '#D3D3D4',
    width: 100,
    paddingHorizontal: 10,
    margin: 10,
  },

  text: {
    height: 40,
    width: 100,
    paddingHorizontal: 10,
    margin: 10,
  },

  button: {
    backgroundColor: '#448AE6',
    alignItems: 'center',
    padding: 10,
    width: 100,
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
  fetchUserRelationships: id => dispatch(fetchUserRelationships(id)),
});

export default connect(
  null,
  mapDispatchToProps
)(SetSingleRelationship);
