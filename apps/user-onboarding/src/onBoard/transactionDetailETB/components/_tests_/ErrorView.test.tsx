import React from 'react';
import { ErrorView } from '../ErrorView';
import { fireEvent, render } from '@testing-library/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// mock useQueryClient() function
jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(() => ({
    clear: jest.fn(),
  })),
}));

// mock useSafeAreaInsets() function
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({
    top: 0,
    bottom: 0,
  })),
  SafeAreaView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// mock useRootNavigation() function
jest.mock('src/navigation/hooks/useRootNavigation', () => () => ({
  navigate: jest.fn(),
}));

describe('ErrorView', () => {
  it('should render correctly', async () => {
    const { findByRole } = render(
      <GestureHandlerRootView>
        <ErrorView
          error={null}
          resetErrorBoundary={() => {
            // do nothing
          }}
        />
      </GestureHandlerRootView>
    );
    // Find TouchableOpacity component
    const btnRetry = await findByRole('button');
    fireEvent.press(btnRetry);
  });
});
