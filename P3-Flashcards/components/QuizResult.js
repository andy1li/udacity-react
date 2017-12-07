import React from 'react';
import { Text, View } from 'react-native';
import { CenterView, Button } from './Styleds';

import { NavigationActions } from 'react-navigation';
import { toPercentage } from '../utils/helpers';

const QuizResult = ({ scores, restart, navigation }) => (
  <CenterView>
    <Text style={{fontSize: 48, marginBottom: 30, marginLeft: 5, marginRight: 5, textAlign: 'center'}}>
      {toPercentage(scores)} correct!
    </Text>

    <Button style={{backgroundColor: '#fff'}} onPress={restart}>
      <Text style={{fontSize: 18}}> 
        Restart Quiz
      </Text>
    </Button>

    <Button style={{backgroundColor: '#222'}} onPress={() =>
      navigation.dispatch(
        NavigationActions.back({
          key: navigation.state.key
        })
      )
    }>
      <Text style={{fontSize: 18, color: '#fff'}}> 
        Back to Deck
      </Text>
    </Button>


  </CenterView>
)

export default QuizResult