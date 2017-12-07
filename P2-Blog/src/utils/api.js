import v4 from 'uuid/v4';

const apiUrl = 'http://localhost:3001'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'test'
}

// Categories

export const fetchCategories = () =>
  fetch(`${apiUrl}/categories`, { headers } )
    .then(res => res.json())
    .then(data => data.categories)

// Posts

export const fetchPosts = (category) => {
  if (category === '/') category = '';
  return fetch(`${apiUrl}${category}/posts`, { headers } )
    .then(res => res.json())
}

export const fetchPost = (id) => 
  fetch(`${apiUrl}/posts/${id}`, { headers } )
    .then(res => res.json())

export const deletePost = (id) => 
  fetch(`${apiUrl}/posts/${id}`, { 
    headers,
    method: 'DELETE'
  }).then(res => res.json())

export const votePost = (id, vote) => 
  fetch(`${apiUrl}/posts/${id}`, { 
    headers,
    method: 'POST',
    body: JSON.stringify({
      option: vote
    })
  }).then(res => res.json())

export const editPost = (id, title, body) => 
  fetch(`${apiUrl}/posts/${id}`, { 
    headers,
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
    })
  }).then(res => res.json())

export const addPost = (post) => 
  fetch(`${apiUrl}/posts`, { 
    headers,
    method: 'POST',
    body: JSON.stringify({
      id: v4(),
      timestamp: Date.now(),
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    })
  }).then(res => res.json())

// Comments

export const fetchComments = (post_id) => 
  fetch(`${apiUrl}/posts/${post_id}/comments`, { headers } )
    .then(res => res.json())

export const voteComment = (id, vote) => 
  fetch(`${apiUrl}/comments/${id}`, { 
    headers,
    method: 'POST',
    body: JSON.stringify({
      option: vote
    })
  }).then(res => res.json())

export const deleteComment = (id) => 
  fetch(`${apiUrl}/comments/${id}`, { 
    headers,
    method: 'DELETE'
  }).then(res => res.json())

export const editComment = (id, body) => 
  fetch(`${apiUrl}/comments/${id}`, { 
    headers,
    method: 'PUT',
    body: JSON.stringify({
      body,
      timestamp: Date.now()
    })
  }).then(res => res.json())

export const addComment = (comment) => 
  fetch(`${apiUrl}/comments`, { 
    headers,
    method: 'POST',
    body: JSON.stringify({
      id: v4(),
      timestamp: Date.now(),
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
    })
  }).then(res => res.json())