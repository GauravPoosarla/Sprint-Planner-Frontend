import SprintDurationInput from '..';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import React from 'react';

describe('SprintDurationInput', () => {
  it('should render without errors', () => {
    const { asFragment } = render(<SprintDurationInput setValue={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render with a value', () => {
    const { asFragment } = render(
      <SprintDurationInput value="2" setValue={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should call setValue when the input changes', () => {
    const setValue = jest.fn();
    const { getByTestId } = render(
      <SprintDurationInput value={'2'} setValue={setValue} />,
    );
    const input = getByTestId('sprint-duration-input-field').children[0]
      .children[0];
    fireEvent.change(input, { target: { value: '3' } });
    expect(setValue).toHaveBeenCalledWith('3');
  });
});
