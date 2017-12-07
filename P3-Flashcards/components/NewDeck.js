import React from 'react';
import { connect } from 'react-redux'
import { Keyboard, Text, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { CenterView, SingleInput, Button } from './Styleds';

import { saveDeckTitle } from '../actions';

const emptyTitle = {
  title: '' 
}

class NewDeck extends React.Component {
  state = emptyTitle

  clearInput = () => 
    this.setState(emptyTitle)

  handleInput = input => 
    this.setState({
      title: input
    })

  handleSubmit = () => {
    if (!this.state.title) return;

    const { dispatch, navigation } = this.props;
    const { title } = this.state;
    dispatch(saveDeckTitle(title))
      .then(() => {
        this.clearInput();
        Keyboard.dismiss();
        navigation.navigate(
          'DeckDetail',
          { deckTitle: title }
        );
      })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <CenterView>
            <Text style={{fontSize: 32, marginLeft: 5, marginRight: 5, textAlign: 'center'}}>
              Please specify the title of the new deck:
            </Text>

            <SingleInput
              placeholder="Title"
              value={this.state.title}
              onChangeText={this.handleInput}
            />

            <Button style={{backgroundColor: '#58f'}} onPress={this.handleSubmit}>
              <Text style={{fontSize: 18, color: '#fff'}}> 
                Create Deck 
              </Text>
            </Button>
          </CenterView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewDeck)
