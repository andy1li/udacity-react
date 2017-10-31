import React, { Component } from 'react';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getComment } from '../../reducers';
import * as actions from '../../actions';

class CommentForm extends Component {
  state = {
    body: '',
    author: '',
    parentId: this.props.match.params.post
  };

  componentDidMount() {
    if (this.props.mode === 'edit') {
        this.setState(this.props.comment);
    }
    
  }

  clearComment = () => {
    this.setState(() => ({
      body: '',
      author: ''
    }));
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(() => ({
      [name]: value
    }));
  }

  render() {
    const {
      id, 
      mode, 
      editComment,
      addComment,
      toggleVisiable,
    } = this.props;

    const comment = this.state;

    return (
      <form className="container">

        <label className="row">
          Comment:
          <textarea
            name="body"
            rows="6"
            value={comment.body}
            onChange={this.handleChange} />
        </label>

        <label className="row">
          Author: {
            mode === 'edit'
              ? comment.author
              : <input
                name="author"
                type="text"
                value={comment.author}
                onChange={this.handleChange} 
              />
          }
        </label>

        <button className="Button Button--primary Button--blue"
          onClick={(event) => {
            mode === 'edit'
              ? editComment(id, comment) 
              : addComment(comment);
            event.preventDefault();
            this.clearComment();
            toggleVisiable();
          }}>
          {mode === 'edit' 
            ? 'Edit Comment'
            : 'Add Comment'
          }
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  return {
    comment: getComment(state, id),
  };
}

export default withRouter(connect(
  mapStateToProps, 
  actions
)(CommentForm));
