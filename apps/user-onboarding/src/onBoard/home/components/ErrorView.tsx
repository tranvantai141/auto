import { MocErrorShape } from '@assets/images';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FallbackProps } from 'react-error-boundary';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Colors from 'src/common/utils/Colors';
import { translate } from '@screens/customerInfo/assets/translations/translate';
import { AppButton } from '@components/Button/AppButton';
import { ImgeError } from '@assets/images';
import { AxiosError } from 'axios';


type Props = {
  onPressRetry?: () => void;
  error : FallbackProps
};

const ErrorView = ( props : Props) => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: hp(20) }}>
      <ImgeError height={240} width={240} />
      <Text style={{ fontWeight: '400', fontSize: 17, marginTop: 24 }}>
        {`Lỗi: ` + props?.error ??
          (typeof props?.error === 'string' ? props?.error : JSON.stringify(props?.error))}
      </Text>
      <AppButton
        type="gradient"
        textStyles={{ fontSize: 16 }}
        disabled={false}
        style={{ marginTop: 24, height: hp(5) }}
        onPress={props?.onPressRetry}
        left="reload"
      >
        Thử lại
      </AppButton>
    </View>
  );
}

const PrimaryButton = ({ buttonText, onPress }: { buttonText: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={{marginTop : hp(2) , width : wp(20) , height : hp(25) }} onPress={onPress}>
      <View style={Style.primaryButton}>
        <Text style={Style.primaryButtonText}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

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
  primaryButton: {
    backgroundColor: Colors.app_green,
    borderColor: Colors.app_green,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
    justifyContent : 'center',
    alignItems : 'center'
  },
  primaryButtonText: {
    color: Colors.white,
    fontWeight : 'bold',
    fontSize: 16,
  },
});

export default ErrorView;
