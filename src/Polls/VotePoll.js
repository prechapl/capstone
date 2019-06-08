import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons';
import { connect } from 'react-redux';
import { castVoteThunk } from '../store/polls';

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
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  }
});

class SinglePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      pollId: '',
      choiceId: '',
      selectedOption: ''
    };
  }
  componentDidMount() {
    this.setState({ userId: this.props.user.id, pollId: this.props.pollId });
  }

  handleSubmit = () => {
    this.props.castVote(this.state.pollId, this.state);
  };

  render() {
    const { choices } = this.props;

    const options = choices.reduce((acc, item) => {
      acc.push(item.text);
      return acc;
    }, []);

    const setSelectedOption = selectedOption => {
      const selected = choices.filter(choice => choice.text === selectedOption);
      this.setState({
        selectedOption,
        choiceId: selected[0].id
      });
    };

    const renderOption = (option, selected, onSelect, index) => {
      const selectedStyle = styles.selected;
      const unselectedStyle = styles.unselected;
      const style = selected ? selectedStyle : unselectedStyle;

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      );
    };

    function renderContainer(optionNodes) {
      return <View>{optionNodes}</View>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.question}</Text>

        <RadioButtons
          options={options}
          onSelection={setSelectedOption.bind(this)}
          selectedOption={this.state.selectedOption}
          renderOption={renderOption}
          renderContainer={renderContainer}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#8EB51A',
            padding: 10,
            margin: 10,
            width: 300
          }}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    castVote: (id, vote) => dispatch(castVoteThunk(id, vote))
  };
};

const mapStateToProps = ({ user, choices }) => {
  return {
    user,
    choices
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePoll);
