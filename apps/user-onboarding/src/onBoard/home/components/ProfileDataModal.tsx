import React from 'react';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { USER_PROFILE_DATA } from 'src/typings/global';
import { LogoutIcon } from '@assets/images';

type Props = {
  isVisible?: boolean;
  data: USER_PROFILE_DATA;
  onBackDropPress?: () => void;
  onPress?: () => void;
  image_icon_id?: string;
  name_text_id?: string;
  type_text_id?: string;
  profession_text_id?: string;
  button_id?: string;
  button_text_id?: string;
  isLoading?: boolean;
};

const ProfileDataModal = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={100}
      animationOutTiming={100}
    >
      {props.isLoading ? (
        <View style={Styles.modal_view}>
          <ActivityIndicator style={Styles.loader} size={20} color={Color.primary} />;
        </View>
      ) : (
        <View style={Styles.modal_view}>
          <View style={{ padding: 16 }}>
            <Text testID={props?.name_text_id} style={[Styles.info_text, { fontSize: 18 }]}>
              {props.data?.fullname}
            </Text>
            <Text testID={props?.type_text_id} style={Styles.text_style}>
              {translate('role')}
            </Text>
            <Text testID={props?.profession_text_id} style={Styles.info_text}>
              {props.data?.role}
            </Text>
            <Text testID={props?.type_text_id} style={Styles.text_style}>
              {translate('room')}
            </Text>
            <Text testID={props?.profession_text_id} style={Styles.info_text}>
              {props.data?.department_name ? props.data?.department_name : '-'}
            </Text>
            <Text testID={props?.type_text_id} style={Styles.text_style}>
              {translate('branch')}
            </Text>
            <Text testID={props?.profession_text_id} style={Styles.info_text}>
              {props.data?.branch_name ? props.data?.branch_name : '-'}
            </Text>
          </View>
          <TouchableOpacity
            style={Styles.bottom_view}
            testID={props?.button_id}
            onPress={props?.onPress}
          >
            <LogoutIcon testID={props?.image_icon_id} style={Styles.logout_icon} />
            <Text testID={props?.button_text_id} style={Styles.logout_text}>
              {translate('logout')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
};

const Styles = StyleSheet.create({
  logout_icon: {
    height: hp(2.5),
    width: hp(2.5),
    alignSelf: 'center',
  },
  bottom_view: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E9E9E9',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  modal: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: 0,
  },
  point_icon: {
    height: 4,
    width: 4,
    marginTop: hp(1.3),
    marginRight: wp(2),
  },
  text_view: { flexDirection: 'row' },
  modal_view: {
    backgroundColor: Color.white,
    minWidth: wp(40),
    maxWidth: wp(80),
    borderRadius: 12,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    justifyContent: 'center',
    top: hp(3.8),
    position: 'absolute',
    right: -16,
    shadowColor: Color.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },

  info_text: {
    textAlign: 'left',
    color: Color.app_black,
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 10,
    fontWeight: '600',

  },
  text_style: {
    marginTop: hp(0.5),
    textAlign: 'left',
    color: Color.neutral_grey,
    fontSize: 15,
    width: wp(30),
    fontWeight: '400',
  },
  logout_text: {
    textAlign: 'left',
    color: Color.app_black,
    fontSize: 16,
    width: wp(30),
    fontWeight: '400',
    alignSelf: 'center',
    marginLeft: wp(2),
  },
  loader: {
    alignSelf: 'center',
    margin: 20,
  },
});
export default ProfileDataModal;
