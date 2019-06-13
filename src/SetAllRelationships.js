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
import { SetSingleRelationship } from './SetSingleRelationship';
import console from 'console';

class SetAllRelationships extends Component {
  constructor() {
    super();
    this.state = {
      relatives: 'HELLO',
    };
  }
  load() {
    const { user, userRelationships, familyMembers } = this.props;
    if (user) {
      this.props.fetchFamilyMembers(user.familyId);
      this.props.fetchUserRelationships(user.id);
    }
    if (userRelationships && familyMembers) {
      const relationships = userRelationships.filter(
        _relationship => _relationship.userId === user.id
      );
      const relatives = relationships.map(_relationship => {
        const member = familyMembers.find(
          _member => _member.id === _relationship.RelationshipId
        );
        return {
          RelationshipId: _relationship.RelationshipId,
          userId: user.id,
          firstName: member.firstName,
          lastName: member.lastName,
          type: _relationship.type,
        };
      });
      this.setState({ relatives });
    }
  }
  componentDidMount() {
    this.load();
  }
  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.userRelationships !== this.props.userRelationships ||
  //     prevProps.familyMembers !== this.props.familyMembers
  //   )
  //     this.load();
  // }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.header2}>{this.state.relatives}</Text>
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
