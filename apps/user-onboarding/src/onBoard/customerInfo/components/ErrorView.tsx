import { MocErrorShape } from '@assets/images';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FallbackProps } from 'react-error-boundary';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from '@components/Button/GradientButton';
import { translate } from 'src/common/utils/translations/translate';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import { RouteNames } from '@routeNames';
import Colors from 'src/common/utils/Colors';
import { useQueryClient } from '@tanstack/react-query';
import { ConfirmDialog } from 'src/hooks/useConfirmModal';
import { AxiosError } from 'axios';

function ErrorView({ error, resetErrorBoundary }: FallbackProps) {
  const navigation = useRootNavigation();
  const queryClient = useQueryClient();

  const errorMessage = (function () {
    if (error instanceof AxiosError) {
      const exception = error.response?.data?.exception as {
        code: string;
        message: string;
      };
      const code = exception?.code;
      const message = exception?.message;
      if (code != null && message != null) {
        return `Lỗi: ${code} - ${message}`;
      }
    }
    return 'Lỗi: Không kết nối được hệ thống';
  })();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <ConfirmDialog
        isOpen={true}
        icon="warning"
        text={errorMessage}
        confirmText="Thử lại"
        close={() => {
          //
        }}
        resolve={(isRetry) => {
          if (isRetry) {
            queryClient.clear();
            resetErrorBoundary();
          } else {
            queryClient.clear();
            navigation.goBack();
          }
        }}
        cancelText="Đóng"
      />
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MocErrorShape height={hp(30)} width={wp(50)} />
      <Text style={{ fontWeight: '500', fontSize: 16 }}>
        {error?.message ?? (typeof error === 'string' ? error : JSON.stringify(error))}
      </Text>
      <GradientButton
        buttonStyle={Style.buttonStyle}
        buttonText={translate('back_to_home')}
        icon
        onPress={() => {
          navigation.navigate(RouteNames.home.name);
        }}
      />
      <TouchableOpacity
        style={Style.retryButton}
        onPress={() => {
          queryClient.clear();
          resetErrorBoundary();
        }}
      >
        <Text style={{}}>{translate('retry')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const Style = StyleSheet.create({
  buttonStyle: {
    marginTop: hp(2),
    width: wp(30),
    alignSelf: 'center',
    marginBottom: hp(2),
    height: hp(5),
    flexDirection: 'row',
  },
  retryButton: {
    marginTop: hp(1),
    width: wp(30),
    alignSelf: 'center',
    height: hp(5),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
});

export default ErrorView;
