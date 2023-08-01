export const createProductServiceState = {
  account: [
    {
      isSelected: true,
      accountID: 12345678,
      product: {
        id: 101,
        productCode: '1234',
        productName: 'Product name 1',
        currencyName: 'USD',
        defaultInterestPlan: 'string',
        active: true
      },
      openAccountRequestId: 'string',
      accountType: 'string',
    },
    {
      isSelected: true,
      accountID: 87654321,
      product: {
        id: 102,
        productCode: '4567',
        productName: 'product name 2',
        currencyName: 'VND',
        defaultInterestPlan: 'string',
        active: true
      },
      openAccountRequestId: 'string',
      accountType: 'string',

    },
  ],
  ebanking: {
    registerDigibank: true,
    digibankPhone: '035678901',
    digibankEmail: 'kanika.m@bluebik.com',
    registerSmsBanking: false,
    registerPhoneBanking: false,
    accountSelected: '5984984958399 - VND'
  },
  debitECard: [
    {
      debitECardID: 12356,
      name: 'Thẻ ghi nợ quốc tế phi vật lý Vietcombank Visa Connect24 eCard',
      productCode: '000',
      BINCode: '111',
      issueFeePayment: 'AUTO_DEBIT',
      subAccount: true,
      feeAmount: '10 USD',
      email: 'kanika.m@bluebik.com',
      issueType: 'string',
      feesReceivable: 'string',
      isRegisterOtpEmail: true,
      cardTypeSelected:
      {
        _index: 345,
        active: true,
        branchName: 'Vietnamese',
        cardBin: 'string',
        cardType: 'Debit',
        currencyName: 'VND',
        id: 1,
        productDescription: 'description',
        productNumber: '089',
        virtualCard: 'string',
      }
    }
  ],
  debitCard: [
    {
      debitCardID: 3,
      name: 'Thẻ ghi nợ nội địa Vietcombank Connect24',
      productCode: '111',
      BINCode: '010',
      issueFeePayment: 'AUTO_DEBIT',
      subAccount: true,
      feeAmount: '10 VND',
      email: 'kanika.m@bluebik.com',
      issueType: 'AUTO_DEBIT',
      affiliateMembershipCode: '333',
      feesReceivable: 'yes',
      isRegisterOtpEmail: true,
      isSubCard: true,
      cardTypeSelected: 'DEBIT',
      mainAccountCardNumber: '465465465 - VND'
    }
  ]
}

export const additionalCardInformation = {
  data: {
    transactionId: '123456',
    phoneCurrentResidence: '037676768',
    universityEdu: 'Digibank vietnemese',
    martialStatus: 'unmarried',
    fullName: 'Kanika',
    workPlace: 'Mumbai',
    Address: 'Mumbai vietnemese',
    workPhone: '045789008'
  }
  
}



