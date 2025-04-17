import { describe, expect, test } from 'vitest';
import CodeGenerator from '../components/Rest/CodeGenerator';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('test codegenerator', () => {
  test('curl from get', () => {
    const headers = [
      { key: 'q', value: ' w' },
      { key: 'e', value: 'r' },
    ];

    render(<CodeGenerator method="GET" url="test" headers={headers} body="" />);

    const curlCommand = `curl -H "q: w" -H "e: r" "test"`;

    expect(screen.getByText(curlCommand)).toBeInTheDocument();
  });
  test('curl from POST body', () => {
    const headers = [
      { key: 'q', value: ' w' },
      { key: 'e', value: 'r' },
    ];

    const body = JSON.stringify({ name: 'John' });

    render(
      <CodeGenerator method="POST" url="test" headers={headers} body={body} />
    );

    const curlCommand = `curl -X POST -H "q: w" -H "e: r" -d '${body}' "test"`;

    expect(screen.getByText(curlCommand)).toBeInTheDocument();
  });
  test('no data', () => {
    render(<CodeGenerator method="" url="" headers={[]} body="" />);

    expect(screen.getByText('codegen.notEnough')).toBeInTheDocument();
  });
});
