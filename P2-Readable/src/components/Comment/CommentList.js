import React, { Component } from 'react';
import sortBy from 'sort-by';

import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

import { connect } from 'react-redux';
import { getComments } from '../../reducers';
import * as actions from '../../actions';

class CommentList extends Component {
  state = {
    isCommentFormVisiable: false
  };

  toggleVisiable = () => this.setState((state) => ({
    isCommentFormVisiable: !state['isCommentFormVisiable']
  }))

  render() {
    const { comments } = this.props;
    comments.sort(sortBy('-voteScore'));
    return (
      <div>
        {comments.length > 0
          ? <h4>{comments.length} Comments: </h4>
          : <h5>No comment yet, please leave one!</h5>
        }
        <div className="CommentList">

          {comments.map(comment =>
            <CommentItem key={comment.id} comment={comment} />
          )}

          <div className="footer">          
            <button className="Button Button--primary Button--blue"
              onClick={this.toggleVisiable}>
              {this.state.isCommentFormVisiable
                ? 'Cancel Comment'
                : '✎ New Comment'
              }
            </button>

            {this.state.isCommentFormVisiable &&
              <CommentForm 
                mode="new" 
                visiable={this.state.isCommentFormVisiable}
                toggleVisiable={this.toggleVisiable}
              />
            }
          </div>
        </div>
      </div>
    ) 
  }
}

const mapStateToProps = (state, { postId }) => {
  return {
    comments: getComments(state, postId)
  };
}

export default connect(
  mapStateToProps, 
  actions
)(CommentList);
