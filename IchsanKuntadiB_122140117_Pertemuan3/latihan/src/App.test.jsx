import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders React Task Manager heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/react task manager/i);
  expect(headingElement).toBeInTheDocument();
});
