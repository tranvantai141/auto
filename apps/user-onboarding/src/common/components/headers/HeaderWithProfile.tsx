import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from '../../utils/Colors';
import Images from '../../utils/Images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import Loader from '@components/loaders/ActivityIndicator';
import { nameInitials } from 'src/common/utils/nameInitials';
import { HeaderLogo } from '@assets/images';

type Props = {
  iconTestId?: string;
  onPressIcon: () => void;
  buttonTestId?: string;
  name: string;
  familyName: string;
  isLoading: boolean;
};

const HeaderWithProfile = (props: Props) => {
  return (
    <View style={[styles.topSection, { paddingTop: hp(3)}]}>
      <HeaderLogo testID={props?.iconTestId} width={wp(20)} height={hp(5)}  />
      {/* <Image testID={props?.iconTestId} style={styles.logoStyle} source={Images.slogan} /> */}
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.profileNameTitle}>{props.name}</Text>
        <TouchableOpacity testID={props?.buttonTestId} onPress={props?.onPressIcon}>
          {/* commenting this for now because figma is updated but in conflunece page the UI is little different  */}
          {/* <Image style={styles.userPicStyle} source={Images.user}  /> */}
          {props.isLoading ? (
            <Loader />
          ) : (
            <View style={styles.name_view}>
              <Text style={styles.text_style}>
                {nameInitials(props?.name)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    paddingTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    paddingBottom: hp(1.5),
    backgroundColor: Color.white,
  },
  logoStyle: {
    height: wp(6),
    width: wp(18),
    alignSelf: 'center',
  },
  userPicStyle: {
    height: wp(8),
    width: wp(8),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  profileNameTitle: {
    fontSize: hp(1.4),
    fontWeight: '600',
    paddingRight: hp(1),
    alignSelf: 'center',
    color: Color.app_black,
  },
  name_view: {
    height: hp(3.5),
    width: hp(3.5),
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Color.light_green,
    backgroundColor: Color.light_green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_style: {
    fontSize: hp(1.4),
    fontWeight: '400',
    color: Color.white,
  },
});
export default HeaderWithProfile;
