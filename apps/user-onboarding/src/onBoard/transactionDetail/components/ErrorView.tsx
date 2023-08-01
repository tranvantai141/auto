import { IconWarning } from '@assets/images';
import React from 'react';
import { Text, View } from 'react-native';

const ErrorView = ({ error }: { error: string }) => {
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 }}
    >
      <IconWarning style={{ marginBottom: 20 }} height={100} width={100} />
      <Text>{error}</Text>
    </View>
  );
};

export default ErrorView;
