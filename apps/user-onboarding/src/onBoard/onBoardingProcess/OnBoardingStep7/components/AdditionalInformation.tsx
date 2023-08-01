import Color from '../assets/Colors';
import { TestIds } from '../assets/TestIds';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import InfoTextLineView from '../../../../common/components/onboarding/InfoTextLineView';
import { IAdditionalInfoHeadings, IAdditionalInfoForm } from '@interfaces/I_Additional_information';
import { translate } from '../assets/translations/translate';

type Props = {
  data: IAdditionalInfoForm;
  test_id?: string;
};

const AdditionalInformation = (props: Props) => {
  const { data } = props;
  return (
    <>
      <Text style={Style.heading_style}>{translate('additional_information')}</Text>
      <View testID={props?.test_id} style={Style.info_box}>
        {IAdditionalInfoHeadings.map((item, index) => {
          return (
            <InfoTextLineView
              key={item.id}
              text_id={TestIds.additional_title + index}
              image_id={TestIds.additional_icon + index}
              heading={item.name}
              info={Object.values(data)[index]}
            />
          );
        })}
      </View>
    </>
  );
};

const Style = StyleSheet.create({
  heading_style: {
    fontSize: hp(2.2),
    marginTop: hp(2),
    fontWeight: '600',
    color: Color.app_black,
    marginBottom: hp(2),
    marginLeft: wp(15),
  },
  info_box: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.white,
    width: wp(70),
    backgroundColor: 'red',
    alignSelf: 'center',
  },
});
export default AdditionalInformation;
