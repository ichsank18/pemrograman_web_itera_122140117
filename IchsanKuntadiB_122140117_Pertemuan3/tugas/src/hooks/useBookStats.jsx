import { useMemo } from 'react';

function useBookStats(books) {
  const stats = useMemo(() => {
    // Initialize stats object
    const statistics = {
      total: books.length,
      owned: 0,
      reading: 0,
      toBuy: 0
    };

    // Calculate stats based on book status
    books.forEach(book => {
      switch (book.status) {
        case 'milik':
          statistics.owned++;
          break;
        case 'baca':
          statistics.reading++;
          break;
        case 'beli':
          statistics.toBuy++;
          break;
        default:
          break;
      }
    });

    return statistics;
  }, [books]);

  return stats;
}

export default useBookStats;