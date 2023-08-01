import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
// import { IAdditionalCardInfo } from '@screens/productServices/typings';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { AdditionalCardIcon } from '@assets/images';
import HelperManager from 'src/common/utils/HelperManager';

type Props = {
  // data: IAdditionalCardInfo;
};

const AdditionalCardInfo = (props: Props) => {
  // const getSupplementalUpdateInfo = useAppSelector(
  //   (state: RootState) => state.getSupplementalInfoSlice.data
  // );

  const additionalInfoRequest = useAppSelector(
    (state: RootState) => state.updateAdditionalInfo.response
  );

  const getSupplementalUpdateInfo = useAppSelector(
    (state: RootState) => state.getSupplementalInfoSlice.data
  );

  const homePhone = HelperManager.isValid(getSupplementalUpdateInfo?.newHomePhone) ? getSupplementalUpdateInfo?.newHomePhone : getSupplementalUpdateInfo?.homePhone

  
  // if (Object.values(additionalInfoRequest).every(value => !HelperManager.isValid(value))) {
  //   return null
  // }

  return (
    <View>
      <View style={Style.headerContainer}>
        <AdditionalCardIcon height={32} width={32} />
        <Text style={Style.heading_text}>{'Thông tin bổ sung thẻ'} </Text>
      </View>
      <View style={Style.bodyContainer}>
        {additionalInfoRequest?.academicLevel && (
          <Text style={Style.text_info_phone}>
            {'Trình độ học vấn: '}
            <Text style={{ fontWeight: '400' }}>{additionalInfoRequest?.academicLevel ?? ''}</Text>
          </Text>
        )}

        {additionalInfoRequest?.marriedStatus && (
          <Text style={Style.text_info_phone}>
            {'Tình trạng hôn nhân: '}
            <Text style={{ fontWeight: '400' }}>{additionalInfoRequest?.marriedStatus ?? ''}</Text>
          </Text>
        )}
        {additionalInfoRequest?.motherName && (
          <Text style={Style.text_info_phone}>
            {'Họ và tên Mẹ đẻ: '}
            <Text style={{ fontWeight: '400' }}>{additionalInfoRequest?.motherName ?? ''}</Text>
          </Text>
        )}

        {additionalInfoRequest?.workingOrg && (
          <Text style={Style.text_info_phone}>
            {'Nơi công tác: '}
            <Text style={{ fontWeight: '400' }}>{additionalInfoRequest?.workingOrg ?? ''}</Text>
          </Text>
        )}

        {additionalInfoRequest?.detailedAddress && (
          <Text style={Style.text_info_phone}>
            {'Địa chỉ nơi công tác: '}
            <Text style={{ fontWeight: '400' }}>
              {`${additionalInfoRequest?.detailedAddress ?? ''} , ${
                additionalInfoRequest?.communceName ?? ''
              }, ${additionalInfoRequest?.districtName ?? ''}, ${
                additionalInfoRequest?.provinceName ?? ''
              }` ?? ''}
            </Text>
          </Text>
        )}

        {additionalInfoRequest?.workingMobileNumber && (
          <Text style={Style.text_info_phone}>
            {'Điện thoại nơi công tác: '}
            <Text style={{ fontWeight: '400' }}>
              {additionalInfoRequest?.workingMobileNumber ?? ''}
            </Text>
          </Text>
        )}
        {HelperManager.isValid(homePhone) && (
          <Text style={Style.text_info_phone}>
            {'Điện thoại nơi ở hiện tại: '}
            <Text style={{ fontWeight: '400' }}>
              {homePhone ?? ''}
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyContainer: {
    paddingLeft: 44,
  },
  view: {
    marginTop: hp(1),
    height: hp(66),
    width: wp(94),
  },
  text_info_phone: {
    fontSize: wp(1.976),
    fontWeight: '600',
    lineHeight: wp(3),
    marginLeft: wp(0.5),
    marginTop: wp(1),
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  box_style: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 12,
    paddingVertical: 10,
    borderColor: Colors.white,
  },
  icon_style: {
    height: hp(3.7),
    width: hp(3.7),
  },
  register_button: {
    alignSelf: 'flex-start',
    marginLeft: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1),
    flexDirection: 'row',
  },
  button_text: {
    color: Colors.light_black,
    fontSize: hp(1.6),
    fontWeight: '400',
    marginLeft: 10,
  },
  title_text: {
    marginLeft: wp(2),
    color: Colors.black,
    fontSize: hp(1.8),
    fontWeight: '600',
  },
  right_icon_view: {
    right: 10,
    position: 'absolute',
    top: 10,
  },
  check_icon: {
    height: hp(2.2),
    width: hp(2.2),
  },
  error_text: {
    color: Colors.red,
    fontSize: hp(1.5),
    fontWeight: '400',
  },
  heading_text: {
    fontSize: hp(1.6),
    fontWeight: '600',
    textAlign: 'left',
    paddingLeft: 16,
  },
});
export default AdditionalCardInfo;
