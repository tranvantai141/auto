import { GetTransactionDetailIDCardInfoDTO } from '../types';
import { GET_TRANSACTION_DETAIL_ID_CARD_INFO } from './endpoints';
import axiosTokenInstance from 'src/service/network/axios';

export async function getTransactionDetailIdCardInfo(
  transactionId: string
): Promise<GetTransactionDetailIDCardInfoDTO> {
  const response = await axiosTokenInstance.post<GetTransactionDetailIDCardInfoDTO>(
    GET_TRANSACTION_DETAIL_ID_CARD_INFO,
    {
      transactionId,
    }
  );
  return response.data;

  return {
    code: 'SUCCESS',
    message: 'Success',
    updateIdCardInfoStatus: 'NOT_REGISTERED',
    updateIdCardInfoCode: '200',
    updateIdCardInfoMessage: 'Success',
    success: true,
    idCardInfoList: [
      {
        fullName: 'HA NGOC TU',
        dob: '1980/01/01',
        gender: 'Nam',
        ddnd: 'Sẹo chấm ở đuôi lông mày phải',
        idNumber: '14379839',
        oldIdNumber: '14379839',
        otherIdNumber: '14379839',
        validDate: '1980/01/01',
        expiredDate: '1980/01/01',
        issuePlace: '002',
        nationality: 'Việt Nam',
        hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
        resident: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
        currentAddress: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
        status: 'NOT_REGISTERED',
        code: 'SUCCESS',
        message: 'Success',
        type: 'UPDATING',
      },
      {
        fullName: 'HA NGOC TU',
        dob: '1980/01/01',
        gender: 'Nam',
        ddnd: 'Sẹo chấm ở đuôi lông mày phải',
        idNumber: '14379839',
        oldIdNumber: '14379839',
        otherIdNumber: '14379839',
        validDate: '1980/01/01',
        expiredDate: '1980/01/01',
        issuePlace: '002',
        nationality: 'Việt Nam',
        hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
        resident: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
        currentAddress: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
        status: 'SUCCESS',
        code: 'SUCCESS',
        message: 'Success',
        type: 'EXISTING',
      },
      {
        fullName: 'HA NGOC TU',
        dob: '1980/01/01',
        gender: 'Nam',
        ddnd: 'Sẹo chấm ở đuôi lông mày phải',
        idNumber: '14379839',
        oldIdNumber: '14379839',
        otherIdNumber: '14379839',
        validDate: '1980/01/01',
        expiredDate: '1980/01/01',
        issuePlace: '002',
        nationality: 'Việt Nam',
        hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
        resident: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
        currentAddress: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
        status: 'SUCCESS',
        code: 'SUCCESS',
        message: 'Success',
        type: 'EXISTING',
      },
    ],
  };
}
