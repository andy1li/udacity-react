import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

import { StatusBar, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import DeckDetail from './components/DeckDetail';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';

import { tabBarOptions, navigationOptions } from './Config';
import { setLocalNotification } from './utils/helpers'

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

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
