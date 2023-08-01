import { TestIds } from '../assets/TestIds';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import Color from '../assets/Colors';
import Images from '../assets/Images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { user_item } from '@interfaces/I_UserInfo';
import { translate } from '../assets/translations/translate';
import FatcaEditableOptions from './FatcaEditableOptions';
import {
  EditMultiNationalItem,
  LegalAgreementFieldItem,
  TinSsnItem,
} from '../typings/FatcaInfoParams';
import { BeneficialOwnerParams, NationalityParams } from '../typings/CreateFatcaInfoParams';
import { IconToggleSwitchOff, IconToggleSwitchOn } from '@assets/images';

type Props = {
  name?: string;
  onPressOption: (item: user_item) => void;
  item?: any;
  index?: number;
  isaNumber?: string;
  setVisaNumber: (text: string) => void;
  visaAuthority?: string;
  setVisaAuthority: (text: string) => void;
  visaNumber?: string;
  multiNationalData: Array<EditMultiNationalItem>;
  setMultiNationalData: (arr: Array<EditMultiNationalItem>) => void;
  nationList?: Array<NationalityParams>;
  setCitizenInfo: (haveTin: boolean, tin: string | null, reason: string | null) => void;
  onClick: () => void;
  beneficiaryItems?: Array<BeneficialOwnerParams>;
  removeItem: (index: number) => void;
  editItem: (index: number, item: BeneficialOwnerParams) => void;
  returnErr: (value: string | undefined, type: string) => void;
  aggreementItem: LegalAgreementFieldItem | undefined;
  onChangeAgreementInfo: (type: keyof LegalAgreementFieldItem, text: string) => void;
  optionToValidate?: number | null;
  citizenInfo: TinSsnItem | undefined;
  onChangeDateOnLegalAuth: (item: NationalityParams) => void;
};

const CheckListCompliance: React.FC<Props> = ({
  onPressOption,
  name,
  item,
  index,
  visaAuthority,
  visaNumber,
  setVisaNumber,
  setVisaAuthority,
  multiNationalData,
  setMultiNationalData,
  nationList,
  setCitizenInfo,
  onClick,
  beneficiaryItems,
  removeItem,
  editItem,
  returnErr,
  aggreementItem,
  onChangeAgreementInfo,
  optionToValidate,
  citizenInfo,
  onChangeDateOnLegalAuth,
}) => {
  return (
    <View style={Style.listViews}>
      <View style={Style.inner_view}>
        <Text testID={TestIds.name_list_item + item.id} style={Style.optionsName}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={Style.textView2}>
            {item?.isSelected ? translate('have') : translate('no')}
          </Text>
          <TouchableOpacity onPress={() => onPressOption(item)}>
            {item?.isSelected ? <IconToggleSwitchOn /> : <IconToggleSwitchOff />}
          </TouchableOpacity>
        </View>
      </View>
      {item.isSelected && (
        <FatcaEditableOptions
          optionToValidate={optionToValidate}
          setCitizenInfo={setCitizenInfo}
          citizenInfo={citizenInfo}
          multiNationalData={multiNationalData}
          setMultiNationalData={setMultiNationalData}
          index={index}
          visaAuthority={visaAuthority}
          visaNumber={visaNumber}
          setVisaNumber={setVisaNumber}
          setVisaAuthority={setVisaAuthority}
          nationList={nationList}
          onClick={onClick}
          beneficiaryItems={beneficiaryItems}
          removeItem={removeItem}
          editItem={editItem}
          returnErr={returnErr}
          aggreementItem={aggreementItem}
          onChangeAgreementInfo={onChangeAgreementInfo}
          onChangeDateOnLegalAuth={onChangeDateOnLegalAuth}
        />
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  listViews: {
    borderBottomWidth: 1,
    borderBottomColor: Color.light_grey,
    paddingHorizontal: hp(1.5),
    alignItems: 'center',
    paddingVertical: hp(1.3),
    overflow: 'hidden',
  },
  inner_view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textView2: {
    fontSize: hp(1.6),
    marginRight: 10,
    color: Color.app_black,
    textAlign: 'center',
  },

  optionsName: {
    color: Color.app_black,
    fontSize: wp(2),
  },

  imageCheckUncheck: {
    height: hp(2.4),
    width: wp(5),
    alignSelf: 'center',
  },
});
export default CheckListCompliance;
