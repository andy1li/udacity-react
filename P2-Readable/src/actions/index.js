import * as api from '../utils/api'
import { normalize } from 'normalizr';
import * as schema from './schema';

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';

// Categories

export const fetchCategories = () => dispatch => 
  api.fetchCategories()
    .then(categories => dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      categories
    }))

// Posts

export const fetchPosts = category => dispatch => 
  api.fetchPosts(category)
    .then(posts => dispatch({
      type: FETCH_POSTS_SUCCESS,
      category,
      response: normalize(posts, schema.posts)
    }))

export const fetchPost = id => dispatch => 
  id && api.fetchPost(id)
          .then(post => dispatch({
            type: FETCH_POST_SUCCESS,
            category: `/${post.category}`,
            response: normalize(post, schema.post)
          }))


export const deletePost = id => dispatch => 
  api.deletePost(id)
    .then(post => dispatch({
      type: DELETE_POST_SUCCESS,
      category: `/${post.category}`,
      response: normalize(post, schema.post)
    }))

export const votePost = (id, vote) => dispatch => 
  api.votePost(id, vote)
    .then(post => dispatch({
      type: VOTE_POST_SUCCESS,
      response: normalize(post, schema.post)
    }))

export const editPost = (id, post) => dispatch => 
  api.editPost(id, post.title, post.body)
    .then(post => dispatch({
      type: EDIT_POST_SUCCESS,
      response: normalize(post, schema.post)
    }))

export const addPost = (post) => dispatch => 
  api.addPost(post)
    .then(post => dispatch({
      type: ADD_POST_SUCCESS,
      category: `/${post.category}`,
      response: normalize(post, schema.post)
    }))

// Comments

export const fetchComments = postId => dispatch => 
  api.fetchComments(postId)
    .then(comments => dispatch({
      type: FETCH_COMMENTS_SUCCESS,
      postId,
      response: normalize(comments, schema.comments)
    }))

export const voteComment = (id, vote) => dispatch => 
  api.voteComment(id, vote)
    .then(comment => dispatch({
      type: VOTE_COMMENT_SUCCESS,
      postId: comment.parentId,
      response: normalize(comment, schema.comment)
    }))

export const deleteComment = id => dispatch => 
  api.deleteComment(id)
    .then(comment => dispatch({
      type: DELETE_COMMENT_SUCCESS,
      postId: comment.parentId,
      response: normalize(comment, schema.comment)
    }))

export const editComment = (id, comment) => dispatch => 
  api.editComment(id, comment.body)
    .then(comment => dispatch({
      type: EDIT_COMMENT_SUCCESS,
      response: normalize(comment, schema.comment)
    }))

export const addComment = (comment) => dispatch => 
  api.addComment(comment)
    .then(comment => dispatch({
      type: ADD_COMMENT_SUCCESS,
      postId: comment.parentId,
      response: normalize(comment, schema.comment)
    }))