export interface CustomerInfoParams {
  transactionId: string;
}

export interface CustomerInfoResultResponse{
  "code":string,
  "message":string,
  "success": boolean,
  "transactionId": string,
  "updateIdInfo": boolean,
  "updateCurrentAddress": boolean,
  "updateContact": boolean,
  "updateJobDetail": boolean
}


export interface UpdateSignFlagParams {
  transactionId: string;
  updateCustomerWetSignature: boolean
}