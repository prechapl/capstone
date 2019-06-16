import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import GestureRecognizer from 'react-native-swipe-gestures';
import { fetchAlerts, goDismissAlert } from '../store/alerts';
import { fetchUser } from '../store/users';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 30
  },
  header: {
    padding: 10,
    fontSize: 32
  }
});

const images = {
  poll:
    'https://cdn4.iconfinder.com/data/icons/juicyfruit_by_salleedesign/256x256/stats.png',
  event:
    'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/calendar-512.png'
};

class AllAlerts extends Component {
  componentDidMount() {
    this.props.fetchAlerts(this.props.user.id);
  }

  onSwipe(gestureName, alertTarget) {
    if (gestureName === 'SWIPE_LEFT') {
      this.props.dismissAlert(alertTarget.id);
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View style={styles.container}>
            <Text style={styles.header}>Notifications</Text>
            {this.props.alerts.map(
              alert =>
                alert.active === true && (
                  <View key={alert.id}>
                    <GestureRecognizer
                      onSwipe={direction => this.onSwipe(direction, alert)}
                      config={config}
                      style={{
                        height: 75,
                        color: '#000000',
                        width: 350,
                        paddingHorizontal: 10,
                        borderWidth: 0.5,
                        borderColor: '#bebebe',
                        justifyContent: 'center'
                      }}
                    >
                      <Text
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onPress={() => {
                          alert.alertType === 'poll'
                            ? this.props.navigation.navigate('Poll', {
                                id: alert.targetId
                              })
                            : this.props.navigation.navigate('EventAssigned', {
                                event: this.props.assignedEvents.find(
                                  ev => ev.id === alert.targetId
                                )
                              });
                        }}
                      >
                        <Image
                          style={{ width: 50, height: 50 }}
                          source={{
                            uri:
                              alert.alertType === 'poll'
                                ? images.poll
                                : images.event
                          }}
                        />
                        {alert.message}
                      </Text>
                    </GestureRecognizer>
                  </View>
                )
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlerts: id => dispatch(fetchAlerts(id)),
    dismissAlert: id => dispatch(goDismissAlert(id)),
    fetchUser: id => dispatch(fetchUser(id))
  };
};

const mapStateToProps = ({ user, alerts, assignedEvents }) => {
  return {
    user,
    alerts,
    assignedEvents
  };
};
export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllAlerts)
);
