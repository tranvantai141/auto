/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { startNetworkLogging } from 'react-native-network-logger';
import { setDefaultLanguage } from './src/common/utils/DefaultLanguage';
startNetworkLogging();
setDefaultLanguage('vt');
AppRegistry.registerComponent(appName, () => App);
