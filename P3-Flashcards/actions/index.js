import * as api from '../utils/api'
import { isEmpty, newDeck } from '../utils/helpers'

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';
export const ADD_CARD = 'ADD_CARD';

export const getDecks = ({ navigate }) => dispatch => 
  api.getDecks()
    .then(decks => {
      if (isEmpty(decks)) throw 'EmptyDecksObj';
      
      return dispatch({
        type: RECEIVE_DECKS,
        decks,
      });
    })
    .catch(error => {
      if (error === 'EmptyDecksObj') 
        navigate('NewDeck');
    })

export const saveDeckTitle = title => dispatch => {
  const deck = newDeck(title);
  return api.saveDeck(deck)
    .then(() => dispatch({
      type: SAVE_DECK_TITLE,
      deck,
    }));
}

export const addCardToDeck = (title, card) => dispatch => {
  return api.addCardToDeck(title, card)
    .then(() => dispatch({
      type: ADD_CARD,
      title,
      card,
    }));
}


