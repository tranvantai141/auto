import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import InfoTextLineView from '../../../../common/components/onboarding/InfoTextLineView';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { IServiceInfoHeadings } from '@interfaces/I_Personal_information';

type Props = {
  test_id?: string;
};

const ServiceInformation = (props: Props) => {
  return (
    <>
      <Text style={Style.heading_style}>{translate('service')}</Text>
      <View testID={props?.test_id} style={Style.info_box}>
        {IServiceInfoHeadings.map((item, index) => {
          return (
            <InfoTextLineView
              key={item.id}
              text_id={TestIds.service_title + index}
              image_id={TestIds.service_icon + index}
              heading={item.name}
              service
            />
          );
        })}
      </View>
    </>
  );
};

const Style = StyleSheet.create({
  heading_style: {
    fontSize: hp(2),
    marginTop: hp(2),
    fontWeight: '600',
    color: Color.app_black,
    marginLeft: wp(15),
  },
  info_box: {
    marginTop: hp(2),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.white,
    width: wp(70),
    backgroundColor: 'red',
    alignSelf: 'center',
  },
});
export default ServiceInformation;
