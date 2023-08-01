import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CheckListCompliance from './ChecklistCompliance';
import { user_item } from '@interfaces/I_UserInfo';
import {
  EditMultiNationalItem,
  LegalAgreementFieldItem,
  TinSsnItem,
} from '../typings/FatcaInfoParams';
import { BeneficialOwnerParams, NationalityParams } from '../typings/CreateFatcaInfoParams';
import Colors from '../assets/Colors';

type Props = {
  onPressOption: (item: user_item) => void;
  data: Array<user_item>;
  setVisaNumber: (text: string) => void;
  visaAuthority?: string;
  setVisaAuthority: (text: string) => void;
  visaNumber?: string;
  multiNationalData: Array<EditMultiNationalItem>;
  setMultiNationalData: (arr: Array<EditMultiNationalItem>) => void;
  nationList?: Array<NationalityParams> | undefined;
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
  legalTextField?: number
};

const InformationList: React.FC<Props> = ({
  onPressOption,
  data,
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
  legalTextField
}) => {
  const renderItem = (item: user_item, index: number) => {
    return (
      <CheckListCompliance
        multiNationalData={multiNationalData}
        setMultiNationalData={setMultiNationalData}
        item={item}
        citizenInfo={citizenInfo}
        index={index}
        name={item.name}
        onPressOption={onPressOption}
        visaAuthority={visaAuthority}
        visaNumber={visaNumber}
        setVisaNumber={setVisaNumber}
        setVisaAuthority={setVisaAuthority}
        nationList={nationList}
        setCitizenInfo={setCitizenInfo}
        onClick={onClick}
        beneficiaryItems={beneficiaryItems}
        removeItem={removeItem}
        editItem={editItem}
        returnErr={returnErr}
        aggreementItem={aggreementItem}
        onChangeAgreementInfo={onChangeAgreementInfo}
        optionToValidate={optionToValidate}
        onChangeDateOnLegalAuth={onChangeDateOnLegalAuth}
        legalTextField={legalTextField}
      />
    );
  };

  return (
    <View style={Style.outer_view}>
      <FlatList
        data={data}
        extraData={data}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </View>
  );
};

export default InformationList;

const Style = StyleSheet.create({
  outer_view: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderColor: Colors.border_color,
  },
});
