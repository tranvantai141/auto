import LoadingBox from '@components/LoadingBox';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('LoadingBox', () => {
  test('should render correctly', () => {
    render(<LoadingBox />);
  });
});
