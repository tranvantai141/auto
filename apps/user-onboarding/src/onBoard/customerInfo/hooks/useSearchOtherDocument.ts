import { useCallback, useState } from 'react';
import { delay } from 'src/common/utils/delay';
import axiosTokenInstance from 'src/service/network/axios';
import { useMoCResult } from '@screens/customerInfo/hooks/useMoCResult';
import { search_customer } from '@screens/customerInformation/api/endpoints';
import { compareString } from '../../../common/utils/compareString';

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

function useSearchOtherDocument() {
  const { mocResults } = useMoCResult();

  const [isLoading, setIsLoading] = useState(false);

  const searchOtherDocument = useCallback(
    async (idNumber: string , transactionID: string, customerType? : string , cif? : any) => {

      try {
        setIsLoading(true);
        const res1 = await axiosTokenInstance({
          method: 'post',
          url: search_customer,
          data: {
            identificationNumber : idNumber,
            transactionId : transactionID,
          },
        });

        setIsLoading(false);

        const data = res1?.data


        const messageCase1 = {
          errorMess: {
            cif: undefined,
            fullName: undefined,
          },
          successMess: {
            cif: undefined,
            fullName: `Họ tên trùng khớp với họ tên của chủ thẻ CCCD `,
          },
        };

        const messageCase2 = {
          errorMess: {
            cif: undefined,
            fullName: `Họ tên không trùng khớp với họ tên của chủ thẻ CCCD (${mocResults?.FullName.toUpperCase()})`,
          },
          successMess: {
            cif: undefined,
            fullName: undefined,
          },
        };

        const messageCase3 = {
          errorMess: {
            cif: 'Không tồn tại CIF tương ứng',
            fullName: undefined,
          },
          successMess: {
            cif: undefined,
            fullName: undefined,
          },
        };

        const messageCase4 = {
          errorMess: {
            cif: 'Số CIF không trùng khớp với số CIF của chủ thẻ CCCD',
            fullName: undefined,
          },
          successMess: {
            cif: undefined,
            fullName: undefined,
          },
        };

        const messageCase5 = {
          errorMess: {
            cif: undefined,
            fullName: undefined,
          },
          successMess: {
            cif: `Số CIF trùng khớp với số CIF của chủ thẻ CCCD `,
            fullName: undefined,
          },
        };

        const listResult = [];

        if (!data?.customerInfos || data?.customerInfos?.length === 0) {
          listResult.push({
            result: undefined,
            message: messageCase3,
          });
          return listResult;
        }

        // console.log('-------------------------------------------')
        // console.log(customerType)
        // console.log(data?.customerInfos)
        // console.log(cif?.cifNumber ?? '')
        // console.log('-------------------------------------------')

        // NTB
        if(customerType === 'NTB'){

            data?.customerInfos?.map((cusInfor) => {
              //case 1 : response from CoreBanking has a matched CIF with the ID number AND the fullname get from the found CIF information matched with full name of customer from MoC SDK

              // if (cusInfor?.fullName.toUpperCase() === mocResults?.FullName.toUpperCase()) {
              if (compareString(cusInfor?.fullName, mocResults?.FullName,{ ignoreVietnameseAccent: true , ignoreCase : true , trim : true , ignoreSpace : true , ignoreSpecialChar : true })) {
                listResult.push({
                  result: cusInfor as ResultData,
                  message: messageCase1,
                });
              }

              //case 2 :  response from CoreBanking has a matched CIF with the ID number AND the fullname get from the found CIF information is NOT matched with full name of customer from MoC SDK
              else {
                listResult.push({
                  result: cusInfor as ResultData,
                  message: messageCase2,
                });
              }
            });
        }
        else // ETB
        {

          data?.customerInfos?.map((cusInfor) => {

            // if (cusInfor?.fullName.toUpperCase() === mocResults?.FullName.toUpperCase()) {
            if (compareString(cusInfor?.cifNumber, cif?.cifNumber ?? '',{ ignoreVietnameseAccent: true , ignoreCase : true , trim : true , ignoreSpace : true , ignoreSpecialChar : true })) {
              listResult.push({
                result: cusInfor as ResultData,
                message: messageCase5,
              });
            }

            else
              {
              listResult.push({
                result: cusInfor as ResultData,
                message: messageCase4,
              });
            }
          });

        }


        return listResult;
      } catch (e) {
        setIsLoading(false);
        return null;
      }


    },
    [isLoading]
  );

  return [isLoading, searchOtherDocument] as const;
}

export default useSearchOtherDocument;
