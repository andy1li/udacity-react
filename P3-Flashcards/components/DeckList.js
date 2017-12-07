import React from 'react';
import { connect } from 'react-redux'
import { FlatList, Text, View, Animated, ReactNativeComponentTree } from 'react-native';
import { DeckItem } from './Styleds';

import sortBy from 'sort-by';
import { getDecks } from '../actions';
import { toArray } from '../utils/helpers';

class DeckList extends React.Component {
  state = {
    fontSize: new Animated.Value(32),
    clickedItem: {}
  }

  componentDidMount() {
    const { dispatch, navigation} = this.props;
    dispatch(getDecks(navigation));
  }

  bounce(fontSize, item) {
    this.setState(() => ({
      clickedItem: item
    }))

    Animated.sequence([
      Animated.timing(fontSize, { toValue: 29, duration: 120}),
      Animated.spring(fontSize, { toValue: 32, friction: 3})
    ]).start();
  }
    
  delayNavigate(deckTitle) {
    setTimeout(() => 
      this.props.navigation.navigate(
        'DeckDetail',
        { deckTitle }
      ), 
      360
    );
  }

  renderItem = ({ item }) => {
    const { fontSize, clickedItem } = this.state;
    return (
      <DeckItem 
        onPressIn={() => this.bounce(fontSize, item)}
        onPress={() => this.delayNavigate(item.title)}
      >
        {item === clickedItem
          ? <Animated.Text style={{fontSize, marginBottom: 5}}> 
              {item.title} 
            </Animated.Text>
          : <Text style={{fontSize: 32, marginBottom: 5}}> 
              {item.title} 
            </Text>
        }
        <Text style={{fontSize: 16, color: '#333'}}> 
          {item.questions.length} cards
        </Text>
      </DeckItem>
    )
  }

  render() {
    return (
      <FlatList style={{backgroundColor: '#aaa'}}
        data={this.props.decks.sort(sortBy('title'))}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

const mapStateToProps = decks => ({ 
  decks: toArray(decks)
});

export default connect(mapStateToProps)(DeckList)