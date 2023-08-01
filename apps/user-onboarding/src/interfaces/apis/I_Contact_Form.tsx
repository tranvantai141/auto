export interface ISupplementaryForm {
  transactionId: string;
  mobilePhone: string;
  registrationPriority: string;
  landlinePhone: string | null;
  email: string | null;
  currentAddress: string;
  provinceCode: string;
  districtCode: string;
  communceCode: string;
  detailedAddress: string;
  timeAtCurrentAddress: string | null;
  currentOccupation: string | null;
  otherOccupationInfo: string | null;
  jobTitle: string | null;
  otherJobTitleInfo: string | null;
  nationCode: string;
  foreignAddress: string | null;
  statusOfResidence: string;
  termOfResidenceInVietnam: string | null;
  taxCode: string | null;
  economicSectorCode: string;
  classLevelCode: string;
}

export interface ISupplementaryFormError {
  transactionId: string;
  mobilePhone: string;
  registrationPriority: string;
  landlinePhone: string;
  email: string;
  currentAddress: string;
  provinceCode: string;
  districtCode: string;
  communceCode: string;
  detailedAddress: string;
  timeAtCurrentAddress: string;
  currentOccupation: string;
  otherOccupationInfo: string;
  jobTitle: string;
  otherJobTitleInfo: string;
  nationCode: string;
  foreignAddress: string;
  statusOfResidence: string;
  termOfResidenceInVietnam: string;
  taxCode: string;
  economicSectorCode: string;
  classLevelCode: string;
}

export interface ISupplementaryFormValidations {
  transactionId: string;
  mobilePhone: string;
  registrationPriority: string;
  landlinePhone: string;
  email: string;
  currentAddress: string;
  provinceCode: string;
  districtCode: string;
  communceCode: string;
  detailedAddress: string;
  timeAtCurrentAddress: string;
  currentOccupation: string;
  jobTitle: string;
  nationCode: string;
  foreignAddress: string;
  statusOfResidence: string;
  termOfResidenceInVietnam: string;
  taxCode: string;
  economicSectorCode: string;
  classLevelCode: string;
}

export interface ICodes {
  code?: string;
  name?: string;
  provinceCode?: string;
  districtCode?: string;
}
