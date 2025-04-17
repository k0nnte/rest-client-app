import { describe, expect, Mock, test, vi } from 'vitest';
import SignIn, { clientLoader } from '../pages/SignInPage';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};
vi.mock('../services/auth', () => ({
  isAuth: vi.fn(),
}));
vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    redirect: vi.fn(),
  };
});
import * as auth from '../services/auth';
import * as router from 'react-router';
describe('test SignIn', () => {
  test('render', () => {
    renderWithRouter(<SignIn />);
  });
  test('does not redirect', async () => {
    (auth.isAuth as Mock).mockResolvedValueOnce(false);
    await clientLoader();
    expect(router.redirect).not.toHaveBeenCalled();
  });
});
