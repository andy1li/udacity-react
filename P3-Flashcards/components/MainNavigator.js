import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import DeckList from './DeckList';
import NewDeck from './NewDeck';
import DeckDetail from './DeckDetail';
import NewQuestion from './NewQuestion';
import Quiz from './Quiz';

import { tabBarOptions, navigationOptions } from '../Config';

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />,
      title: 'Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome name='pencil' size={30} color={tintColor} />,
      title: 'New Deck',
    }
  },
}, 
{ 
  tabBarOptions,
  navigationOptions,
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  NewQuestion: {
    screen: NewQuestion,
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  },
}, { navigationOptions })

export default MainNavigator;
