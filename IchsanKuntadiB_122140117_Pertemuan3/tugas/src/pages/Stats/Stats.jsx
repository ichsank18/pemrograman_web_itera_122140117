import React from 'react';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);
  
  // Get most recent books (last 5 added)
  const recentBooks = [...books]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 5);
  
  // Get authors with counts
  const authors = books.reduce((acc, book) => {
    acc[book.author] = (acc[book.author] || 0) + 1;
    return acc;
  }, {});
  
  // Sort authors by book count
  const topAuthors = Object.entries(authors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="stats-page">
      <header className="stats-header">
        <div className="container">
          <h1>Statistik Koleksi Buku</h1>
          <p>Analisis dan ringkasan koleksi buku Anda</p>
        </div>
      </header>
      
      <main className="container">
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Buku</div>
          </div>
          
          <div className="stat-card owned">
            <div className="stat-value">{stats.owned}</div>
            <div className="stat-label">Dimiliki</div>
          </div>
          
          <div className="stat-card reading">
            <div className="stat-value">{stats.reading}</div>
            <div className="stat-label">Sedang Dibaca</div>
          </div>
          
          <div className="stat-card tobuy">
            <div className="stat-value">{stats.toBuy}</div>
            <div className="stat-label">Ingin Dibeli</div>
          </div>
        </div>
        
        <div className="stats-details">
          <div className="recent-books">
            <h2>Buku Terbaru</h2>
            {recentBooks.length > 0 ? (
              <ul className="book-list">
                {recentBooks.map(book => (
                  <li key={book.id} className="recent-book">
                    <div className="book-title">{book.title}</div>
                    <div className="book-author">oleh {book.author}</div>
                    <div className="book-date">
                      {new Date(book.dateAdded).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-stats">Belum ada buku yang ditambahkan</p>
            )}
          </div>
          
          <div className="top-authors">
            <h2>Penulis Terbanyak</h2>
            {topAuthors.length > 0 ? (
              <ul className="author-list">
                {topAuthors.map(([author, count], index) => (
                  <li key={author} className="author-item">
                    <div className="author-rank">{index + 1}</div>
                    <div className="author-name">{author}</div>
                    <div className="author-count">{count} buku</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-stats">Belum ada data penulis</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Stats;