import { describe, expect, test, vi } from 'vitest';
import AuthForm from '../components/AuthForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { signIn } from '../firebase';
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

vi.mock('../firebase', () => ({
  signIn: vi.fn(),
  signUp: vi.fn(),
}));

describe('test AuthForm', () => {
  test('AuthForm', async () => {
    const email = 'test@example.com';
    const password = 'Password1!';
    renderWithRouter(<AuthForm authType={'singin'} />);
    fireEvent.change(screen.getByTestId(/email/i), {
      target: { value: email },
    });
    fireEvent.change(screen.getByTestId(/password/i), {
      target: { value: password },
    });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(signIn).not.toHaveBeenCalledWith(email, password);
    });
  });
});
