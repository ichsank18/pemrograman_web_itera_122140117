import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext';
import BookForm from '../BookForm/BookForm';
import './BookList.css';

function BookList({ filteredBooks, searchTerm }) {
  const { dispatch } = useBooks();
  const [editingBook, setEditingBook] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      dispatch({ type: 'DELETE_BOOK', payload: id });
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const closeEditForm = () => {
    setEditingBook(null);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'milik':
        return 'Dimiliki';
      case 'baca':
        return 'Sedang Dibaca';
      case 'beli':
        return 'Ingin Dibeli';
      default:
        return status;
    }
  };

  // Sort books by date added (newest first)
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  // Display message if no books match search term
  if (searchTerm && filteredBooks.length === 0) {
    return <div className="no-books">Tidak ada buku yang cocok dengan pencarian: "{searchTerm}"</div>;
  }

  // Display message if no books in the list
  if (filteredBooks.length === 0) {
    return <div className="no-books">Belum ada buku dalam daftar. Tambahkan buku baru!</div>;
  }

  return (
    <div className="book-list-container">
      {editingBook && (
        <div className="edit-overlay">
          <BookForm bookToEdit={editingBook} onClose={closeEditForm} />
        </div>
      )}
      
      <div className="book-list">
        {sortedBooks.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">oleh {book.author}</p>
              <span className={`book-status status-${book.status}`}>
                {getStatusLabel(book.status)}
              </span>
            </div>
            <div className="book-actions">
              <button 
                className="edit-btn" 
                onClick={() => handleEdit(book)}
                aria-label="Edit buku"
              >
                Edit
              </button>
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(book.id)}
                aria-label="Hapus buku"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

BookList.propTypes = {
  filteredBooks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      dateAdded: PropTypes.string.isRequired
    })
  ).isRequired,
  searchTerm: PropTypes.string
};

BookList.defaultProps = {
  searchTerm: ''
};

export default BookList;