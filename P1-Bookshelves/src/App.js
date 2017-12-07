import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Main from './Main';
import Search from './Search';
import './App.css'

class BooksApp extends Component {
  shelves = [
    {name: 'currentlyReading', title: 'Currently Reading'},
    {name: 'wantToRead', title: 'Want to Read'},
    {name: 'read', title: 'Read'}
  ];

  state = {
    books: [],
  };

  getAllBooks = () => {
    BooksAPI.getAll().then( books =>
        this.setState({ books })
      )
  }

  componentDidMount = this.getAllBooks

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then( this.getAllBooks )
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <Main 
            books={this.state.books}
            shelves={this.shelves}
            handleMove={this.updateBook}
          />
        )}/>

        <Route path="/search" render={ () => (
          <Search
            books={this.state.books}
            shelves={this.shelves}
            handleMove={this.updateBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
