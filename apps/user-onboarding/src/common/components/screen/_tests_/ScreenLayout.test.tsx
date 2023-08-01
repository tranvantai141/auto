import { render } from '@testing-library/react-native';
import React from 'react';

import ScreenLayout from '../ScreenLayout';

// mock useSafeAreaInsets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }),
  SafeAreaView: ({ children }: { children: JSX.Element | JSX.Element[] }) => <>{children}</>,
}));

describe('ScreenLayout', () => {
  it('should render ScreenLayout', async () => {
    render(
      <ScreenLayout>
        <></>
      </ScreenLayout>
    );
  });
});
