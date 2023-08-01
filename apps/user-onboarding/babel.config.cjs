
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/common/components',
          '@testIds': './src/utils/Constants/TestIds',
          '@screens': './src/onBoard',
          '@assets': './src/assets',
          '@dummy': './src/dummyContent',
          '@interfaces': './src/interfaces',
          '@stack': './src/navigation/stack',
          '@translations': './src/translations',
          '@routeNames': './src/navigation/RouteNames',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.json', '.ts', '.tsx'],
      },
    ],
    ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
  ],
};
