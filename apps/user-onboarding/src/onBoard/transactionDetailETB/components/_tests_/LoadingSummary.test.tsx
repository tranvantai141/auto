import React from 'react';
import { LoadingSummary } from '../LoadingSummary';
import { render } from '@testing-library/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// mock useQueryClient() function
// jest.mock('@tanstack/react-query', () => ({
//   useQueryClient: jest.fn(() => ({
//     clear: jest.fn(),
//   })),
// }));

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
    render(
      <GestureHandlerRootView>
        <LoadingSummary />
      </GestureHandlerRootView>
    );
  });
});
