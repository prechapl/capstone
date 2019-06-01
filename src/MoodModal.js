setModalVisible = visible => {
  this.setState({ modalVisible: visible });
};

<View>
  <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}
  >
    <View>
      <View
        style={{
          marginTop: 100,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ marginBottom: 5 }}>
          current mood value: {this.props.mood.value}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          date set: {this.props.mood.createdAt.slice(0, 10)} @{' '}
          {this.props.mood.createdAt.slice(11, 19)}
        </Text>
        <Text style={{ marginBottom: 5 }}>
          previous mood entries: {this.props.moods.length}
        </Text>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <Text>Hide Mood Info</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>

  <TouchableHighlight
    onPress={() => {
      this.setModalVisible(!this.state.modalVisible);
    }}
  >
    <Text style={{ marginTop: 0 }}>show mood details</Text>
  </TouchableHighlight>
</View>;
