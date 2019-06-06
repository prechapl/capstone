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
import {
  fetchChoices,
  fetchVotes,
  castVoteThunk,
  changeVoteThunk
} from './store/polls';
import { findChoiceText } from './HelperFunctions';
import PureChart from 'react-native-pure-chart';

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
      userId: '47713ff6-3ac6-4631-92ed-532828dcfef4',
      pollId: props.navigation.getParam('id'),
      choiceId: '',
      selectedOption: ''
    };
  }
  componentDidMount() {
    this.props.fetchChoices(this.state.pollId);
    this.props.fetchVotes(this.state.pollId);
  }

  handleSubmit = () => {
    this.props.castVote(this.state.pollId, this.state);
  };

  handleDelete = () => {
    this.props.changeVote(this.state.pollId, this.state.userId);
  };

  render() {
    const { choices, votes } = this.props;

    const options = choices.reduce((acc, item) => {
      acc.push(item.text);
      return acc;
    }, []);

    const votesObj =
      votes.length &&
      votes.reduce((acc, item) => {
        if (!acc[item.choiceId]) {
          acc[item.choiceId] = 1;
        } else {
          acc[item.choiceId]++;
        }
        return acc;
      }, {});

    const keys = Object.keys(votesObj);

    const votesData =
      keys.length &&
      keys.reduce((acc, item) => {
        const label = choices.length && findChoiceText(item, choices);
        const obj = {};
        obj.value = votesObj[item];
        obj.label = label;
        acc.push(obj);
        return acc;
      }, []);

    const question = this.props.navigation.getParam('question', 'no question');

    const usersWithVotes = votes.reduce((acc, vote) => {
      acc.push(vote.userId);
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

    if (usersWithVotes.includes(this.state.userId)) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>{question}</Text>
          <PureChart data={votesData} type="pie" />

          <TouchableOpacity
            style={{
              backgroundColor: '#8EB51A',
              padding: 10,
              margin: 10,
              width: 300
            }}
            onPress={this.handleDelete}
          >
            <Text style={styles.buttonText}>Change Vote</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
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
}

const mapDispatchToProps = dispatch => {
  return {
    fetchChoices: id => dispatch(fetchChoices(id)),
    fetchVotes: id => dispatch(fetchVotes(id)),
    castVote: (id, vote) => dispatch(castVoteThunk(id, vote)),
    changeVote: (pollId, voteId) => dispatch(changeVoteThunk(pollId, voteId))
  };
};

const mapStateToProps = ({ choices, votes }) => {
  return {
    choices,
    votes
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePoll);
