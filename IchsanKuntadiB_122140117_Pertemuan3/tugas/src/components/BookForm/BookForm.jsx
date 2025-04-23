import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

function BookForm({ bookToEdit, onClose }) {
  const { dispatch } = useBooks();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    status: 'milik',
    dateAdded: ''
  });

  // If we have a book to edit, populate the form
  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit);
    } else {
      // Reset form when not editing
      setFormData({
        id: '',
        title: '',
        author: '',
        status: 'milik',
        dateAdded: ''
      });
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Judul buku harus diisi!');
      return false;
    }
    if (!formData.author.trim()) {
      setError('Nama penulis harus diisi!');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (bookToEdit) {
      // Update existing book
      dispatch({ 
        type: 'EDIT_BOOK', 
        payload: formData 
      });
    } else {
      // Add new book
      const newBook = {
        ...formData,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString()
      };
      
      dispatch({ 
        type: 'ADD_BOOK', 
        payload: newBook 
      });
    }
    
    // Reset form and close
    setFormData({
      id: '',
      title: '',
      author: '',
      status: 'milik',
      dateAdded: ''
    });
    setError('');
    if (onClose) onClose();
  };

  return (
    <div className="book-form-container">
      <h2>{bookToEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Judul Buku</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan judul buku"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Penulis</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Masukkan nama penulis"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="milik">Dimiliki</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Ingin Dibeli</option>
          </select>
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            {bookToEdit ? 'Simpan Perubahan' : 'Tambah Buku'}
          </button>
          {onClose && (
            <button type="button" className="btn-cancel" onClick={onClose}>
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

BookForm.propTypes = {
  bookToEdit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired
  }),
  onClose: PropTypes.func
};

export default BookForm;