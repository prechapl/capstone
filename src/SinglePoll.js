import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    padding: 10,
    margin: 10,
    fontSize: 24,
    width: 400,
    textAlign: 'center'
  },
  selected: {
    backgroundColor: '#D3D3D4',
    textAlign: 'center',
    padding: 10,
    width: 300,
    borderWidth: 1
  },
  unselected: {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 10,
    width: 300,
    borderWidth: 1
  }
});

class SinglePoll extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: ''
    };
  }

  render() {
    const options = ['Chicken', 'Steak'];

    const question = this.props.navigation.getParam('question', 'no question');

    function setSelectedOption(selectedOption) {
      this.setState({
        selectedOption
      });
    }

    function renderOption(option, selected, onSelect, index) {
      const selectedStyle = styles.selected;
      const unselectedStyle = styles.unselected;
      const style = selected ? selectedStyle : unselectedStyle;

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      );
    }

    function renderContainer(optionNodes) {
      return <View>{optionNodes}</View>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{question}</Text>
        <RadioButtons
          options={options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={renderContainer}
        />
      </View>
    );
  }
}

export default withNavigation(SinglePoll);
