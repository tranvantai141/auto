export interface ISaveEbanking {
  transactionId: string,
  registerDigibank: boolean,
  digibankPhone: string,
  digibankEmail: string,
  registerSmsBanking: boolean,
  registerPhoneBanking: boolean,
  existingAccountRequested:boolean,
  accountNumberRequested:string
}