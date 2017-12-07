import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/helpers';

import { connect } from 'react-redux';
import { getPost } from '../../reducers';
import * as actions from '../../actions';

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: 'react'
  };

  componentDidMount() {
    const { mode, fetchPost, id } = this.props;
    if (mode === 'edit') {
      fetchPost(id)
        .then(() =>
          this.setState(this.props.post)
        );
    }
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
      categories,
      editPost,
      addPost,
    } = this.props;
    const post = this.state;

    return (
      <form className="container">
        <label className="row">
          Title:
          <input
            name="title"
            type="text"
            value={post.title}
            onChange={this.handleChange} />
        </label>
        

        <label className="row">
          Post:          
          <textarea
            name="body"
            rows="6"
            value={post.body}
            onChange={this.handleChange} />
        </label>

        <label className="row">
          Author: {
            mode === 'edit'
              ? post.author
              : <input
                name="author"
                type="text"
                value={post.author}
                onChange={this.handleChange} 
              />
          }
        </label>

        <label className="row">
          Category: {
            mode === 'edit'
              ? capitalize(post.category)
              : <select name="category"
                  value={post.category}
                  onChange={this.handleChange}>
                  {categories
                    .filter(cat => cat.name !== 'All Posts')
                    .map(cat =>
                      <option value={cat.name} key={cat.name}>
                        {capitalize(cat.name)}
                      </option>
                    )
                  }
                </select>
          }
        </label>

        <Link to="/" >
          <button className="Button Button--primary Button--blue"
            onClick={() => mode === 'edit' 
              ? editPost(id, post) 
              : addPost(post)}>
            {mode === 'edit' 
              ? 'Edit Post'
              : 'Add Post'
            }
          </button>
        </Link>

        

      </form>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const id = match.params.post;
  return {
    id,
    post: getPost(state, id),
    mode: match.url === '/new' ? 'new' : 'edit',
    categories: state.categories
  };
}

export default connect(
  mapStateToProps, 
  actions
)(PostForm);
