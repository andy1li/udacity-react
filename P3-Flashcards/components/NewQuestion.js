import React from 'react';
import { connect } from 'react-redux'
import { Keyboard, Text, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { CenterView, MutipleInput, Button } from './Styleds';

import { NavigationActions } from 'react-navigation';
import { addCardToDeck } from '../actions';

const emptyState = {
  question: '',
  answer: ''
};

class NewQuestion extends React.Component {
  state = emptyState

  clearInput = () => 
    this.setState(emptyState)

  handleInput = (field, value) => 
    this.setState(() => ({
      [field]: value
    }))

  handleSubmit = () => {
    if (!this.state.question || ! this.state.answer) return;

    const { dispatch, navigation, deckTitle} = this.props;
    dispatch(addCardToDeck(deckTitle, this.state))
      .then(() => {
        this.clearInput();
        Keyboard.dismiss();
        navigation.dispatch(
          NavigationActions.back({
            key: navigation.state.key
          })
        );
      })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <CenterView>
            <Text style={{fontSize: 32}}> 
              Create a new card
            </Text>
            <Text style={{fontSize: 32}}> 
              for {this.props.deckTitle}:
            </Text>

            <MutipleInput
              multiline={true}
              placeholder="Question"
              value={this.state.question}
              onChangeText={value => this.handleInput('question', value)}
            />

            <MutipleInput
              multiline = {true}
              style={{marginTop: 0}}
              placeholder="Answer"
              value={this.state.answer}
              onChangeText={value => this.handleInput('answer', value)}
            />

            <Button style={{backgroundColor: '#58f'}} onPress={this.handleSubmit}>
              <Text style={{fontSize: 18, color: '#fff'}}> 
                Create Card 
              </Text>
            </Button>
          </CenterView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (decks, { navigation }) => ({ 
  deckTitle: navigation.state.params.deckTitle
});

export default connect(mapStateToProps)(NewQuestion)
