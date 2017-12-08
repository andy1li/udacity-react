import React from 'react';
import { connect } from 'react-redux'
import { Text } from 'react-native';
import { CenterView, Button } from './Styleds';
import QuizResult from './QuizResult';

import { 
  shuffle, 
  clearLocalNotification,
  setLocalNotification 
} from '../utils/helpers';

const initialState = {
  currentQuestionIdx: 1,
  showingQuestion: true,
  scores: [],
};

class Quiz extends React.Component {
  state = initialState

  flipCard = () =>
    this.setState(() => ({
      showingQuestion: !this.state.showingQuestion
    }))

  nextQuestion = score => 
    this.setState(({currentQuestionIdx, scores}) => ({
      scores: [
        ...scores,
        score
      ],
      currentQuestionIdx: currentQuestionIdx + 1
    }))

  restart = () =>
    this.setState(initialState)

  render() {
    const { questions, navigation } = this.props;
    const { currentQuestionIdx, showingQuestion, scores } = this.state;

    if (currentQuestionIdx > questions.length) {
      clearLocalNotification()
        .then(setLocalNotification);
      return <QuizResult scores={scores} restart={this.restart} navigation={navigation}/>
    }

    const currentQuestion = questions[currentQuestionIdx - 1];

    return (
      <CenterView>
        <Text style={{fontSize: 24, marginBottom: 40, color: '#333'}}> 
          {showingQuestion
            ? 'Question'
            : 'Answer'
          } {currentQuestionIdx} of {questions.length}:
        </Text>

        <Text style={{fontSize: 42, marginBottom: 40, marginLeft: 5, marginRight: 5, textAlign: 'center'}}> 
          {showingQuestion
            ? currentQuestion.question
            : currentQuestion.answer
          }
        </Text>

        <Button style={{backgroundColor: '#fff'}} onPress={this.flipCard}>
          <Text style={{fontSize: 18}}> 
            {showingQuestion
              ? 'Show Answer'
              : 'Show Question'
            }
          </Text>
        </Button>

        <Button style={{backgroundColor: '#5af78e'}} onPress={() => this.nextQuestion(1)}>
          <Text style={{fontSize: 18}}> 
            Correct!
          </Text>
        </Button>

        <Button style={{backgroundColor: '#ff5c57'}} onPress={() => this.nextQuestion(0)}>
          <Text style={{fontSize: 18, color: '#fff'}}> 
            Incorrect.
          </Text>
        </Button>
      </CenterView>
    );
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const title = navigation.state.params.deckTitle;
  return {
    questions: shuffle(decks[title].questions)
  };
}

export default connect(mapStateToProps)(Quiz);