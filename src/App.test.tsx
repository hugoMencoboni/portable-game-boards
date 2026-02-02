import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from './App';

describe('App', () => {
  test('renders game selection menu', () => {
    render(<App />);
    const gameButton = screen.getByText(/Le murmure des feuilles/i);
    expect(gameButton).toBeInTheDocument();
  });

  test('renders Next Station London button', () => {
    render(<App />);
    const gameButton = screen.getByText(/Next Station London/i);
    expect(gameButton).toBeInTheDocument();
  });
});
