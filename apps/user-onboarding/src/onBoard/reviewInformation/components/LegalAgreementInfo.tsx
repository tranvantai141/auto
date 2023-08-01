import { CreateFatcaInfoParam } from '@screens/onBoardingProcess/OnBoardingStep4/typings/CreateFatcaInfoParams';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import InfoTextLine from './InfoTextLine';

type Props = {
  data?: CreateFatcaInfoParam;
};

const LegalAgreementInfo = (props: Props) => {
  const { data } = props;
  return (
    <View style={Style.info_box}>
      <InfoTextLine
        heading={translate('name_of_orgainization')}
        info={data?.nameOfOrganizationOrIndividual || ''}
      />
      <InfoTextLine
        heading={translate('date_of_authorization')}
        info={data?.authorizationDocumentDate || ''}
      />
      <InfoTextLine
        heading={translate('content_of_authorization')}
        info={data?.contentsOfEntrustment || ''}
      />
      <InfoTextLine heading={translate('country_of_orgainization')} info={data?.nationName || ''} />
      <InfoTextLine
        heading={translate('id_num_of_authorization')}
        info={data?.identificationNumber || ''}
      />
      <InfoTextLine
        heading={translate('information_of_individuals')}
        info={data?.beneficiariesInformation || ''}
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
export default LegalAgreementInfo;
