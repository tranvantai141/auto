// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Reactotron, { networking } from 'reactotron-react-native';
//
// const yeOldeConsoleLog = console.log;
// console.log = (...args) => {
//   yeOldeConsoleLog(...args);
//   Reactotron.display({
//     name: 'CONSOLE.LOG',
//     value: args,
//     preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
//   });
// };
//
// Reactotron.setAsyncStorageHandler(AsyncStorage)
//   .configure({
//     name: 'React Native Demo',
//   })
//   .useReactNative({
//     asyncStorage: false,
//     networking: {
//       ignoreUrls: /symbolicate/,
//     },
//     editor: false,
//     errors: { veto: (stackFrame) => false },
//     overlay: false,
//   })
//   .use(networking())
//   .connect();
