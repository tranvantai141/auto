import { fireEvent, render } from '@testing-library/react-native';
import ErrorView from '../ErrorView';
import React from 'react';

// mock useRootNavigation
jest.mock('src/navigation/hooks/useRootNavigation', () => () => ({
  navigate: jest.fn(),
}));

// mock useQueryClient
jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(() => ({
    clear: jest.fn(),
  })),
}));

// mock RouteNames
jest.mock('src/navigation/RouteNames', () => ({
  RouteNames: {
    home: {
      name: 'home',
    },
  },
}));

describe('ErrorView', () => {
  it('should render correctly', async () => {
    const { findByText } = render(
      <ErrorView error={new Error('some')} resetErrorBoundary={jest.fn()} />
    );
    const btnHome = await findByText('back_to_home');
    const btnRetry = await findByText('retry');
    expect(btnHome).toBeTruthy();
    expect(btnRetry).toBeTruthy();
    fireEvent.press(btnHome);
    fireEvent.press(btnRetry);
  });

  it('should render correctly with string error', () => {
    render(<ErrorView error={'some'} resetErrorBoundary={jest.fn()} />);
  });
});
