import React from 'react';
import ErrorModal from '..';
import { fireEvent, render, screen } from '@testing-library/react';
const mockProps = {
  open: {
    bool: true,
    err: {
      response: {
        data: {
          message: 'error',
        },
      },
    },
    success: true,
  },
  setOpen: jest.fn(),
  handleClose: jest.fn(),
  handleOpen: jest.fn(),
};
jest.mock('react-router', () => ({
  useNavigate: () => jest.fn(),
}));
describe('ErrorModal', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<ErrorModal {...mockProps} />);
    expect(asFragment).toMatchSnapshot();
  });
  it('should close modal and navigate to edit page when clicking save draft button', () => {
    const { getByTestId } = render(<ErrorModal {...mockProps} />);
    const draftButton = getByTestId('draft-button');
    fireEvent.click(draftButton);
    expect(mockProps.handleClose).toHaveBeenCalled();
  });
  it('should close modal and navigate to auto fill page when clicking auto fill button', () => {
    const { getByTestId } = render(<ErrorModal {...mockProps} />);
    const autoFillButton = getByTestId('auto-fill-button');
    fireEvent.click(autoFillButton);
    expect(mockProps.handleClose).toHaveBeenCalled();
  });
  it('should display close button there is some error', () => {
    const newProps = {
      ...mockProps,
      open: {
        ...mockProps.open,
        err: {
          message: 'error',
        },
        success: false,
      },
    };
    const { getByTestId } = render(<ErrorModal {...newProps} />);
    const closeButton = getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockProps.handleClose).toHaveBeenCalled();
  });
  it('should display completion not possible message when project cannot be completed', () => {
    const newProps = {
      ...mockProps,
      open: {
        ...mockProps.open,
        err: {
          response: {
            data: {
              message: 'error',
            },
          },
        },
        success: false,
      },
    };
    render(<ErrorModal {...newProps} />);
    expect(screen.getByText('Completion Not Possible')).toBeInTheDocument();
  });
});
