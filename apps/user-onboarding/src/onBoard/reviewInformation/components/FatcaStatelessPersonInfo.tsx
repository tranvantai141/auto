import { CreateFatcaInfoParam } from '@screens/onBoardingProcess/OnBoardingStep4/typings/CreateFatcaInfoParams';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import InfoTextLine from './InfoTextLine';

type Props = {
  fatcaInfo?: CreateFatcaInfoParam;
};

const FatcaStatelessPersonInfo = (props: Props) => {
  const { fatcaInfo } = props;
  return (
    <View style={Style.info_box}>
      <InfoTextLine heading={translate('visa_number')} info={fatcaInfo?.visaNumber || ''} />
      <InfoTextLine
        heading={translate('entry_visa_authority')}
        hideBorder
        info={props?.fatcaInfo?.immigrationVisaAuthority || ''}
      />
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
export default FatcaStatelessPersonInfo;
