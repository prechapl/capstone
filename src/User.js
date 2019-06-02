import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class User extends React.Component {
  render() {
    const { navigation } = this.props;
    const userTitle = navigation.getParam('firstName', 'no name');
    const url = navigation.getParam('imgUrl', 'no url');

    return (
      <View style={styles.container}>
        <View style={styles.col} />
        <Button
          title="Family"
          onPress={() => this.props.navigation.navigate('Family')}
          buttonStyle={{ backgroundColor: '#8EB51A', margin: 24 }}
        />
        <View style={styles.col}>
          <View style={styles.fitButton}>
            <Button
              title="Mood"
              onPress={() =>
                this.props.navigation.navigate('Mood', {
                  firstName: userTitle,
                  imgUrl: url,
                  userId: 'b40453fe-171e-4eee-8ea2-2efb93e70ad2'
                })
              }
              buttonStyle={{ backgroundColor: '#FF9900', margin: 24 }}
            />
          </View>
          <Avatar
            rounded
            overlayContainerStyle={styles.avatar}
            size={150}
            source={{
              uri: `${url}`
            }}
            title={userTitle.slice(0, 1)}
          />
          <Button
            title="Values"
            onPress={() => this.props.navigation.navigate('Values')}
            buttonStyle={{ backgroundColor: '#7DC6CD', margin: 24 }}
          />
        </View>
        <Button
          title="Events"
          onPress={() => this.props.navigation.navigate('Events')}
          buttonStyle={{ backgroundColor: '#EF5029', margin: 24 }}
        />
        <View style={styles.col} />
      </View>
    );
  }
}

export default withNavigation(User);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    borderWidth: 1
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  fitButton: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
