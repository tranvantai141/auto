import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import InfoTextLineView from '../../../../common/components/onboarding/InfoTextLineView';
import { IPersonalHeadings, IPersonalInfoForm } from '@interfaces/I_Personal_information';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';

type Props = {
  data: IPersonalInfoForm;
  heading_test_id: string;
  test_id?: string;
};

const PersonalDocumentInformation = (props: Props) => {
  const { data } = props;
  return (
    <>
      <Text testID={props?.heading_test_id} style={Style.heading_style}>
        {translate('personal_document_information')}
      </Text>
      <View testID={props?.test_id} style={Style.info_box}>
        {IPersonalHeadings.map((item, index) => {
          return (
            <InfoTextLineView
              key={item.id}
              text_id={TestIds?.personal_info_title + index}
              image_id={TestIds?.personal_info_icon + index}
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
export default PersonalDocumentInformation;
