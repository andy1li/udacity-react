import React from 'react';
import { connect } from 'react-redux'
import { Text } from 'react-native';
import { CenterView, Button } from './Styleds';

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deckTitle
  })

  render() {
    const { deck, navigation } = this.props
    return (
      <CenterView>
        <Text style={{fontSize: 48, marginBottom: 10}}> 
          {deck.title} 
        </Text>
        <Text style={{fontSize: 24, marginBottom: 40, color: '#333'}}> 
          {deck.questions.length} cards
        </Text>

        <Button style={{backgroundColor: '#fff'}} onPress={() => 
          navigation.navigate(
            'NewQuestion', { deckTitle: deck.title }
          )
        }>
          <Text style={{fontSize: 18}}> 
            Add Card 
          </Text>
        </Button>

        <Button style={{backgroundColor: '#58f'}} onPress={() =>
          deck.questions.length && navigation.navigate(
            'Quiz', { deckTitle: deck.title }
          )
        }>
          <Text style={{fontSize: 18, color: '#fff'}}> 
            Start Quiz
          </Text>
        </Button>
      </CenterView>
    );
  }
}

const mapStateToProps = (decks, { navigation }) => ({ 
  deck: decks[navigation.state.params.deckTitle]
});

export default connect(mapStateToProps)(DeckDetail);