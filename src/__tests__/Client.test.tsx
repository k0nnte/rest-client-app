import { render } from '@testing-library/react';
import { describe, expect, Mock, test, vi } from 'vitest';
import Client, { clientLoader } from '../pages/Client';
import { isAuth } from '../services/auth';
import { redirect } from 'react-router';
vi.mock('react-router', () => ({
  redirect: vi.fn(),
  Outlet: vi.fn(() => <div data-testid="outlet" />),
}));

vi.mock('../services/auth');

describe('test Clinet', () => {
  test('render', () => {
    render(<Client />);
  });
});

describe('clientLoader', () => {
  test('not redirect', async () => {
    (isAuth as Mock).mockResolvedValue(true);
    await clientLoader();
    expect(redirect).not.toHaveBeenCalled();
  });
});
