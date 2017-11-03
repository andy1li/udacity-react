import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import CommentList from '../Comment/CommentList'

import { connect } from 'react-redux';
import { getPost } from '../../reducers';
import * as actions from '../../actions';

class PostDetail extends Component {
  componentDidMount() {
    const { fetchPost, fetchComments, id, history } = this.props;
    fetchPost(id, history);
    fetchComments(id);
  }

  render() {
    const { 
      post,
      date, 
      votePost,
      deletePost,
    } = this.props;
    
    return (
      <div>
        <div className="wrap single-post-masthead" >
          <div className="container">
            <div className="row category"></div>
            <div className="row title"
              >
              {post.title}              
            </div> 

            <button className="Button VoteButton"
              onClick={() => votePost(post.id, 'upVote')}>
              ▲ {post.voteScore}
            </button>
            <button className="Button VoteButton"
              onClick={() => votePost(post.id, 'downVote')}>
              ▼
            </button>
            
            <Link to={`/${post.category}/${post.id}/edit`} >
              <button className="Button Button--primary Button--blue">
                ✎ Edit
              </button>
            </Link>
            <Link to="/" >
              <button className="Button Button--primary Button--blue"
                onClick={() => deletePost(post.id, post.category)}>
                ⌫ Delete
              </button>
            </Link> 

            <div className="row meta">
              <p>by <strong><i>{post.author}</i></strong> 
                 <br/> 
                 {date}                 
              </p>
            </div>
          </div>
        </div>
        
        <div className="container entry-content">
          <p>{post.body}</p>
          <CommentList postId={post.id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const id = match.params.post;
  const post = getPost(state, id);
  return {
    id,
    post,
    date: (new Date(post.timestamp)).toString().slice(4, 16)
  };
}

export default connect(mapStateToProps, actions)(PostDetail);
