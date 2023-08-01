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
  legalTextField?: number
};

const LegalAgreement = (props: Props) => {
  const { nationList, returnErr, aggreementItem, onChangeAgreementInfo, onChangeDate, legalTextField } = props;

  const formatTheDate = (numericValue: string) => {
    // convert the numericValue to a formatted date string
    let day = numericValue.slice(0, 2);
    let month = numericValue.slice(2, 4);
    const year = numericValue.slice(4, 8);
    // add spaces to separate day, month, and year
    if (numericValue.length > 4) {
      day = day + '/';
      month = month + '/';
    } else if (numericValue.length > 2) {
      day = day + '/';
      month = ' ' + month;
    }
    return day + month + year;
  };

  const handleDateRangeChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length >= 0) {
      const formattedDate = formatTheDate(numericValue);
      onChangeAgreementInfo('date_of_authorization', formattedDate);
    }
  };

  return (
    <View style={Style.main_view}>
      <View style={Style.input_view}>
        <InputTextBox
          value={aggreementItem?.name_of_orgainization}
          width={wp(41)}
          onChangeText={(text) => onChangeAgreementInfo('name_of_orgainization', text)}
          heading={translate('name_of_orgainization')}
          viewStyle={{ width: wp(41), marginRight: wp(2) }}
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
            returnErr && (legalTextField == 1 || legalTextField == 2 )&&
            returnErr(aggreementItem?.date_of_authorization, translate('date_of_authorization'))
          }
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 100))}
          edit
          handleDateChange={handleDateRangeChange}
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
            returnErr && legalTextField != 1 &&
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
            returnErr && legalTextField != 1 &&
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
        />
        <InputTextBox
          width={wp(41)}
          onChangeText={(text) => onChangeAgreementInfo('information_of_individuals', text)}
          heading={translate('information_of_individuals')}
          viewStyle={{ width: wp(41) }}
          keyboardType="phone-pad"
          value={aggreementItem?.information_of_individuals}
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
