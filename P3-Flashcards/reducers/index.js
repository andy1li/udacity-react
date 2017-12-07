import { 
  RECEIVE_DECKS,
  SAVE_DECK_TITLE,
  ADD_CARD,
} from '../actions';
import { dummyResults } from '../utils/helpers';

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks;

    case SAVE_DECK_TITLE:
      return {
        ...state,
        ...action.deck
      };

    case ADD_CARD:
      const { title, card } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: [
            ...state[title].questions,
            card
          ]
        }
      };

    default:
      return state;
  }
}

export default decks;