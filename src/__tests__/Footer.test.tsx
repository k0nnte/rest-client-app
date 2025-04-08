import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import Footer from '../components/Footer/Footer';

describe('footer', () => {
  test('render footer', () => {
    render(<Footer />);
  });
});
