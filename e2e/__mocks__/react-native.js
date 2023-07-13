// __mocks__/react-native.js
export const Dimensions = {
  get: jest.fn().mockReturnValue({ width: 375, height: 812, fontScale: 2 }),
};

export const Platform = {
  OS: "ios",
  select: jest.fn().mockImplementation((options) => options.ios),
  isPad: false,
};

export const StatusBar = {
  currentHeight: 20,
};

export const StyleSheet = {
  create: jest.fn(),
};

export default {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
};
