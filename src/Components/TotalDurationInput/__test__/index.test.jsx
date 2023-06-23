import TotalDurationInput from '..';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

describe('TotalDurationInput', () => {
  it('should render without errors', () => {
    const { asFragment } = render(<TotalDurationInput setValue={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render with a value', () => {
    const { asFragment } = render(
      <TotalDurationInput value="2" setValue={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should call setValue when the input changes', () => {
    const setValue = jest.fn();
    const { getByTestId } = render(
      <TotalDurationInput value={'2'} setValue={setValue} />,
    );
    const input = getByTestId('total-duration-input-field').children[0]
      .children[0];
    fireEvent.change(input, { target: { value: '3' } });
    expect(setValue).toHaveBeenCalledWith('3');
  });
});
