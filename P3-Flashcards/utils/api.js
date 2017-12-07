import { AsyncStorage } from 'react-native'
import { dummyDecks, isEmpty } from '../utils/helpers';

const DECKS_STORAGE_KEY = "MobilesFlashcards:decks";

const setDummyDecks = () =>
  AsyncStorage.setItem(
    DECKS_STORAGE_KEY, JSON.stringify(dummyDecks)
  )

export const getDecks = () =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(res => {
      // dummy setting code could be removed.
      if (isEmpty(res)) {
        setDummyDecks();
        return dummyDecks;
      }
      return JSON.parse(res)
    })

export const getDeck = (title) =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(res => {
      return JSON.parse(res)[title]
    })

export const saveDeck = deck => 
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
  
export const addCardToDeck = (title, card) =>
  getDeck(title).then(deck => 
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [title]: {
        title,
        questions: [
          ...deck.questions,
          card
        ]
      }
    })
  ))
