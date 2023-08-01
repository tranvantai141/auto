import { render } from '@testing-library/react-native';

import { AppButton, AppButtonProps } from '../AppButton';
import React from 'react';

jest.mock('react-native-gesture-handler', () => ({
  TouchableOpacity: 'TouchableOpacity',
}));

const propGradientEnabled: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: false,
  style: {},
  textStyles: {},
  type: 'gradient',
  left: 'continue',
  right: 'home',
  loading: false,
};

const propGradientDisabled: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: true,
  style: {},
  textStyles: {},
  type: 'gradient',
  left: 'continue',
  right: 'home',
  loading: false,
};

const propOutlineEnabled: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: false,
  style: {},
  textStyles: {},
  type: 'outline',
  left: 'continue',
  right: 'home',
  loading: false,
};

const propOutlineDisabled: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: true,
  style: {},
  textStyles: {},
  type: 'outline',
  left: 'continue',
  right: 'home',
  loading: false,
};

const propPlainEnabled: AppButtonProps = {
  children: <></>,
  onPress: jest.fn(),
  disabled: false,
  style: {},
  textStyles: {},
  type: 'plain',
  left: 'continue',
  right: 'home',
  loading: false,
};

const propPlainDisabled: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: true,
  style: {},
  textStyles: {},
  type: 'plain',
  left: 'continue',
  right: 'home',
  loading: false,
};

const propGradientEnabledLoading: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: false,
  style: {},
  textStyles: {},
  type: 'gradient',
  left: 'continue',
  right: 'home',
  loading: true,
};

const propGradientDisabledLoading: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: true,
  style: {},
  textStyles: {},
  type: 'gradient',
  left: 'continue',
  right: 'home',
  loading: true,
};

const propOutlineEnabledLoading: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: false,
  style: {},
  textStyles: {},
  type: 'outline',
  left: 'reload',
  right: 'home',
  loading: true,
};

const propOutlineDisabledLoading: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: true,
  style: {},
  textStyles: {},
  type: 'outline',
  left: 'continue',
  right: 'home',
  loading: true,
};

const propPlainEnabledLoading: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: false,
  style: {},
  textStyles: {},
  type: 'plain',
  left: 'continue',
  right: 'home',
  loading: true,
};

const propPlainDisabledLoading: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: true,
  style: {},
  textStyles: {},
  type: 'plain',
  left: 'continue',
  right: 'home',
  loading: true,
};

const propGradientEnabledReloadIcon: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: false,
  style: {},
  textStyles: {},
  type: 'gradient',
  left: 'reload',
  right: 'reload',
  loading: false,
};

const propGradientEnabledCustomIcon: AppButtonProps = {
  children: 'some',
  onPress: jest.fn(),
  disabled: false,
  style: {},
  textStyles: {},
  type: 'gradient',
  left: <></>,
  right: 'reload',
  loading: false,
};

describe('AppButton', () => {
  const testCases = [
    propGradientEnabled,
    propGradientDisabled,
    propOutlineEnabled,
    propOutlineDisabled,
    propPlainEnabled,
    propPlainDisabled,
    propGradientEnabledLoading,
    propGradientDisabledLoading,
    propOutlineEnabledLoading,
    propOutlineDisabledLoading,
    propPlainEnabledLoading,
    propPlainDisabledLoading,
    propGradientEnabledReloadIcon,
    propGradientEnabledCustomIcon,
  ];

  testCases.forEach((testCase) => {
    it(`should render ${testCase.type} button`, () => {
      render(<AppButton {...testCase} />);
    });
  });
});
