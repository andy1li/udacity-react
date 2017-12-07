import { combineReducers } from 'redux';

import {
  FETCH_COMMENTS_SUCCESS,
  VOTE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  ADD_COMMENT_SUCCESS
} from '../actions';

const byId = (state = {}, {type, response}) => {
  switch (type) {
    case FETCH_COMMENTS_SUCCESS:
    case VOTE_COMMENT_SUCCESS:
    case EDIT_COMMENT_SUCCESS:
    case ADD_COMMENT_SUCCESS:      
      return {
        ...state,
        ...response.entities.comments
      };

    case DELETE_COMMENT_SUCCESS:
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

const mergeComment = (state, postId, post) => {
  if (!state[postId]) {
    return {
      ...state, 
      [postId]: [post]
    };
  } else {
    return {
      ...state,
      [postId]: [...state[postId], post]
    };
  }
};

const idsByPost = (state = {}, {type, postId, response}) => {
  switch (type) {
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        [postId]: response.result
      };

    case ADD_COMMENT_SUCCESS:
      return mergeComment(state, postId, response.result);

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        [postId]: state[postId].filter(id => id !== response.result)
      };

    default:
      return state;
  }
};

export const getComments = (state, postId) => 
  (state.idsByPost[postId] || [])
    .map(id => state.byId[id]);

export const getComment = (state, id) => 
  state.byId[id] || {};

export default combineReducers({
  byId,
  idsByPost
});