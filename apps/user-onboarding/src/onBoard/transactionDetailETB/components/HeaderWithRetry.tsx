import React from 'react';
import { Text, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { AppButton } from '@components/Button/AppButton';
import { useLoading } from 'src/hooks/useLoading';

type Props = {
  title: string;
  shouldShowRetry: boolean;
  onRetryPress: () => Promise<void>;
  onManualPress: () => Promise<void>;
};

export function HeaderWithRetry({ title, shouldShowRetry, onManualPress, onRetryPress }: Props) {
  const [retryLoading, startRetryLoading] = useLoading();
  const [manualLoading, startManualLoading] = useLoading();

  const handleRetryPress = () => {
    startRetryLoading(onRetryPress());
  };

  const handleManualPress = () => {
    startManualLoading(onManualPress());
  };

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        paddingHorizontal: 24,
        paddingVertical: 12,
        marginBottom: -9,
        top: -10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: '600' }}>{title}</Text>
      {shouldShowRetry && (
        <View style={{ flexDirection: 'row' }}>
          <AppButton
            onPress={handleRetryPress}
            type="gradient"
            style={{ marginLeft: 16, paddingVertical: 12 }}
            loading={retryLoading}
          >
            {translate('common_retry')}
          </AppButton>
          <AppButton
            onPress={handleManualPress}
            type="outline"
            style={{ marginLeft: 16, borderColor: Colors.app_green, paddingVertical: 12 }}
            textStyles={{ color: Colors.app_green }}
            loading={manualLoading}
          >
            {translate('btn_handle_manual')}
          </AppButton>
        </View>
      )}
    </View>
  );
}
