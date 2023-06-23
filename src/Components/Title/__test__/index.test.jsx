import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Title from '..';

describe('Title', () => {
  it('should render correctly without errors', () => {
    const mockProps = {
      value: 'Sprint Planner',
      setValue: jest.fn(),
    };
    const { asFragment } = render(<Title {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should activate inline editing when clicked can be used to edit the Title', () => {
    const mockProps = {
      value: 'Sprint Planner',
      setValue: jest.fn(),
    };
    const { getByTestId } = render(<Title {...mockProps} />);
    const textField = getByTestId('title-input-field').children[0].children[0];
    const button = getByTestId('edit-icon');
    expect(textField.value).toBe('Sprint Planner');
    fireEvent.click(button);
    fireEvent.change(textField, { target: { value: 'Sprint Planner2' } });
    fireEvent.keyDown(textField, { key: 'Enter', code: 'Enter' });
    expect(textField.value).toBe('Sprint Planner2');
  });
  it('should exit editing when clicking escape key', () => {
    const mockProps = {
      value: 'Sprint Planner',
      setValue: jest.fn(),
    };
    const { getByTestId } = render(<Title {...mockProps} />);
    const textField = getByTestId('title-input-field').children[0].children[0];
    fireEvent.focus(textField);
    expect(textField.value).toBe('Sprint Planner');
    fireEvent.change(textField, { target: { value: 'Sprint Planner2' } });
    fireEvent.keyDown(textField, { key: 'a', code: 'a' });
    fireEvent.keyDown(textField, { key: 'Escape', code: 'Escape' });
    fireEvent.blur(textField);
    expect(mockProps.setValue).toHaveBeenCalledWith('Sprint Planner2');
    expect(textField.value).toBe('Sprint Planner2');
  });
});
