import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import InfoTextLineView from '../../../common/components/onboarding/InfoTextLineView';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { IRegistraionHeadings, IRegistraionInfoForm } from '@interfaces/I_Registration_info';

type Props = {
  data: IRegistraionInfoForm;
  heading_test_id: string;
  test_id?: string;
};

const RegistrationInfo = (props: Props) => {
  const { data } = props;
  return (
    <View>
      <Text testID={props?.heading_test_id} style={Style.heading_style}>
        {translate('registration_info')}
      </Text>
      <View testID={props?.test_id} style={Style.info_box}>
        {IRegistraionHeadings.map((item, index) => {
          return (
            <InfoTextLineView
              key={item.id}
              text_id={TestIds?.registration_info + index}
              image_id={TestIds?.registration_info + index}
              heading={item.name}
              info={Object.values(data)[index]}
            />
          );
        })}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  heading_style: {
    fontSize: hp(2.2),
    marginTop: hp(2),
    fontWeight: '600',
    color: Color.app_black,
    marginBottom: hp(2),
  },
  info_box: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.white,
    width: wp(60),
    alignSelf: 'center',
  },
});
export default RegistrationInfo;
