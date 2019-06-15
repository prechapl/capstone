import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import GestureRecognizer from 'react-native-swipe-gestures';

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

const alerts = [
  {
    id: '1',
    message: 'New poll creates',
    alertType: 'poll',
    targetId: '',
    staus: 'active',
    userId: ''
  },
  {
    id: '2',
    message: 'New event assigned to you',
    alertType: 'event',
    targetId: '',
    status: 'active',
    userId: ''
  },
  {
    id: '3',
    message: 'Poll closed! View winner here',
    alertType: 'poll',
    targetId: '',
    status: 'active',
    userId: ''
  },
  {
    id: '4',
    message: 'Event completed',
    alertType: 'event',
    targetId: '',
    status: 'active',
    userId: ''
  }
];

class AllAlerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: alerts
    };
  }

  onSwipe(gestureName, alertTarget) {
    if (gestureName === 'SWIPE_LEFT') {
      const alertArr = this.state.alerts.filter(
        alert => alert.id !== alertTarget.id
      );
      const newAlert = {
        alertType: alertTarget.alertType,
        id: alertTarget.id,
        message: alertTarget.message,
        targetId: alertTarget.targetId,
        userId: alertTarget.userId,
        status: 'inactive'
      };
      this.setState({ alerts: [...alertArr, newAlert] });
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
            <Text style={styles.header}>Alerts</Text>
            {this.state.alerts.map(
              alert =>
                alert.status === 'active' && (
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
  return {};
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};
export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllAlerts)
);
