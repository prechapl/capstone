import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import GestureRecognizer from 'react-native-swipe-gestures';
import { fetchAlerts, goDismissAlert } from '../store/alerts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60
  },
  header: {
    padding: 10,
    fontSize: 32
  },
  alertContainer: {
    height: 40,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    width: 350,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000000'
  }
});

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
                        height: 40,
                        alignItems: 'center',
                        color: '#000000',
                        width: 350,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderColor: '#000000'
                      }}
                    >
                      <Text>{alert.message}</Text>
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
    dismissAlert: id => dispatch(goDismissAlert(id))
  };
};

const mapStateToProps = ({ user, alerts }) => {
  return {
    user,
    alerts
  };
};
export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllAlerts)
);
