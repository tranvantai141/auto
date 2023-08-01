import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import AppBar, { AppBarProps } from '../AppBar';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('react-native-gesture-handler', () => ({
  TouchableOpacity: 'TouchableOpacity',
}));

// mock useRootNavigation
jest.mock('src/navigation/hooks/useRootNavigation', () => () => ({
  goBack: jest.fn(),
}));

describe('AppBar', () => {
  const appBarTestCaseProps: AppBarProps[] = [
    {
      style: {},
      left: <AppBar.BackButton />,
      right: <></>,
      center: <></>,
    },
    {
      style: {},
      left: <AppBar.BackButton />,
      right: <AppBar.CancelTransactionButton onPress={jest.fn()} />,
      center: <AppBar.Title title="some title" />,
    },
    {
      style: {},
      left: <AppBar.BackButton tintColor="black" icon={<></>} />,
      right: <AppBar.CancelTransactionButton tintColor="gray" onPress={jest.fn()} />,
      center: <AppBar.Title title="some title" tintColor="black" />,
    },
    {
      style: {},
      left: <AppBar.BackButton tintColor="black" />,
      right: <AppBar.CancelTransactionButton tintColor="gray" onPress={jest.fn()} />,
      center: <AppBar.Title title="some title" tintColor="black" />,
    },
  ];

  appBarTestCaseProps.forEach((props) => {
    it(`should render AppBar with props: ${JSON.stringify(props)}`, async () => {
      const { findByText } = render(
        <NavigationContainer>
          <AppBar {...props} />
        </NavigationContainer>
      );
      const e = await findByText('come_back');
      if (e) {
        fireEvent.press(e);
      }
    });
  });
});
