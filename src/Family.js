import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
  fetchUsers,
  fetchUser,
  fetchRelated,
  getActiveMood
} from './store/users';
import { connect } from 'react-redux';
import ActionButton from 'react-native-circular-action-menu';

class Family extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (this.props.related.length !== prevProps.related.length) {
      this.load();
    }
  }

  load = () => {
    // HARD CODING USER ID HERE!!
    const id = 'e5fce01a-b34d-4472-8989-7368d033e6eb';
    this.props.fetchUsers();
    this.props.fetchUser(id);
  };

  findFamily = user => {
    return this.props.users.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };

  render() {
    const user = this.props.user;
    const family = this.findFamily(user);
    if (family.length) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingEnd: 25
            }}
          >
            <ActionButton
              active={true}
              degrees={0}
              radius={130}
              outRangeScale={0.65}
              onLongPress={() =>
                this.props.navigation.navigate('AvatarGenerator', {
                  user: user,
                  buttonSet: 'UserButtons'
                })
              }
              icon={
                <Avatar
                  rounded
                  overlayContainerStyle={{
                    borderWidth: 3
                  }}
                  size={175}
                  source={{
                    uri: `${user.imgUrl}`
                  }}
                  title={user.firstName}
                />
              }
            >
              {family.map(person => {
                return (
                  <ActionButton.Item key={person.id}>
                    <Avatar
                      rounded
                      overlayContainerStyle={{
                        borderWidth: 3
                      }}
                      size={100}
                      source={{
                        uri: `${person.imgUrl}`
                      }}
                      title={person.firstName}
                      onPress={() =>
                        this.props.navigation.navigate('AvatarGenerator', {
                          user: person,
                          buttonSet:
                            person.age > 18 ? 'RelativeButtons' : 'ChildButtons'
                        })
                      }
                    />
                  </ActionButton.Item>
                );
              })}
            </ActionButton>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUser: id => dispatch(fetchUser(id)),
    fetchRelated: id => dispatch(fetchRelated(id)),
    getActiveMood: id => dispatch(getActiveMood(id))
  };
};

const mapStateToProps = ({ users, user, related }) => {
  return {
    users,
    user,
    related
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Family);
