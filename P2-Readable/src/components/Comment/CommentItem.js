import React, { Component } from 'react';
import { capitalize } from '../../utils/helpers';

import CommentForm from './CommentForm';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class CommentItem extends Component {
  state = {
    isMouseOver: false,
    isCommentFormVisiable: false
  }

  toggleVisiable = () => this.setState((state) => ({
    isCommentFormVisiable: !state['isCommentFormVisiable']
  }))

  render() {
    const { 
      comment,
      voteComment,
      deleteComment
    } = this.props; 

    return (
      <div className="CommentItem"
        onMouseOver={() => this.setState({isMouseOver: true})} 
        onMouseLeave={() => this.setState({isMouseOver: false})}>
        <button className="Button VoteButton"
          onClick={() => voteComment(comment.id, 'upVote')}>
          ▲ {comment.voteScore}
        </button>
        <button className="Button VoteButton"
          onClick={() => voteComment(comment.id, 'downVote')}>
          ▼
        </button>

        <span>
          {capitalize(comment.author)}: {comment.body}
        </span>

        {this.state.isMouseOver && 
          <span>
            <button className="Button Button--blue"
              onClick={this.toggleVisiable}>
              {this.state.isCommentFormVisiable
                ? 'Cancel Edit'
                : '✎ Edit'
              }
            </button>
            
            <button className="Button Button--blue"
              onClick={() => deleteComment(comment.id)}>
              ⌫ Delete
            </button>
          </span>
        }

        {this.state.isCommentFormVisiable &&
          <CommentForm 
            id={comment.id}
            mode="edit" 
            visiable={this.state.isCommentFormVisiable}
            toggleVisiable={this.toggleVisiable}
          />
        }
      </div>
    );
  }
}

export default connect(
  state => state, 
  actions
)(CommentItem);

