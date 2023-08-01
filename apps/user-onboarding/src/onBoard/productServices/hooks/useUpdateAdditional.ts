import { ISaveAdditionalInfo } from '@interfaces/I_SaveAddionalInfo';
import { saveAdditional, updateAdditional } from '@screens/productServices/api/endpoints';
import { translate } from '@screens/productServices/assets/translations/translate';
import { ResultData, ResultMessageData } from '@screens/productServices/typings';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useConfirmModal } from '../../../hooks/useConfirmModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from 'src/redux/hooks';
import { getCustomerInfoFlagReq } from '@screens/etbShowWetSignature/redux/actions/GetCustomerInfoFlagReq';

function useUpdateAdditional() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { showAlertModal } = useConfirmModal();

  function formatError(error: AxiosError): ResultMessageData {
    return {
      message: error?.response?.data || error?.message || 'Unknown error',
      errCode: error?.response?.status || 500,
      errData: undefined,
    };
  }

  const processUpdateAdditional = useCallback(
    async (additionalInfo: ISaveAdditionalInfo , deliveryMedthod: string, transactionId : string) => {
      setIsLoading(true);
      let resultMessageData: ResultMessageData;
      const resultData: ResultData = {
        proviceErr: '',
        detailedAddressErr: '',
        communceErr: '',
        districtErr: '',
        phoneErr: '',
      };

      let isValid = true;

      try {
        if(deliveryMedthod === 'WORKING_ADDRESS' || additionalInfo?.provinceCode?.trim().length || additionalInfo?.detailedAddress?.trim().length ) {

          if (!additionalInfo?.communceCode || additionalInfo?.communceCode?.trim() === '') {
            resultData.communceErr = translate('blank_data') + translate('communce');
            isValid = false;
          } else resultData.communceErr = '';

          if (!additionalInfo?.provinceCode || additionalInfo?.provinceCode?.trim() === '') {
            resultData.proviceErr = translate('blank_data') + translate('district');
            isValid = false;
          } else resultData.proviceErr = '';

          if (!additionalInfo?.districtCode || additionalInfo?.districtCode?.trim() === '') {
            resultData.districtErr = translate('blank_data') + translate('city');
            isValid = false;
          } else resultData.districtErr = '';

          if (!additionalInfo?.detailedAddress || additionalInfo?.detailedAddress?.trim() === '') {
            resultData.detailedAddressErr = translate('blank_data') + translate('detailed_address');
            isValid = false;
          } else resultData.detailedAddressErr = '';

        }

        if (
          additionalInfo?.workingMobileNumber?.length &&
          !additionalInfo?.workingMobileNumber?.trim().startsWith('0')
        ) {
          resultData.phoneErr = translate('validation_phone_start');
          isValid = false;
        } else if (
          additionalInfo?.workingMobileNumber?.length &&
          additionalInfo?.workingMobileNumber?.length > 0 &&
          (additionalInfo?.workingMobileNumber?.length < 9 || additionalInfo?.workingMobileNumber?.length > 80 )
        ) {
          resultData.phoneErr = translate('validation_phone_product_service_length');
          isValid = false;
        } else resultData.phoneErr = '';

        if (!isValid ){
          resultMessageData = {
            errData: resultData,
            message: 'ERROR',
            errCode: 1,
          };
          setIsLoading(false);
          return resultMessageData;
        }

        const transactionUpdated = await AsyncStorage.getItem('isUpdateAdditional');


        if (transactionUpdated === transactionId) {
          await updateAdditional(additionalInfo);
          // await updateAdditional(additionalInfo);
        } else {
          await saveAdditional(additionalInfo);
          await AsyncStorage.setItem('isUpdateAdditional', transactionId ?? '');

        }

        // save update additional

        resultMessageData = {
          errData: resultData,
          message: 'SUCCESS',
          errCode: 0,
        };

        dispatch(getCustomerInfoFlagReq({ transactionId: transactionId ?? '' }));
        setIsLoading(false);
        return resultMessageData;
      } catch (Exception: any) {

        // const transactionUpdated = await AsyncStorage.getItem('isUpdateAdditional');
        // if(transactionUpdated === transactionId){
        //   await AsyncStorage.setItem('isUpdateAdditional' , '');
        // }

        await showAlertModal({
          text: `${Exception?.message}`,
          title: 'Đăng ký sản phẩm dịch vụ',
        });

        setIsLoading(false);
        return formatError(Exception);
      }
    },
    [dispatch, showAlertModal]
  );

  return [isLoading, processUpdateAdditional] as const;
}

export default useUpdateAdditional;
