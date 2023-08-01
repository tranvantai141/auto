import axiosTokenInstance from 'src/service/network/axios';
import { GET_TRANSACTION_DETAIL_COMPLIANCE_INFO } from './endpoints';

export interface ComplianceInfoList {
  name?: string;
  type?: string;
  value?: string;
  data?: {
    visaNumber?: string;
    authorityName?: string;
  };
}
export interface ComplianceInfoInterface {
  complianceRequested?: boolean;
  complianceInfo?: Array<ComplianceInfoList>;
}

export async function getEtbTransactionDetailComplianceInfo(transactionId: string): Promise<any> {
  try {
    const response = await axiosTokenInstance.post<ComplianceInfoInterface>(
      GET_TRANSACTION_DETAIL_COMPLIANCE_INFO,
      {
        transactionId,
      }
    );
    return response.data;
  } catch (error) {
    //
  }
}
