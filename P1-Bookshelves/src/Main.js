import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Book from './Book';
import sortBy from 'sort-by'

class Main extends Component {

  render() {
    const { books, shelves, handleMove } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          {shelves.map(shelf => 
            <div className="bookshelf" key={shelf.name}>
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter( book => book.shelf === shelf.name)
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
          )}
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Main;
