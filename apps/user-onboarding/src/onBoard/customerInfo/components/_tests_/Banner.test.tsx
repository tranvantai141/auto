import { render } from '@testing-library/react-native';
import React from 'react';

import Banner from '../Banner';

describe('Banner', () => {
  it('should render correctly', () => {
    render(
      <Banner type={'error'} style={{}}>
        {'some'}
      </Banner>
    );
  });

  it('should render correctly with action', () => {
    render(
      <Banner type={'info'} style={{}} action={<></>}>
        {'some'}
      </Banner>
    );
  });

  it('should render correctly with string children', () => {
    render(
      <Banner type={'warning'} style={{}}>
        <></>
      </Banner>
    );
  });
});
