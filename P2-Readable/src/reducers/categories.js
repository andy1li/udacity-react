import {
  FETCH_CATEGORIES_SUCCESS
} from '../actions';

export const categories = (state = [], {type, categories}) => {
  switch (type) {
    case FETCH_CATEGORIES_SUCCESS:
      return [
        {name: 'All Posts', path: ''},
        ...categories
      ];
    default:
      return state;
  }
};
