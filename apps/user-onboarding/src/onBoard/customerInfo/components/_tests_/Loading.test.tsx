import { render } from '@testing-library/react-native';
import React from 'react';
import Loading from '../Loading';

describe('Loading', () => {
  test('should render correctly', () => {
    render(<Loading />);
  });
});
