import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { fetchUsers, fetchUser, fetchRelated } from './store/users';
import { connect } from 'react-redux';
import ActionButton from 'react-native-circular-action-menu';

class Family extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    // HARD CODING USER ID HERE!!
    const id = '1544f466-8518-4b8d-91ed-f5f9660eee85';
    this.props.fetchUsers();
    this.props.fetchUser(id);
  };

  findFamily = user => {
    return this.props.users.filter(
      usr => usr.familyId === user.familyId && usr.id !== user.id
    );
  };
  generateFamilyAvatars = family => {
    return family.map(user => {
      if (user.age > 18) {
        return (
          <ActionButton.Item
            key={user.id}
            onPress={() =>
              this.props.navigation.navigate('AvatarAdult', {
                user: user
              })
            }
          >
            <Avatar
              rounded
              overlayContainerStyle={{
                borderWidth: 1
              }}
              size={100}
              title={user.firstName}
              source={{
                uri: user.imgUrl
              }}
            />
          </ActionButton.Item>
        );
      } else {
        return (
          <ActionButton.Item
            key={user.id}
            onPress={() =>
              this.props.navigation.navigate('AvatarChild', {
                user: user
              })
            }
          >
            <Avatar
              rounded
              overlayContainerStyle={{
                borderWidth: 1
              }}
              size={100}
              title={user.firstName}
              source={{
                uri: user.imgUrl
              }}
            />
          </ActionButton.Item>
        );
      }
    });
  };
  render() {
    const user = this.props.user;
    const family = this.findFamily(user);

    if (this.props.user.id && this.props.users.length) {
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
              degrees={360}
              radius={130}
              outRangeScale={0.5}
              onPress={() =>
                this.props.navigation.navigate('AvatarUser', {
                  user: user
                })
              }
              // onLongPress={() =>
              //   this.props.navigation.navigate('AvatarUser', {
              //     user: user
              //   })
              // }
              icon={
                <Avatar
                  rounded
                  overlayContainerStyle={{ borderWidth: 1 }}
                  size={175}
                  title={user.firstName}
                  source={{
                    uri: user.imgUrl
                  }}
                />
              }
            >
              {this.generateFamilyAvatars(family)}
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
    fetchRelated: id => dispatch(fetchRelated(id))
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
