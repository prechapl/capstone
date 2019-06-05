import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
// import { withNavigation } from 'react-navigation';
import ActionButton from 'react-native-circular-action-menu';

class AvatarGenerator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, items, size } = this.props;

    return (
      <View key={user.id}>
        <ActionButton
          // active={true}
          degrees={360}
          radius={130}
          outRangeScale={1}
          icon={
            <Avatar
              rounded
              overlayContainerStyle={{
                borderWidth: 3
              }}
              size={size}
              source={{
                uri: `${user.imgUrl}`
              }}
              title={user.firstName}
              // activeOpacity={0}
            />
          }
          // buttonColor="rgba(0, 0, 0, 0)"
          // btnOutRange="rgba(0, 0, 0, 0)"
        />

        {items !== undefined
          ? items.forEach(item => {
              return (
                <ActionButton.Item
                  // key={idx}
                  onPress={() =>
                    this.props.navigation.navigate('temp', {
                      user: user
                    })
                  }
                >
                  <View style={{ width: 62, backgroundColor: '#FF9900' }}>
                    <Text style={styles.text}>{item.title}</Text>
                  </View>
                </ActionButton.Item>
              );
            })
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingStart: 5,
    paddingTop: 0,
    paddingBottom: 1,
    marginBottom: 1,
    color: 'white',
    fontSize: 20
  }
});

export default AvatarGenerator;
