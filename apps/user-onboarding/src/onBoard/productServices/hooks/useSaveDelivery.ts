import { useCallback, useState } from 'react';
import { delay } from 'src/common/utils/delay';
import axiosTokenInstance from 'src/service/network/axios';
import { useMoCResult } from '@screens/customerInfo/hooks/useMoCResult';
import { search_customer } from '@screens/customerInformation/api/endpoints';
import { compareString } from '../../../common/utils/compareString';
import { IOpenAccount } from '@interfaces/I_OpenAccount';
import {
  openRequestAccount,
  prepareProductService,
  registerEBanking, saveDelivery,
  updateAdditional,
} from '@screens/productServices/api/endpoints';
import { AxiosError } from 'axios';
import { IRegisterDebit, IRegisterOpeAccount } from '@screens/productAndService/typings';
import { REGISTER_DEBIT_CARD, REGISTER_OPEN_ACCOUNT } from '@screens/productAndService/api/endpoints';
import { API_ERROR } from '../../../typings/global';
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



function useSaveDelivery() {

  const [isLoading, setIsLoading] = useState(false);
  const { showConfirmModal, showAlertModal } = useConfirmModal();


  function formatError(error: AxiosError): ResultMessageData {
    return {
      message: error?.response?.data || error?.message || 'Unknown error',
      errCode: error?.response?.status || 500,
      errData: undefined,

    };
  }


  const processSaveDelivery = useCallback(
    async ( deliveryAddress: IDeliveryAddress ) => {

      setIsLoading(true);
      let resultMessageData : ResultMessageData  ;
      let resultData : ResultData = {
        proviceErr : '',
        detailedAddressErr : '',
        communceErr : '',
        districtErr : '',
        phoneErr : '',
      };
      let isValid = true;

      try {

        if(deliveryAddress?.deliveryMethodRequested === 'OTHER_ADDRESS' ) {
          if (!deliveryAddress?.communceCode || deliveryAddress?.communceCode?.trim() === ''){
            resultData.communceErr = translate('blank_data') + translate('communce');
            isValid = false;
          } else resultData.communceErr = '';

          if (!deliveryAddress?.provinceCode || deliveryAddress?.provinceCode?.trim() === ''){
            resultData.proviceErr = translate('blank_data') + translate('district');
            isValid = false;
          } else resultData.proviceErr = '';

          if (!deliveryAddress?.districtCode || deliveryAddress?.districtCode?.trim() === ''){
            resultData.districtErr = translate('blank_data') + translate('city');
            isValid = false;
          } else resultData.districtErr = '';

          if (!deliveryAddress?.detailedAddress || deliveryAddress?.detailedAddress?.trim() === '' || deliveryAddress?.detailedAddress?.split(',')[0]?.trim() === ''){
            resultData.detailedAddressErr = translate('blank_data') + translate('detailed_address');
            isValid = false;
          } else resultData.detailedAddressErr = '';
        }

        if(!isValid){
          resultMessageData = {
            errData : resultData,
            message: 'ERROR',
            errCode: 1
          }
          setIsLoading(false);
          return resultMessageData;
        }

        // save update additional
        const deliveryResponse = await saveDelivery(deliveryAddress);

        resultMessageData = {
          errData : resultData,
          message: 'SUCCESS',
          errCode: 0
        }

        setIsLoading(false);
        return resultMessageData;


      } catch (Exception : any) {
        setIsLoading(false);

        await showAlertModal({
          text: `${Exception?.message}`,
          title: 'Đăng ký sản phẩm dịch vụ',
        });


        return formatError(Exception);
      }

    },
    [isLoading]
  );

  return [isLoading, processSaveDelivery] as const;
}

export default useSaveDelivery;
