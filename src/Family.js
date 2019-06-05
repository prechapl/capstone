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
import AvatarGenerator from './AvatarGenerator';

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
    console.log('family', family);

    if (this.props.user.id && this.props.related.length) {
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
              outRangeScale={1}
              onLongPress={() =>
                this.props.navigation.navigate('AvatarUser', {
                  user: user
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
                  // activeOpacity={0}
                />
              }
            />

            {family.map((person, idx) => {
              return (
                <ActionButton.Item
                  key={idx}
                  onPress={() =>
                    this.props.navigation.navigate('AvatarAdult', {
                      user: person
                    })
                  }
                >
                  <AvatarGenerator user={person} />
                </ActionButton.Item>
              );
            })}

            {/* <AvatarGenerator user={user} size={175} items={family} /> */}
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
