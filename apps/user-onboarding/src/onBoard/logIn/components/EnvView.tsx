import { Text, View } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import React from 'react';

function EnvView() {
  const env = Config.ENV;
  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  const isProd = env === 'prod';
  const isDebug = __DEV__;

  return (
    <View style={{ alignSelf: 'center' }}>
      {isProd || <Text>ENV: {env}</Text>}
      <Text>{`${version} (${buildNumber})`}</Text>
      {isDebug && <Text>Display name: {Config.DISPLAY_NAME}</Text>}
      {isDebug && <Text>URL: {Config.BASE_URL}</Text>}
      {isDebug && <Text>MK: {Config.MK_KEY}</Text>}
      {isDebug && <Text>MK URL: {Config.MK_URL}</Text>}
    </View>
  );
}

export default EnvView;
