import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

import { StatusBar, View } from 'react-native';
import MainNavigator from './components/MainNavigator';

import { setLocalNotification } from './utils/helpers'

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
