import { describe, test, vi } from 'vitest';
import MainPage from '../pages/MainPage';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn((_, callback) => {
    callback(null);
    return () => {};
  }),
}));
describe('test MainPage', () => {
  test('render', () => {
    renderWithRouter(<MainPage />);
  });
});
