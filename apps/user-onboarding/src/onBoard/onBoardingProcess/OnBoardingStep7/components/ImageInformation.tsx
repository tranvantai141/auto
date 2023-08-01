import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';

type Props = {
  text_id: string;
  image_id: string;
  customerInfo?: boolean;
};

const ImageInformation = (props: Props) => {
  return (
    <View>
      {props?.customerInfo ? (
        <Image
          testID={props?.image_id}
          source={Images.user}
          style={[Style.image_style, { marginLeft: wp(5) }]}
        />
      ) : (
        <Text testID={props?.text_id} style={Style.heading_style}>
          {translate('face_photo')}
        </Text>
      )}
      {!props?.customerInfo ? (
        <Image testID={props?.image_id} source={Images.user} style={Style.image_style} />
      ) : (
        <Text
          testID={props?.text_id}
          style={[Style.heading_style, { marginTop: 0, marginLeft: wp(5) }]}
        >
          {translate('face_photo')}
        </Text>
      )}
      {props?.customerInfo && (
        <>
          <View style={Style.info_view}>
            <Image
              resizeMode="contain"
              testID={TestIds.checked_item + '1'}
              style={{ height: hp(2.5), width: hp(2.5) }}
              source={Images.checked_circle}
            />
            <Text
              testID={TestIds.authentication_process + '1'}
              numberOfLines={2}
              style={{ width: wp(15), marginLeft: wp(1.5), fontSize: 16 }}
            >
              {translate('face_authentication_successfull')}
            </Text>
          </View>
          <View style={Style.info_view}>
            <Image
              testID={TestIds.checked_item + '2'}
              resizeMode="contain"
              style={{ height: hp(2.5), width: hp(2.5) }}
              source={Images.checked_circle}
            />

            <Text
              testID={TestIds.authentication_process + '2'}
              numberOfLines={2}
              style={{ width: wp(15), marginLeft: wp(1.5), fontSize: 16 }}
            >
              {translate('cccd_authentication_successfull')}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  info_view: {
    marginLeft: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image_style: {
    height: hp(15),
    width: hp(15),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.white,
    marginLeft: wp(15),
    marginVertical: hp(2),
  },
  heading_style: {
    fontSize: hp(2),
    marginTop: hp(2),
    fontWeight: '600',
    color: Color.app_black,
    marginLeft: wp(15),
  },
});
export default ImageInformation;
