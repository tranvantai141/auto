import { useCallback, useState } from 'react';
import { delay } from 'src/common/utils/delay';
import axiosTokenInstance from 'src/service/network/axios';
import { useMoCResult } from '@screens/customerInfo/hooks/useMoCResult';
import { search_customer } from '@screens/customerInformation/api/endpoints';
import { compareString } from '../../../common/utils/compareString';
import { IOpenAccount } from '@interfaces/I_OpenAccount';
import {
  checkRegisterDigi,
  openRequestAccount,
  prepareProductService,
  registerEBanking, saveDelivery,
  updateAdditional,
} from '@screens/productServices/api/endpoints';
import { AxiosError } from 'axios';
import {
  Debit_Card_Requested,
  IRegisterEBankning,
  ResultData,
  ResultMessageData,
} from '@screens/productServices/typings';
import { ISaveAdditionalInfo } from '@interfaces/I_SaveAddionalInfo';
import { IDeliveryAddress } from '@interfaces/I_Delivery_address';
import { translate } from '@screens/productServices/assets/translations/translate';
import { useConfirmModal } from '../../../hooks/useConfirmModal';



function usePhoneRegister() {

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [messError, setMessErr] = useState('');
  const { showConfirmModal, showAlertModal } = useConfirmModal();

  const PHONE_REGEX = new RegExp(/(03|05|07|08|09)+([0-9]{8})\b/);
  const handleValidate = (phoneNumber: string) => PHONE_REGEX.test(phoneNumber);

  function formatError(error: AxiosError): ResultMessageData {
    return {
      message: error?.response?.data || error?.message || 'Unknown error',
      errCode: error?.response?.status || 500,
      errData: undefined,

    };
  }


  const processPhoneRegister = useCallback(
    async ( phoneDigi: string ) => {

      try {
        setIsLoading(true);
        setIsSuccess(false);

        let resultMessageData : ResultMessageData = {
          errData : undefined,
          message : '',
          errCode : 1,
        } ;

        if (phoneDigi?.trim().length > 0 && !phoneDigi?.trim().startsWith('0')) {
           resultMessageData.message = translate('validation_phone_start') ;
           setMessErr(translate('validation_phone_start'));
          setIsLoading(false);

          return resultMessageData;
        } else if (phoneDigi?.trim().length > 0 && phoneDigi?.trim().length < 10) {
          resultMessageData.message = translate('validation_phone_length') ;
          setMessErr(translate('validation_phone_length'));
          setIsLoading(false);

          return resultMessageData;
        }
        // else if (!handleValidate(phoneDigi?.trim())) {
        //   resultMessageData.message = translate('validation_phone_validate') ;
        //   setMessErr(translate('validation_phone_validate'));
        //   setIsLoading(false);
        //
        //   return resultMessageData;
        // }
        else {
          resultMessageData.message = '' ;
        }

        const phoneRegisterResponse = await checkRegisterDigi(phoneDigi);

        if (!phoneRegisterResponse?.valid){
          resultMessageData.message =  'Số điện thoại đã được đăng ký dịch vụ ngân hàng điện tử. Vui lòng lựa chọn số điện thoại khác'
          setMessErr('Số điện thoại đã được đăng ký dịch vụ ngân hàng điện tử. Vui lòng lựa chọn số điện thoại khác');
          setIsLoading(false);
          return resultMessageData;
        }

        resultMessageData.errCode = 0;
        setMessErr('');
        setIsLoading(false);
        setIsSuccess(true);

        return resultMessageData;


      } catch (Exception : any) {

        setIsLoading(false);
        setIsSuccess(false);
        setMessErr('Số điện thoại đã được đăng ký dịch vụ ngân hàng điện tử. Vui lòng lựa chọn số điện thoại khác');

        let resultMessageData : ResultMessageData = {
          errData : undefined,
          message : 'Số điện thoại đã được đăng ký dịch vụ ngân hàng điện tử. Vui lòng lựa chọn số điện thoại khác',
          errCode : 1,
        } ;

        return resultMessageData;
      }

    },
    [isLoading , isSuccess , messError]
  );

  return [isSuccess ,isLoading , messError, processPhoneRegister] as const;
}

export default usePhoneRegister;
