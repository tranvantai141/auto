import React from 'react';
import StatelessPerson from './StatelessPerson';
import MultiNationalityPerson from './MultiNationalityPerson';
import {
  EditMultiNationalItem,
  LegalAgreementFieldItem,
  TinSsnItem,
} from '../typings/FatcaInfoParams';
import CitizenOfUSPerson from './CitizenOfUSPerson';
import BeneficialOwner from './BeneficialOwner';
import LegalAgreement from './LegalAgreement';
import { BeneficialOwnerParams, NationalityParams } from '../typings/CreateFatcaInfoParams';

type Props = {
  index?: number;
  visaNumber?: string;
  setVisaNumber: (text: string) => void;
  visaAuthority?: string;
  setVisaAuthority: (text: string) => void;
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
  legalTextField?: number
};

const FatcaEditableOptions = (props: Props) => {
  const {
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
    legalTextField
  } = props;
  return index === 0 ? (
    <StatelessPerson
      visaAuthority={visaAuthority}
      visaNumber={visaNumber}
      setVisaNumber={setVisaNumber}
      setVisaAuthority={setVisaAuthority}
      returnErr={(optionToValidate === 0 && returnErr) || undefined}
    />
  ) : index === 1 ? (
    <MultiNationalityPerson
      nationList={nationList}
      multiNationalData={multiNationalData}
      setMultiNationalData={setMultiNationalData}
      validate={optionToValidate === 1 ? true : false}
    />
  ) : index === 2 ? (
    <CitizenOfUSPerson
      setCitizenInfo={setCitizenInfo}
      citizenInfo={citizenInfo}
      validate={optionToValidate === 2 ? true : false}
    />
  ) : index === 3 ? (
    <BeneficialOwner
      removeItem={removeItem}
      beneficiaryItems={beneficiaryItems}
      onClick={onClick}
      editItem={editItem}
      validate={optionToValidate === 3 ? true : false}
    />
  ) : index === 4 ? (
    <LegalAgreement
      aggreementItem={aggreementItem}
      onChangeAgreementInfo={onChangeAgreementInfo}
      returnErr={(optionToValidate === 4 && returnErr) || undefined}
      nationList={nationList}
      onChangeDate={onChangeDateOnLegalAuth}
      legalTextField={legalTextField}
    />
  ) : null;
};

export default FatcaEditableOptions;
