import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

function Home() {
  const { books } = useBooks();
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter books based on active filter and search term
  const filteredBooks = books.filter(book => {
    // First apply status filter
    const statusMatch = activeFilter === 'all' || book.status === activeFilter;
    
    // Then apply search term filter
    const searchMatch = searchTerm === '' || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return statusMatch && searchMatch;
  });

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const toggleAddBookForm = () => {
    setIsAddingBook(!isAddingBook);
  };

  const closeAddBookForm = () => {
    setIsAddingBook(false);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>Manajemen Buku Pribadi</h1>
          <p>Kelola koleksi buku Anda dengan mudah</p>
          <button className="add-book-btn" onClick={toggleAddBookForm}>
            {isAddingBook ? 'Batal' : 'Tambah Buku Baru'}
          </button>
        </div>
      </section>
      
      <main className="container">
        {isAddingBook && (
          <div className="add-book-form">
            <BookForm onClose={closeAddBookForm} />
          </div>
        )}
        
        <BookFilter 
          activeFilter={activeFilter} 
          onFilterChange={handleFilterChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        
        <BookList 
          filteredBooks={filteredBooks} 
          searchTerm={searchTerm}
        />
      </main>
    </div>
  );
}

export default Home;