import { describe, expect, test, vi, beforeEach } from 'vitest';
import Rest from '../pages/Rest';
import { fireEvent, render, screen } from '@testing-library/react';
import { IResponse } from '../interfase/interfase';
import { MemoryRouter } from 'react-router';

const mockNav = vi.fn();

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => mockNav,
    useParams: () => ({
      metod: 'GET',
      url: btoa('https://example.com'),
      body: btoa('{ "name": "test" }'),
    }),
  };
});

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn((_auth, callback) => {
    callback({ uid: '123', email: 'test@example.com' });
    return () => {};
  }),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Rest tests', () => {
  beforeEach(() => {
    localStorage.clear();
    mockNav.mockClear();
  });

  test('render', () => {
    const mockLoaderData: IResponse = {
      response: 200,
      data: [],
    };

    renderWithRouter(<Rest loaderData={mockLoaderData} />);

    const addHeaderButton = screen.getByText('Add Header');
    expect(addHeaderButton).toBeInTheDocument();
    expect(screen.queryByLabelText('Key')).toBeNull();
    expect(screen.queryByLabelText('Value')).toBeNull();

    fireEvent.click(addHeaderButton);

    expect(screen.getByLabelText('Key')).toBeInTheDocument();
    expect(screen.getByLabelText('Value')).toBeInTheDocument();
  });

  test('initializes method, url, and body from useParams and localStorage', () => {
    const storageKey = 'test@example.com';
    const requestFromStorage = {
      method: 'GET',
      url: 'https://example.com',
      headers: [{ key: 'Authorization', value: 'Bearer token' }],
      body: '{ "name": "test" }',
    };
    localStorage.setItem(storageKey, JSON.stringify([requestFromStorage]));

    renderWithRouter(<Rest loaderData={{ response: 200, data: [] }} />);

    expect(screen.getByDisplayValue('GET')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('{ "name": "test" }')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Authorization')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bearer token')).toBeInTheDocument();
  });

  test('updates body textarea correctly', () => {
    renderWithRouter(<Rest loaderData={{ response: 200, data: [] }} />);
    const textarea = screen.getByPlaceholderText(
      '{ JSON }'
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '{ "test": 123 }' } });
    expect(textarea.value).toBe('{ "test": 123 }');
  });

  test('saves request to localStorage and navigates with encoded URL and body', () => {
    renderWithRouter(<Rest loaderData={{ response: 200, data: [] }} />);

    const urlInput = screen.getByLabelText('Endpoint URL');
    const bodyTextarea = screen.getByLabelText('Request Body');
    const addHeaderButton = screen.getByText('Add Header');

    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    fireEvent.change(bodyTextarea, { target: { value: '{ "test": true }' } });
    fireEvent.click(addHeaderButton);

    fireEvent.change(screen.getByLabelText('Key'), {
      target: { value: 'X-Test' },
    });
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByText('Send'));

    expect(mockNav).toHaveBeenCalled();

    const calledUrl = mockNav.mock.calls[0][0];
    expect(calledUrl).toMatch(/\/rest\/GET\/.*\?.*/);
    expect(calledUrl).toContain(encodeURIComponent('123'));

    const saved = JSON.parse(localStorage.getItem('test@example.com') || '[]');
    expect(saved.length).toBeGreaterThan(0);
    expect(saved[0].url).toBe('https://example.com');
  });
});
