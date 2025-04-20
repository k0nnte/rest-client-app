import { beforeEach, describe, expect, test } from 'vitest';
import VariablesPage from '../pages/VariablesPage';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/dom';

describe('test VariablesPage', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('variables', JSON.stringify({ oldKey: '123' }));
  });
  test('render', () => {
    render(<VariablesPage />);
  });

  test('key===oldKey', () => {
    render(<VariablesPage />);
    expect(screen.getByDisplayValue('oldKey')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
    fireEvent.change(screen.getByDisplayValue('oldKey'), {
      target: { value: 'newKey' },
    });
    expect(screen.getByDisplayValue('newKey')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('oldKey')).toBeNull();
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  });

  test('handleKeyChange', () => {
    localStorage.setItem(
      'variables',
      JSON.stringify({
        oldKey: 'value123',
        notOldKey: 'keepMe',
      })
    );
    render(<VariablesPage />);
    expect(screen.getByDisplayValue('oldKey')).toBeInTheDocument();
    expect(screen.getByDisplayValue('keepMe')).toBeInTheDocument();
    const oldKey = screen.getByDisplayValue('oldKey');
    fireEvent.change(oldKey, { target: { value: 'newKey' } });
    expect(screen.getByDisplayValue('newKey')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('oldKey')).toBeNull();
    expect(screen.getByDisplayValue('keepMe')).toBeInTheDocument();
    const notOldKey = screen.getByDisplayValue('notOldKey');
    expect(notOldKey).toBeInTheDocument();
  });

  test('handleValueChange', () => {
    localStorage.setItem(
      'variables',
      JSON.stringify({
        Key: 'Ivalue',
      })
    );

    render(<VariablesPage />);

    const input = screen.getByDisplayValue('Ivalue');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'upValue' } });

    expect(screen.getByDisplayValue('upValue')).toBeInTheDocument();

    expect(screen.queryByDisplayValue('Ivalue')).toBeNull();
    expect(screen.getByDisplayValue('Key')).toBeInTheDocument();
  });

  test('delete variables', () => {
    localStorage.setItem(
      'variables',
      JSON.stringify({
        var1: 'test1',
        var2: 'test2',
      })
    );

    render(<VariablesPage />);

    expect(screen.getByDisplayValue('var1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('var2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test2')).toBeInTheDocument();

    const removeButtons = screen.getAllByText('✖');
    fireEvent.click(removeButtons[0]);

    expect(screen.queryByDisplayValue('var1')).toBeNull();
    expect(screen.queryByDisplayValue('test1')).toBeNull();

    expect(screen.getByDisplayValue('var2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test2')).toBeInTheDocument();
  });
});
