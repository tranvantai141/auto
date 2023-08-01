import { useCallback, useState } from 'react';
import { delay } from 'src/common/utils/delay';
import axiosTokenInstance from 'src/service/network/axios';
import { useMoCResult } from '@screens/customerInfo/hooks/useMoCResult';
import { search_customer, updating_sup_info } from '@screens/customerInformation/api/endpoints';
import { SupplementalInformation } from '@screens/customerInfo/typings/request';
import { AxiosError } from 'axios';

type ResultData = {
  customerId: string;
  fullName: string;
  dob: string;
  gender: string;
  idType: string;
  idNumber: string;
  oldIdNumber: string;
  ddnd: string;
  validDate: string;
  expiredDate: string;
  issuePlace: string;
  nationality: string;
  hometown: string;
  resident: string;
};

type ResultMessageData = {
  errorMess: { cif: string; fullName: string };
  successMess: { cif: string; fullName: string };
};

function useUpdateSupplementalInfo() {
  const { mocResults } = useMoCResult();

  const [isLoading, setIsLoading] = useState(false);

  const updateSupplemental = useCallback(
    async (data : SupplementalInformation) => {

      try {
        setIsLoading(true);
        const res1 = await axiosTokenInstance({
          method: 'post',
          url: updating_sup_info,
          data: data,
        });

        setIsLoading(false);
        return res1;

      } catch (error: AxiosError) {

        console.log(error?.response.data.exception)

        const _error = {
            data: error?.response?.data?.exception?.message || error?.response?.data || error?.message,
            status: error?.response?.status || error?.status
        };

        setIsLoading(false);
        return _error;
      }


    },
    [isLoading]
  );

  return [isLoading, updateSupplemental] as const;
}

export default useUpdateSupplementalInfo;
