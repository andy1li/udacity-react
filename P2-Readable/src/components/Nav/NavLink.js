import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/helpers';

import { withRouter } from 'react-router';

class NavLink extends Component {
  getActiveClass(path) {
    const pathname = this.props.location.pathname;
    const currentCategory = pathname.split('/')[1];
    return (currentCategory === path) 
      ? 'active' 
      : 'cat-item';
  }

  render() {
    const { name, path } = this.props.category;
    const activeClass = this.getActiveClass(path);

    return (
      <li className={activeClass}>
        <Link to={`/${path}`} >
          {capitalize(name)} 
        </Link>
      </li>
    );
  }
}

export default withRouter(NavLink);