export const preset = 'react-native';
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
import mock from 'react-native-permissions/mock'
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'; // or use require
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@react-navigation/stack', () => ({}));
jest.mock('i18n-js', () => ({}));
jest.mock('i18n-js', () => ({
  I18n: () => {
    return {
      t: jest.fn((str) => str),
    };
  },
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => {
    return {
      t: jest.fn((str) => str),
    };
  },
}));
jest.mock('react-native-modal', () => jest.fn());
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native-permissions', () => {
	return mock;
});
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-device-info', () => mockRNDeviceInfo);
jest.mock('rn-fetch-blob', () => {
  return () => ({
    fs: jest.fn(),
    config: jest.fn(),
    DocumentDir: jest.fn(),
  });
})

