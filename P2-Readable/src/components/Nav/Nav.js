import React from 'react';

import NavLink from './NavLink';

import { connect } from 'react-redux';

const Nav = ({ categories }) => 
  <div className="container">
    <ul className="tab_list">
      {categories.map(cat => 
        <NavLink key={cat.path} category={cat}/>
      )}
    </ul>
  </div>

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Nav);