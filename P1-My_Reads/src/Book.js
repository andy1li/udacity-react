import React, { Component } from 'react'

class Book extends Component {

  render() {
    const { book, shelves, handleMove } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>

          <div className="book-shelf-changer">
            <select 
              defaultValue={book.shelf}
              onChange={(e) => handleMove(book, e.target.value)}>
              <option value="none" disabled>Move to...</option>

              {shelves.map( shelf =>
                <option key={shelf.name} value={shelf.name}>
                  {shelf.title}
                </option>
              )}

              <option value="none">Off the Shelf</option>
            </select>
          </div>
        </div>

        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(', ')}
        </div>
      </div>
    );
  }
}

export default Book;