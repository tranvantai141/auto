import { useMemo } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

export type MoCValidationErrors =
  | 'ELIGIBLE_AGE'
  | 'EXPIRED'
  | 'INVALID_DOB'
  | 'INVALID_EXPIRED_DATE';

export function useMoCResult() {
  const mocResults = useAppSelector((state: RootState) => state.getMoCResults.data);

  return useMemo(() => {
    return {
      mocResults,
    };
  }, [mocResults]);
}
