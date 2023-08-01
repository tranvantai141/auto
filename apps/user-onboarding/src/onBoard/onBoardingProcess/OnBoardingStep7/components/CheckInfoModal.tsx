import Color from '../assets/Colors';
import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  onSelectItem?: (item: any) => void;
  status?: 'done' | 'cancelled';
  image_icon_id?: string;
  notify_text_id?: string;
  indicator_id?: string;
  check_info_id?: string;
  message_id?: string;
  button_1_id?: string;
  button_2_id?: string;
  isLoading: boolean
};

const CheckInfoModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        {props?.status === 'done' ? (
          <Image
            resizeMode="contain"
            testID={props?.image_icon_id}
            style={Styles.image_icon}
            source={Images.checked_circle}
          />
        ) : (
          <Text testID={props?.notify_text_id} numberOfLines={2} style={Styles.info_text}>
            {translate('notify')}
          </Text>
        )}
        {props.isLoading && (
          <ActivityIndicator testID={props?.indicator_id} color={Color.primary} size={'large'} />
        )}
        {props?.status != 'cancelled' && (
          <Text testID={props?.check_info_id} numberOfLines={2} style={Styles.info_text}>
            {translate('check_information')}
          </Text>
        )}
        {props?.status === 'cancelled' && (
          <>
            <Text testID={props?.message_id} numberOfLines={2} style={Styles.try_text}>
              {translate('message_for_officers')}
            </Text>

            <View style={Styles.button_box}>
              <TouchableOpacity testID={props?.button_1_id} style={Styles.white_button}>
                <Text style={Styles.button_text}>{translate('refuse')}</Text>
              </TouchableOpacity>
              <GradientButton
                testIdValue={props?.button_2_id}
                buttonText={translate('review')}
                buttonStyle={{ width: wp(16) }}
              />
            </View>
          </>
        )}
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
    fontWeight: '300',
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
    marginTop: hp(2),
    textAlign: 'center',
    color: Color.app_black,
    fontSize: 20,
    fontWeight: '600',
  },
  image_icon: { height: hp(4.5), width: hp(4.5), alignSelf: 'center' },
  button_box: { justifyContent: 'space-between', flexDirection: 'row' },
});
export default CheckInfoModal;
