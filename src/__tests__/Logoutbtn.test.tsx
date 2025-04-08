import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Logoutbtn from '../components/Header/Logoutbtn';
import { signOut } from 'firebase/auth';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({ currentUser: null })),
  signOut: vi.fn(() => Promise.resolve()),
}));

describe('logoutbtn', () => {
  test('click logout', () => {
    render(<Logoutbtn />);
    const button = screen.getByText(/logout/i);
    button.click();
    expect(signOut).toHaveBeenCalled();
  });

  test('error', () => {
    vi.mocked(signOut).mockRejectedValueOnce(new Error('error'));
    render(<Logoutbtn />);
    const button = screen.getByText(/logout/i);
    button.click();
    expect(signOut).toHaveBeenCalled();
  });
});
