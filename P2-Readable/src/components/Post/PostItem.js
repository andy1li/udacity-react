import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/helpers';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class PostItem extends Component {
  state = {
    isMouseOver: false,
  }

  render() {
    const {
      post,
      deletePost,
      votePost,
    } = this.props;

    return (
      <div className="PostItem"
        onMouseOver={() => this.setState({isMouseOver: true})} 
        onMouseLeave={() => this.setState({isMouseOver: false})}>
        <button className="Button VoteButton"
          onClick={() => votePost(post.id, 'upVote')}>
          ▲ {post.voteScore}
        </button>

        <button className="Button VoteButton"
          onClick={() => votePost(post.id, 'downVote')}>
          ▼
        </button>

        <Link to={`/${post.category}/${post.id}`} >
          <h5 className="ListItemTitle" key={post.id}>
            {capitalize(post.author)}: {post.title}
          </h5>
        </Link> 

        <span>({post.commentCount} comments)</span>

        {this.state.isMouseOver && 
          <span>
            <Link to={`/${post.category}/${post.id}/edit`} >
              <button className="Button Button--blue">
              ✎ Edit
              </button>
            </Link>
            
            <button className="Button Button--blue"
              onClick={() => deletePost(post.id)}>
              ⌫ Delete
            </button>
          </span>
        }
      </div>
    );
  }
}

export default connect(
  state => state, 
  actions
)(PostItem);

