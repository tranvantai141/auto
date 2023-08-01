import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import { Text, View } from 'react-native';
import { IconWarningError } from '@assets/images';
import { AppButton } from '@components/Button/AppButton';
import ScreenLayout from '@components/screen/ScreenLayout';
import { translate } from '../assets/translations/translate';

export function ErrorView({ error, resetErrorBoundary }: FallbackProps) {
  const queryClient = useQueryClient();

  return (
    <ScreenLayout appBar={<ScreenLayout.Appbar left={<ScreenLayout.BackButton />} />}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <IconWarningError height={64} width={64} style={{ marginBottom: 16 }} />
        <Text style={{ fontSize: 16, marginBottom: 16 }}>{translate('common_error_message')}</Text>
        <AppButton
          type="outline"
          onPress={() => {
            queryClient.clear();
            resetErrorBoundary();
          }}
        >
          {translate('common_retry')}
        </AppButton>
      </View>
    </ScreenLayout>
  );
}
