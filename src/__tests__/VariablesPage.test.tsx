import { describe, test } from 'vitest';
import VariablesPage from '../pages/VariablesPage';
import { render } from '@testing-library/react';

describe('test VariablesPage', () => {
  test('render', () => {
    render(<VariablesPage />);
  });
});
