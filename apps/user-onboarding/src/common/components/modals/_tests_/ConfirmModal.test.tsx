import { render } from '@testing-library/react-native';
import React from 'react';

import ConfirmModal from '../ConfirmModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

describe('ModalIcon', () => {
  it('should render correctly', () => {
    render(<ConfirmModal.Icon icon={'warning'} />);
  });
});

describe('ModalText', () => {
  it('should render correctly with body', () => {
    render(<ConfirmModal.Text type="body">some</ConfirmModal.Text>);
  });

  it('should render correctly with title', () => {
    render(<ConfirmModal.Text type="title">some</ConfirmModal.Text>);
  });
});

describe('ModalActions', () => {
  it('should render correctly with single', () => {
    render(
      <GestureHandlerRootView>
        <ConfirmModal.Actions
          type="single"
          action={{
            type: 'preferred',
            text: 'some',
            onPress: jest.fn(),
          }}
        />
      </GestureHandlerRootView>
    );
  });

  it('should render correctly with double', () => {
    render(
      <GestureHandlerRootView>
        <ConfirmModal.Actions
          type="double"
          leftAction={{
            type: 'preferred',
            text: 'some',
            leftIcon: 'home-white',
            onPress: jest.fn(),
          }}
          rightAction={{
            type: 'secondary',
            text: 'some',
            leftIcon: 'home-black',
            onPress: jest.fn(),
          }}
        />
      </GestureHandlerRootView>
    );
  });
});

describe('ConfirmModal', () => {
  it('should render correctly', () => {
    render(
      <ConfirmModal isVisible={true}>
        <ConfirmModal.Icon icon={'warning'} />
        <ConfirmModal.Text type="title">some</ConfirmModal.Text>
        <ConfirmModal.Text type="body">some</ConfirmModal.Text>
        <ConfirmModal.Actions
          type="single"
          action={{
            type: 'preferred',
            text: 'some',
            onPress: jest.fn(),
          }}
        />
      </ConfirmModal>
    );
  });
});
