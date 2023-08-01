import { render } from '@testing-library/react-native';
import React from 'react';

import CommonSuspense, { withCommonSuspense } from '../CommonSuspense';
import { Text } from 'react-native';

// mock suspense
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Suspense: ({ children }: { children: JSX.Element | JSX.Element[] }) => <>{children}</>,
}));

describe('CommonSuspense', () => {
  it('should render CommonSuspense', async () => {
    const { findByText } = render(
      <CommonSuspense>
        <Text>some</Text>
      </CommonSuspense>
    );
    const e = await findByText('some');
    expect(e).toBeTruthy();
  });
});

// test HOC
describe('withCommonSuspense', () => {
  const Component = () => <Text>some</Text>;
  const WrappedComponent = withCommonSuspense(Component);
  it('should render withCommonSuspense', async () => {
    const { findByText } = render(<WrappedComponent />);
    const e = await findByText('some');
    expect(e).toBeTruthy();
  });
});
