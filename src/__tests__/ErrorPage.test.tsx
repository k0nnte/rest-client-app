import { describe, test } from 'vitest';
import ErrorPage from '../pages/ErrorPage';
import { render } from '@testing-library/react';

describe('test ErrorPage', () => {
  test('render', () => {
    render(<ErrorPage />);
  });
});
