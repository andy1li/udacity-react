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

    default:
      return state;
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
      return {
        ...state,
        [postId]: [...state[postId], response.result]
      };

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