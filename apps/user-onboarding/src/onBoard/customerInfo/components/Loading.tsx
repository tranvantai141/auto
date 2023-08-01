import LoadingIcon from '@screens/onBoardingReader/components/Loading';
import React from 'react';
import { View } from 'react-native';

function Loading() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingIcon visible={true} />
    </View>
  );
}

export default Loading;
