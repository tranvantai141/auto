import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Loader from '@components/loaders/ActivityIndicator';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  onSelectItem?: (item: any) => void;
  status?: string;
  image_icon_id?: string;
  notify_text_id?: string;
  indicator_id?: string;
  check_info_id?: string;
  message_id?: string;
  button_1_id?: string;
  button_2_id?: string;
  onPressAgree?: () => void;
  onPressReject?: () => void;
  isLoading?: boolean,
  isLoadingAgree?: boolean
};

const CancelAMLpopup = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <Text testID={props?.message_id} style={Styles.try_text}>
          {translate('stop_working_message')}
        </Text>
        <View style={Styles.button_box}>
          <TouchableOpacity testID={props?.button_1_id} style={Styles.white_button} onPress={props.onPressReject}>
            {props?.isLoading ? (
              <Loader color={Color.white} style={Styles.loaderStyle} />
            ) : (
              <Text style={Styles.button_text}>{translate('cancel')}</Text>
            )}
          </TouchableOpacity>
          <GradientButton
            testIdValue={props?.button_2_id}
            buttonText={translate('sure')}
            buttonStyle={{ width: wp(16) }}
            onPress={props.onPressAgree}
            isLoading={props.isLoadingAgree}
          />
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  white_button: {
    width: wp(16),
    backgroundColor: Color.white,
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Color.neutral_gray,
  },
  try_text: {
    marginTop: hp(2),
    textAlign: 'center',
    color: Color.loading_color,
    fontSize: 18,
    width: wp(35),
    marginBottom: hp(1),
    fontWeight: '400',
  },
  button_text: {
    color: Color.app_black,
    fontWeight: 'normal',
    fontSize: 18,
  },
  modal: {
    backgroundColor: Color.grey_transparent,
    flex: 1,
    margin: 0,
  },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: hp(4.5),
    paddingVertical: hp(2),
    justifyContent: 'center',
  },
  info_text: {
    textAlign: 'center',
    color: Color.app_black,
    fontSize: 20,
    fontWeight: '600',
  },
  image_icon: { height: hp(4.5), width: hp(4.5), alignSelf: 'center' },
  button_box: { justifyContent: 'space-between', flexDirection: 'row' },
  loaderStyle: {
    margin: 0,
  },
});
export default CancelAMLpopup;
