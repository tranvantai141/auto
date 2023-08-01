import { NationalityParams } from '@screens/onBoardingProcess/OnBoardingStep4/typings/CreateFatcaInfoParams';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import InfoTextLine from './InfoTextLine';

type Props = {
  data?: Array<NationalityParams>;
};

const FatcaNationalityInfo = (props: Props) => {
  const { data } = props;
  return (
    <View style={Style.info_box}>
      {data?.map((res: NationalityParams, index) => {
        return (
          <View key={index}>
            <InfoTextLine heading={translate('nationality')} info={res?.nationName} />
            <InfoTextLine
              heading={translate('registered_add_of_residence')}
              info={res?.registeredAddressIn || res?.nationName}
            />
          </View>
        );
      })}
    </View>
  );
};

const Style = StyleSheet.create({
  info_box: {
    backgroundColor: Colors.light_grey,
    width: '100%',
    alignSelf: 'center',
  },
});
export default FatcaNationalityInfo;
