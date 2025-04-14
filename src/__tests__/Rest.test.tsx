import { describe, expect, test, vi } from 'vitest';
import Rest from '../pages/Rest';
import { fireEvent, render, screen } from '@testing-library/react';
import { IResponse } from '../interfase/interfase';

const mockNav = vi.fn();

vi.mock('react-router', () => {
  return {
    useNavigate: () => mockNav,
    useParams: () => ({
      metod: 'GET',
      url: 'https://example.com',
      body: '',
    }),
  };
});

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({})),
    onAuthStateChanged: vi.fn((_auth, callback) => {
      callback({ uid: '123', email: 'test@example.com' });

      return () => {};
    }),
  };
});

describe('Rest tests', () => {
  test('render', () => {
    const mockLoaderData: IResponse = {
      response: 200,
      data: [],
    };
    render(<Rest loaderData={mockLoaderData} />);
    const addHeaderButton = screen.getByText('Add Header');
    expect(addHeaderButton).toBeInTheDocument();
    expect(screen.queryByLabelText('Key')).toBeNull();
    expect(screen.queryByLabelText('Value')).toBeNull();
    fireEvent.click(addHeaderButton);
    screen.debug();
    expect(screen.getByLabelText('Key')).toBeInTheDocument();
    expect(screen.getByLabelText('Value')).toBeInTheDocument();
  });
});
