import { useCallback, useState } from 'react';
import { useConfirmModal } from '../../../hooks/useConfirmModal';
import { AxiosError } from 'axios';
import { ResultMessageData } from '@screens/productServices/typings';
import { prepareProductService } from '@screens/productServices/api/endpoints';



function usePrepareProductService() {
  const { showConfirmModal, showAlertModal } = useConfirmModal();
  const [isLoading, setIsLoading] = useState(false);

  function formatError(error: AxiosError): ResultMessageData {
    return {
      message: error?.response?.data || error?.message || 'Unknown error',
      errCode: error?.response?.status || 500,
      errData: undefined,
    };
  }

  const processPrepareData = useCallback( async ( transactionID: string) => {
      try {

        setIsLoading(true);
        let resultData: ResultMessageData;

        // prepare data
        const prepareResponse = await prepareProductService(transactionID);

        resultData = {
          message: 'SUCCESS',
          errCode: 0,
          errData: undefined,
        };

        setIsLoading(false);
        return resultData;

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

  return [isLoading , processPrepareData] as const;
}

export default usePrepareProductService;