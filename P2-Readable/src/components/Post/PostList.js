import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import sortBy from 'sort-by';

import PostItem from './PostItem';

import { connect } from 'react-redux';
import { getPosts } from '../../reducers';
import * as actions from '../../actions';

class PostList extends Component {

  state = {
    sortBy: '-voteScore'
  }

  componentDidMount = this.fetchPosts;

  componentDidUpdate(prevProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.fetchPosts();
    }
  }

  fetchPosts() {
    const {category, fetchPosts} = this.props;
    fetchPosts(category);
  }

  render() {
    const { posts } = this.props;
    posts.sort(sortBy(this.state.sortBy));

    return (
      <div className="container entry-content">
        {posts.map(post => 
          <PostItem key={post.id} post={post} />
        )} 

        <div className="footer">
          {posts.length > 0 && 
            <span>
              <span>Sort by: </span>
              <select defaultValue="-voteScore"
                onChange={(e) => this.setState({sortBy: e.target.value})}>
                <option value="-voteScore">Votes</option>
                <option value="-timestamp">Recent</option>
              </select>
            </span>
          }
          
          <Link to={`/new`} >
            <button className="Button Button--primary Button--blue">
              ✎ New Post
            </button>
          </Link>
        </div>
      
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const category = match.url;
  return {
    category,
    posts: getPosts(state, category)
  };
}

export default connect(
  mapStateToProps, 
  actions
)(PostList);
