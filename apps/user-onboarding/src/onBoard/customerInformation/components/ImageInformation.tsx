import React from 'react';
import { StyleSheet, Text, Image, View, TextInput } from 'react-native';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { IconCard, IconCheck, IconFace } from '@assets/images';
import { styles } from '@screens/phoneNumberCheck/container/Styles';
import { MoCResultFlow } from '@screens/customerInfo/hooks/useMocResultFlow';

export type ImageInformationProps = {
  text_id?: string;
  image_id?: string;
  imageUri?: string;
  onChangeText: (e: string) => void;
  value?: string;
  cifs?: unknown[];
  resultData?: MoCResultFlow;
};

export function ImageInformation({
  text_id,
  image_id,
  imageUri,
  onChangeText,
  value,
  cifs,
  resultData,
}: ImageInformationProps) {
  //View status CIF
  const statusCIF = ({ totalCif = 0 }) => {
    return (
      <View
        style={[
          Style.statusCIF,
          {
            backgroundColor: totalCif
              ? totalCif == 1
                ? Color.purple_10
                : Color.red_10
              : Color.brown_10,
            marginBottom: totalCif ? 0 : 8,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '600',
            color: totalCif ? (totalCif === 1 ? Color.purple_70 : Color.red_60) : Color.brown_60,
          }}
        >
          {totalCif
            ? `${'Khách hàng đã tồn tại '}${totalCif} ${'CIF'}`
            : 'Khách hàng chưa tồn tại CIF'}
        </Text>
      </View>
    );
  };

  //View status moC
  const statusMoC = ({ type = 0, title = '' }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Color.background_grey,
          paddingBottom: 10,
          marginLeft: wp(1.975),
          // marginTop: wp(1.975),
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 8,
        }}
      >
        {(type === 1 && <IconFace width={wp(6.419)} height={wp(5.432)} />) || (
          <IconCard width={wp(6.419)} height={wp(5.432)} />
        )}
        <Text style={{ color: Color.gray_100, fontSize: 16, marginTop: 8, lineHeight: wp(2.962) }}>
          {(type === 1 && 'Xác thực gương mặt') || 'Xác thực CCCD với Bộ Công an'}
        </Text>
        <Text
          style={{ color: Color.green_90, fontSize: 20, fontWeight: '600', lineHeight: wp(3.703) }}
        >
          {'THÀNH CÔNG'}
        </Text>
      </View>
    );
  };

  return (
    <View style={Style.imageInfoTopView}>
      <Image
        testID={image_id}
        source={imageUri ? { uri: imageUri } : Images.newUser}
        style={[Style.image_style]}
      />
      <View style={{ flex: 1 }}>
        {resultData?.result === 'INVALID_MOC' &&
        resultData.errors.filter((e) => e === 'EXPIRED' || e === 'ELIGIBLE_AGE')?.length > 0
          ? null
          : statusCIF({ totalCif: cifs?.length ?? 0 })}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingTop: cifs?.length ? wp(1.975) : 0,
          }}
        >
          {statusMoC({ type: 1, title: 'CMND' })}
          {statusMoC({ type: 2, title: 'CCCD' })}
        </View>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  info_view: {
    marginLeft: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text_view: { width: wp(60), marginLeft: wp(1.5), fontSize: 16 },
  text_vatNum: { color: Color.app_black, fontSize: hp(1.5), fontWeight: '500' },
  image_style: {
    height: wp(22.96),
    width: wp(22.96),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.white,
  },
  heading_style: {
    fontSize: hp(2),
    marginTop: hp(2),
    fontWeight: '600',
    color: Color.app_black,
    marginLeft: wp(15),
  },
  inputView: {
    // flex: 1,
    width: wp(67.5),
    backgroundColor: Color.white,
    marginLeft: wp(3),
    borderRadius: 12,
    padding: wp(2),
    // borderWidth: 1,
    borderColor: Color.border_grey,
  },
  inputStyle: {
    height: hp(4),
    backgroundColor: Color.white,
    marginTop: hp(0.8),
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: Color.onboarding_grey,
    fontSize: hp(1.4),
  },
  imageInfoTopView: {
    marginBottom: wp(1.975),
    flexDirection: 'row',
    backgroundColor: Color.white,
    padding: wp(1.975),
    borderRadius: 12,
  },
  statusCIF: {
    paddingHorizontal: wp(1.481),
    paddingVertical: wp(0.987),
    borderRadius: 12,
    marginLeft: wp(1.975),
    flexDirection: 'row',
    backgroundColor: Color.purple_10,
  },
});
export default ImageInformation;
