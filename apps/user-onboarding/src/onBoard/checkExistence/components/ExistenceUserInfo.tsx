import Color from '../assests/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import InfoTextLineView from '../../../common/components/onboarding/InfoTextLineView';
import { IExistenceInfoHeadings, IExistenceUserInfoForm } from '@interfaces/I_Existence_user';
import { translate } from '../../../common/utils/translations/translate';

type Props = {
  data: IExistenceUserInfoForm;
  test_id?: string;
};

const ExistenceUserInfo = (props: Props) => {
  const { data } = props;
  return (
    <>
      <View testID={props?.test_id} style={Style.info_box}>
        {IExistenceInfoHeadings.map((item, index) => {
          return <InfoTextLineView key={item.id} heading={translate(item.value)} info={Object.values(data)[index]} />;
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
    color: Color.black,
    marginBottom: hp(2),
    marginLeft: wp(15),
  },
  info_box: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.white,
    width: wp(70),
    alignSelf: 'center',
  },
});
export default ExistenceUserInfo;
