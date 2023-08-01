export const accounts = [
  {
    accountNunber: 1234,
    currency: 'VND',
  },
  {
    accountNunber: 1244,
    currency: 'USD',
  },
];

export const defaultEcontract = '';

export const account_list = [
  {
    accountNumber: '598494855944',
    currency: 'VND',
  },
  {
    accountNumber: '598845795566',
    currency: 'USD',
  },
];

export const product_list = [
  {
    id: 1,
    code: '160403',
    label: '10016 - C/A NHAN VN.VND',
  },
  {
    id: 2,
    code: '160403',
    label: '10016 - C/A NHAN VN.USD',
  },
];

export const Debit_Card_List = [
  {
    card_type: 'Thẻ ghi nợ quốc tế Vietcombank Connect24',
    card_number: '587356••••5598',
  },
];

export const supplementalInformation = {
  transactionId: '0396072305250006',
  mobilePhone: '0978789798',
  email: 'k@gmail.com',
  currentAddress: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An, Phúc Xá,  Ba Đình, Hà Nội',
  provinceCode: '01',
  provinceName: 'Hà Nội',
  districtCode: '001',
  districtName: 'Ba Đình',
  communceCode: '00001',
  communceName: 'Phúc Xá',
  detailedAddress: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
  timeAtCurrentAddress: '05/2023',
  currentOccupation: 'Nhân viên văn phòng',
  jobTitle: 'Nhân viên',
  statusOfResidence: 'Resident',
  termOfResidenceInVietnam: '25/05/2023',
  taxCode: 'Hello',
  economicSectorCode: 'G454',
  economicSectorName: 'ban  bao duong va sua chua mo to  xe may',
  classLevelCode: 'D16101',
  classLevelName: 'Bao hiem tien gui VN',
  createdAt: 1684990015749,
  updatedAt: 1684990015749,
};
export const register_digibank = {
  response: {
    exists: true,
  },
};

export const E_Debit_Card_List = [
  {
    card_type: 'Thẻ ghi nợ quốc tế phi vật lý Vietcombank Visa Connect24 eCard - USD',
    card_number: '587356••••5598',
  },
  {
    card_type: 'Thẻ ghi nợ quốc tế Vietcombank Connect24 - VND',
    card_number: '587356••••5598',
  },
];
export interface Account_List {
  accountNumber: string;
  currency: string;
}

export interface E_Debit_Card_Type {
  brandName: string;
  currency: string;
  maskingCardNumber: string;
  productDescription: string;
  pdtNumber: string;
  physical: string;
  type: string;
}

[];

export interface Debit_Card_Requested {
  cardType: string;
  issueFeePayment: string;
  mainAccountCard: string;
  subAccount: string;
  feeAmount: string;
}

export interface pendingAccountResponse {
  accountCurrency: string;
  errorMessage: string;
  id: string;
  productCode: string;
  productName: string;
  status: string;
}

export interface Debit_Card_Type {
  brandName: string;
  currency: string;
  productDescription: string;
  maskingCardNumber: string;
  pdtNumber: string;
  physical: string;
  type: string;
}
[];

export const cardPickupData = [
  {
    id: 0,
    name: 'Nơi ở hiện tại',
    code: 'CURRENT_ADDRESS',
  },
  {
    id: 1,
    name: 'Đơn vị công tác',
    code: 'WORKING_ADDRESS',
  },
  {
    id: 2,
    name: 'Chi nhánh/Phòng giao dịch phát hành thẻ',
    code: 'BRANCH_OR_OFFICE_ISSUE_CARD',
  },
  {
    id: 3,
    name: 'Địa chỉ khác',
    code: 'OTHER_ADDRESS',
  },
];

export const cardPickup = [
  {
    id: 0,
    name: 'Tại điểm giao dịch',
    code: 'BRANCH_OR_OFFICE_ISSUE_CARD',
  },
];

export const Accademic_Level = [
  { name: 'Sau đại học' },
  { name: 'Đại học' },
  { name: 'Cao đẳng' },
  { name: 'THPT, trung cấp' },
  { name: 'Dưới THPT' },
];

export const Married_Status = [
  { name: 'Độc thân' },
  { name: 'Đã kết hôn' },
  { name: 'Ly hôn' },
  { name: 'Góa' },
];

export const Vietnam_City = [
  { label: 'Hanoi', value: 'VN-HN' },
  { label: 'Ho Chi Minh City', value: 'VN-HCM' },
  { label: 'Da Nang', value: 'VN-DN' },
  { label: 'Hai Phong', value: 'VN-HP' },
  { label: 'Can Tho', value: 'VN-CT' },
  { label: 'Nha Trang', value: 'VN-NT' },
  // Add more cities as needed
];

export const Product_Content = {
  products: {
    total: 13,
    content: [
      {
        id: 1,
        productCode: '10016',
        productName: '10016 - C/A CA NHAN VN.VND',
        currencyName: 'VND',
        defaultInterestPlan: '10002',
        active: true,
      },
      {
        id: 2,
        productCode: '11016',
        productName: '11016 - C/A CA NHAN VN.USD',
        currencyName: 'USD',
        defaultInterestPlan: '11002',
        active: true,
      },
      {
        id: 3,
        productCode: '12016',
        productName: '12016 - C/A CA NHAN VN.EUR',
        currencyName: 'EUR',
        defaultInterestPlan: '12002',
        active: true,
      },
      {
        id: 4,
        productCode: '13016',
        productName: '13016 - C/A CA NHAN VN.GBP',
        currencyName: 'GBP',
        defaultInterestPlan: '13002',
        active: true,
      },
      {
        id: 5,
        productCode: '14016',
        productName: '14016 - C/A CA NHAN VN.JPY',
        currencyName: 'JPY',
        defaultInterestPlan: '14002',
        active: true,
      },
      {
        id: 6,
        productCode: '15016',
        productName: '15016 - C/A CA NHAN VN.AUD',
        currencyName: 'AUD',
        defaultInterestPlan: '15002',
        active: true,
      },
      {
        id: 7,
        productCode: '16016',
        productName: '16016 - C/A CA NHAN VN.CAD',
        currencyName: 'CAD',
        defaultInterestPlan: '16002',
        active: true,
      },
      {
        id: 8,
        productCode: '17016',
        productName: '17016 - C/A CA NHAN VN.SGD',
        currencyName: 'SGD',
        defaultInterestPlan: '17003',
        active: true,
      },
      {
        id: 9,
        productCode: '18016',
        productName: '18016 - C/A CA NHAN VN.HKD',
        currencyName: 'HKD',
        defaultInterestPlan: '18002',
        active: true,
      },
      {
        id: 10,
        productCode: '19127',
        productName: '19127 - C/A CA NHAN VN.CNY',
        currencyName: 'CNY',
        defaultInterestPlan: '19028',
        active: true,
      },
      {
        id: 11,
        productCode: '19137',
        productName: '19137 - C/A CA NHAN VN.NOK',
        currencyName: 'NOK',
        defaultInterestPlan: '19046',
        active: true,
      },
      {
        id: 12,
        productCode: '19140',
        productName: '19140 - C/A CA NHAN VN.SEK',
        currencyName: 'SEK',
        defaultInterestPlan: '19050',
        active: true,
      },
      {
        id: 13,
        productCode: '19141',
        productName: '19141 - C/A CA NHAN VN.THB',
        currencyName: 'THB',
        defaultInterestPlan: '19052',
        active: true,
      },
    ],
    pageable: 'INSTANCE',
  },
};
