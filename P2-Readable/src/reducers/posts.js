import { combineReducers } from 'redux';

import {
  FETCH_POSTS_SUCCESS,
  FETCH_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  VOTE_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  ADD_POST_SUCCESS,
} from '../actions';

const byId = (state = {}, {type, response}) => {
  switch (type) {
    case FETCH_POSTS_SUCCESS:
    case FETCH_POST_SUCCESS:
    case VOTE_POST_SUCCESS:
    case EDIT_POST_SUCCESS:
    case ADD_POST_SUCCESS:
      return {
        ...state,
        ...response.entities.posts
      };

    case DELETE_POST_SUCCESS:
      return Object.keys(state)
        .filter(id => id !== response.result)
        .reduce((newState, key) => {
          newState[key] = state[key];
          return newState;
        }, {});
      
    default:
      return state;
  }
};

const mergePost = (state, category, post) => {
  if (!state[category]) {
    return {
      ...state, 
      [category]: [post]
    };
  } 
  else if (state[category].includes(post)) {
    return state;
  } 
  else {
    return {
      ...state,
      [category]: [...state[category], post]
    };
  }
};

const idsByCategory = (state = {}, {type, category, response}) => {
  switch (type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        [category]: response.result
      };
    
    case FETCH_POST_SUCCESS:
    case ADD_POST_SUCCESS:
      return mergePost(state, category, response.result);

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        [category]: (state[category]||[]).filter(id => id !== response.result),
        '/': (state['/']||[]).filter(id => id !== response.result)
      };

    default:
      return state;
  }
};

export const getPosts = (state, category) => 
  (state.idsByCategory[category] || [])
    .map(id => state.byId[id]);

export const getPost = (state, id) => 
  state.byId[id] || {};

export default combineReducers({
  byId,
  idsByCategory
});