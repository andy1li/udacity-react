import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book';
import sortBy from 'sort-by'

class Search extends Component {
  state = {
    query: '',
    books: []
  };

  handleSearch(query) {
    BooksAPI.search(query).then( books => {
      if (books === undefined || ('error' in books)) 
        books = [];
      this.setState({ books })
    })
  }

  render() {
    const {shelves, handleMove} = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" 
              placeholder="Search by title or author"
              onChange={ event => this.handleSearch(event.target.value) }/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.filter( book => book.shelf === 'none' )
              .sort(sortBy('title'))
              .map( book =>
                <li key={book.id}>
                  <Book 
                    book={book} 
                    shelves={shelves}
                    handleMove={handleMove}
                  />
                </li>
              )
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;