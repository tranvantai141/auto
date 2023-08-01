export interface FatcaInfoResponse {
  transactionId: string;
  customerIsStateless: boolean;
  customerIsMultiNational: boolean;
  customerIsUSCitizenOrResident: boolean;
  customerHasBeneficialOwners: boolean;
  customerParticipatesInLegalAgreements: boolean;
  paymentPurpose: boolean;
  savingPurpose: boolean;
  lendingPurpose: boolean;
  domesticRemittancePurpose: boolean;
  overseasRemittancePurpose: boolean;
  otherPurpose: boolean;
  otherSpecification: string;
  createdAt: number | undefined;
  updatedAt: number | undefined;
}

export const sampleResponse = {
  transactionId: '50022302060002',
  customerIsStateless: true,
  customerIsMultiNational: true,
  customerIsUSCitizenOrResident: true,
  customerHasBeneficialOwners: false,
  customerParticipatesInLegalAgreements: true,
  paymentPurpose: true,
  savingPurpose: true,
  lendingPurpose: true,
  domesticRemittancePurpose: true,
  overseasRemittancePurpose: true,
  otherPurpose: true,
  otherSpecification: 'otherSpecification',
  createdAt: 1675690168985,
  updatedAt: 1675690168985,
};

export interface NationalityParams {
  nationName?: string;
  nationCode: string;
  registeredAddressIn: string;
}

export interface BeneficialOwnerParams {
  nationName?: string;
  fullName: string;
  dateOfBirth: string;
  nationCode: string;
  address: string;
  job: string;
  dateOfIssue: string;
  placeOfIssue: string;
  phone: string;
  idOrPP: string;
  beneficial_nation: NationalityParams;
}

export interface CreateFatcaInfoParam {
  transactionId: string;
  customerIsStateless: boolean;
  visaNumber: string | null;
  immigrationVisaAuthority: string | null;
  customerIsMultiNational: boolean;
  nationalities: Array<NationalityParams>;
  customerIsUSCitizenOrResident: boolean;
  hasTINOrSSN: boolean | null;
  usTINOrSSN: string | null;
  reasonOfNotHavingTINOrSSN: string | null;
  customerHasBeneficialOwners: boolean;
  beneficialOwners: Array<BeneficialOwnerParams>;
  customerParticipatesInLegalAgreements: boolean;
  nameOfOrganizationOrIndividual: string | null;
  authorizationDocumentDate: string | null;
  contentsOfEntrustment: string | null;
  nationCode: string | null;
  identificationNumber: string | null;
  beneficiariesInformation: string | null;
  paymentPurpose: boolean;
  savingPurpose: boolean;
  lendingPurpose: boolean;
  domesticRemittancePurpose: boolean;
  overseasRemittancePurpose: boolean;
  otherPurpose: boolean;
  otherSpecification: string | null;
  nationName?: string | null;
}

export interface UpdateFatcaInfoParam {
  transactionId: string;
  customerIsStateless: boolean;
  visaNumber: string | null;
  immigrationVisaAuthority: string | null;
  customerIsMultiNational: boolean;
  nationalities: Array<NationalityParams>;
  customerIsUSCitizenOrResident: boolean;
  hasTINOrSSN: boolean | null;
  usTINOrSSN: string | null;
  reasonOfNotHavingTINOrSSN: string | null;
  customerHasBeneficialOwners: boolean;
  beneficialOwners: Array<UpdateBeneficialOwnerParams>;
  customerParticipatesInLegalAgreements: boolean;
  nameOfOrganizationOrIndividual: string | null;
  authorizationDocumentDate: string | null;
  contentsOfEntrustment: string | null;
  nationCode: string | null;
  identificationNumber: string | null;
  beneficiariesInformation: string | null;
  paymentPurpose: boolean;
  savingPurpose: boolean;
  lendingPurpose: boolean;
  domesticRemittancePurpose: boolean;
  overseasRemittancePurpose: boolean;
  otherPurpose: boolean;
  otherSpecification: string | null;
  nationName?: string | null;
}

export interface UpdateBeneficialOwnerParams {
  nationName?: string;
  fullName: string;
  dateOfBirth: string;
  nationCode: string;
  address: string;
  job: string;
  dateOfIssue: string;
  placeOfIssue: string;
  phone: string;
  idOrPP: string;
}
