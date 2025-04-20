import { describe, test, vi } from 'vitest';
import HistoryPage from '../pages/HistoryPage';
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

describe('test HistoryPage', () => {
  test('render', () => {
    renderWithRouter(<HistoryPage />);
  });
});
