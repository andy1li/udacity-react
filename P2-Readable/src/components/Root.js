import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Layout/Header'
import Nav from './Nav/Nav'
import PostList from './Post/PostList'
import PostDetail from './Post/PostDetail'
import PostForm from './Post/PostForm'

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Root extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div>
        <Header />
        <Nav />
        <Switch>
          <Route exact path="/new" component={PostForm} />
          <Route exact path="/:category?" component={PostList} />         
          <Route exact path="/:category/:post" component={PostDetail} />
          <Route exact path="/:category/:post/edit" component={PostForm} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(null, actions)(Root)
);