import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import Anonim from '../components/anonim/Anonim';
import { MemoryRouter } from 'react-router';

describe('Anonim', () => {
  test('render Anonim', () => {
    render(
      <MemoryRouter>
        <Anonim />
      </MemoryRouter>
    );
  });
});
