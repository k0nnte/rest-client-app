import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import Authorized from '../components/authorizedMain/authorized';
import { MemoryRouter } from 'react-router';

describe('Authorized', () => {
  test('render Authorized', () => {
    render(
      <MemoryRouter>
        <Authorized name="test" />
      </MemoryRouter>
    );
  });
});
