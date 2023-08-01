import { useQuery } from '@tanstack/react-query';
import { checkCustomerExistence } from '../apis/endpoints';
import { delay } from 'src/common/utils/delay';

type Result = {
  result: 'EXIST' | 'NOT_EXIST' | 'MULTIPLE_CIF';
};

export function useCustomerExistence(transactionId: string | null) {
  return useQuery<Result>(
    ['customerExistence', transactionId],
    async () => {
      try {
        const checkCustomerExistenceResponse = await checkCustomerExistence(transactionId ?? '');
        const isExist = checkCustomerExistenceResponse.data?.exists === true;
        return {
          result: isExist ? 'EXIST' : 'NOT_EXIST',
        } as Result;
      } catch (error) {
        return {
          result: 'NOT_EXIST',
        } as Result;
      }
      // throw new Error(checkCustomerExistenceResponse.data.message);

      // Fake API call, duration 1 second
      // await delay(2000);
      // return {
      //   result: 'NOT_EXIST',
      // } as Result;
    },
    { suspense: true, enabled: !!transactionId, useErrorBoundary: true, cacheTime: 0 }
  );
}
