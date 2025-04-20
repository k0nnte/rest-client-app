import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Header from '../components/Header/Header';
import { MemoryRouter } from 'react-router';
const changeLanguageMock = vi.fn();
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en-US',
      changeLanguage: changeLanguageMock,
    },
  }),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn((_, callback) => {
    callback(null);
    return () => {};
  }),
}));

describe('Header', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  test('test Header', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  test('user', () => {
    vi.mock('firebase/auth', () => ({
      getAuth: vi.fn(() => ({})),
      onAuthStateChanged: vi.fn((_, callback) => {
        callback({
          uid: '123',
          displayName: 'Test User',
          email: 'test@example.com',
        });
        return () => {};
      }),
    }));
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const button = screen.getByText(/logout/i);
    expect(button).toBeInTheDocument();
  });

  test('lang', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'ru' } });
    expect(changeLanguageMock).toHaveBeenCalledWith('ru');
  });
});
