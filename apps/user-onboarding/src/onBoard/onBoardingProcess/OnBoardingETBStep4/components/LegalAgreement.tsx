import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import { LegalAgreementFieldItem } from '../typings/FatcaInfoParams';
import InputTextBox from './InputTextBox';
import { NationalityParams } from '../typings/CreateFatcaInfoParams';

type Props = {
  nationList?: Array<NationalityParams>;
  returnErr?: (value: string | undefined, type: string) => void;
  aggreementItem: LegalAgreementFieldItem | undefined;
  onChangeAgreementInfo: (type: keyof LegalAgreementFieldItem, text: string) => void;
  onChangeDate: (item: NationalityParams) => void;
};

const LegalAgreement = (props: Props) => {
  const { nationList, returnErr, aggreementItem, onChangeAgreementInfo, onChangeDate } = props;

  return (
    <View style={Style.main_view}>
      <View style={Style.input_view}>
        <InputTextBox
          value={aggreementItem?.name_of_orgainization}
          width={wp(41)}
          onChangeText={(text) => onChangeAgreementInfo('name_of_orgainization', text)}
          heading={translate('name_of_orgainization')}
          viewStyle={{ width: wp(41), marginRight: wp(2) }}
          required
        />
        <InputTextBox
          width={wp(41)}
          calendar
          value={aggreementItem?.date_of_authorization}
          onChangeText={(text) => onChangeAgreementInfo('date_of_authorization', text)}
          heading={translate('date_of_authorization')}
          viewStyle={{ width: wp(41) }}
          keyboardType="phone-pad"
          error_msg={
            returnErr &&
            returnErr(aggreementItem?.date_of_authorization, translate('date_of_authorization'))
          }
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 100))}
          required
        />
      </View>
      <View style={Style.input_view}>
        <InputTextBox
          value={aggreementItem?.content_of_authorization}
          width={wp(41)}
          onChangeText={(text) => onChangeAgreementInfo('content_of_authorization', text)}
          heading={translate('content_of_authorization')}
          viewStyle={{ width: wp(41), marginRight: wp(2) }}
          error_msg={
            returnErr &&
            returnErr(
              aggreementItem?.content_of_authorization,
              translate('content_of_authorization')
            )
          }
          required
        />
        <InputTextBox
          dropdown
          nationList={nationList}
          dropdownWidth={wp(41)}
          width={wp(41)}
          onSelectNation={(item: NationalityParams) => {
            onChangeDate(item);
          }}
          value={
            aggreementItem?.country_nationality?.registeredAddressIn ||
            aggreementItem?.country_nationality?.nationCode
          }
          heading={translate('country_of_orgainization')}
          viewStyle={{ width: wp(41), padding: 0 }}
          keyboardType="phone-pad"
          error_msg={
            returnErr &&
            returnErr(
              aggreementItem?.country_nationality?.registeredAddressIn ||
                aggreementItem?.country_nationality?.nationName,
              translate('country_of_orgainization')
            )
          }
          required
        />
      </View>
      <View style={Style.input_view}>
        <InputTextBox
          value={aggreementItem?.id_num_of_authorization}
          width={wp(41)}
          onChangeText={(text) => onChangeAgreementInfo('id_num_of_authorization', text)}
          heading={translate('id_num_of_authorization')}
          viewStyle={{ width: wp(41), marginRight: wp(2) }}
          required
        />
        <InputTextBox
          width={wp(41)}
          onChangeText={(text) => onChangeAgreementInfo('information_of_individuals', text)}
          heading={translate('information_of_individuals')}
          viewStyle={{ width: wp(41) }}
          keyboardType="phone-pad"
          value={aggreementItem?.information_of_individuals}
          required
        />
      </View>
    </View>
  );
};

export default LegalAgreement;
const Style = StyleSheet.create({
  main_view: {
    backgroundColor: Color.light_grey,
    width: '100%',
    marginVertical: hp(1),
    padding: hp(1.5),
    justifyContent: 'space-between',
  },
  input_view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
});
