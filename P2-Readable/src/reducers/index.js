import { combineReducers } from 'redux';

import { categories } from './categories'
import posts, * as fromPosts from './posts'
import comments, * as fromComments from './comments'

export default combineReducers({
  categories,
  posts,
  comments
});

export const getPosts = (state, category) => 
  fromPosts.getPosts(state.posts, category)

export const getPost = (state, id) => 
  fromPosts.getPost(state.posts, id) 

export const getComments = (state, postId) => 
  fromComments.getComments(state.comments, postId) 

export const getComment = (state, id) => 
  fromComments.getComment(state.comments, id) 