import { describe, expect, test, vi, beforeEach } from 'vitest';
import Rest from '../pages/Rest';
import { fireEvent, render, screen } from '@testing-library/react';
import { IResponse } from '../interfase/interfase';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';

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

    const addHeaderButton = screen.getByText('rest.addHeader');
    expect(addHeaderButton).toBeInTheDocument();

    expect(screen.queryByPlaceholderText('rest.key')).toBeNull();
    expect(screen.queryByPlaceholderText('rest.value')).toBeNull();

    fireEvent.click(addHeaderButton);
    expect(screen.queryByPlaceholderText('rest.key')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('rest.value')).toBeInTheDocument();
  });

  test('initializes method, url', () => {
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

  test('updates body textarea', () => {
    renderWithRouter(<Rest loaderData={{ response: 200, data: [] }} />);
    const textarea = screen.getByPlaceholderText(
      '{ JSON }'
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '{ "test": 123 }' } });
    expect(textarea.value).toBe('{ "test": 123 }');
  });

  test('saves request to localStorage', () => {
    renderWithRouter(<Rest loaderData={{ response: 200, data: [] }} />);

    const urlInput = screen.getByTestId('rest.endpointUrl');
    const bodyTextarea = screen.getByTestId('rest.requestBody');
    const addHeaderButton = screen.getByText('rest.addHeader');

    fireEvent.change(urlInput, { target: { value: 'https://example.com' } });
    fireEvent.change(bodyTextarea, { target: { value: '{ "test": true }' } });
    fireEvent.click(addHeaderButton);

    fireEvent.change(screen.getByPlaceholderText('rest.key'), {
      target: { value: 'X-Test' },
    });
    fireEvent.change(screen.getByPlaceholderText('rest.value'), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByText('send'));

    expect(mockNav).toHaveBeenCalled();

    const calledUrl = mockNav.mock.calls[0][0];
    expect(calledUrl).toMatch(/\/rest\/GET\/.*\?.*/);
    expect(calledUrl).toContain(encodeURIComponent('123'));

    const saved = JSON.parse(localStorage.getItem('test@example.com') || '[]');
    expect(saved.length).toBeGreaterThan(0);
    expect(saved[0].url).toBe('https://example.com');
  });
  test('test error', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const storageKey = 'test@example.com';
    localStorage.setItem(storageKey, 'INVALID_JSON');

    renderWithRouter(<Rest loaderData={{ response: 200, data: [] }} />);

    expect(errorSpy).toHaveBeenCalledWith(
      'Error when restoring a request:',
      expect.any(SyntaxError)
    );

    errorSpy.mockRestore();
  });

  test('removes header', () => {
    renderWithRouter(<Rest loaderData={{ response: 200, data: [] }} />);

    fireEvent.click(screen.getByText('rest.addHeader'));

    const removeButton = screen.getByTitle('rest.remove');

    fireEvent.click(removeButton);

    expect(screen.queryByPlaceholderText('rest.key')).toBeNull();
    expect(screen.queryByPlaceholderText('rest.value')).toBeNull();
  });
});
