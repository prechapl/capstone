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
import { fetchUserRelationships } from './store/users';
import { fetchFamilyMembers } from './store/family';
import SetSingleRelationship from './SetSingleRelationship';
import console from 'console';

class SetAllRelationships extends Component {
  constructor() {
    super();
    this.state = {
      relatives: [],
    };
  }
  load = async () => {
    await this.props.fetchFamilyMembers(this.props.user.familyId);
    await this.props.fetchUserRelationships(
      this.props.user.fetchUserRelationships
    );
    const members = this.props.familyMembers.filter(
      member => member.id !== this.props.user.id
    );
    const relatives = members.map(member => {
      const relationship = this.props.userRelationships.find(
        _relationship => _relationship.RelationshipId === member.id
      );
      return {
        id: relationship.id,
        userId: this.props.user.id,
        RelationshipId: relationship.RelationshipId,
        firstName: member.firstName,
        lastName: member.lastName,
        type: relationship.type,
      };
    });
    this.setState({ relatives });
  };
  componentDidMount() {
    this.load();
  }
  goToFamily = () => {
    this.props.navigation.navigate('Family');
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.header2}>Define Your Relationships</Text>
          {this.state.relatives.map(relative => (
            <SetSingleRelationship key={relative.id} relative={relative} />
          ))}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.button} onPress={this.goToFamily}>
              <Text style={styles.buttonText}>Family</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'flex-start',
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
    fontSize: 36,
  },
});

const mapStateToProps = state => ({
  userRelationships: state.userRelationships,
  user: state.user,
  familyMembers: state.familyMembers,
});

const mapDispatchtoProps = dispatch => ({
  fetchUserRelationships: id => dispatch(fetchUserRelationships(id)),
  fetchFamilyMembers: familyId => dispatch(fetchFamilyMembers(familyId)),
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(SetAllRelationships);
