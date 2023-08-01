import { useCallback, useEffect, useMemo } from 'react';
import {
  GetTransactionDetailIDCardInfoDTO,
  GetTransactionDetailSupInfoDTO,
  SupItemDTO,
  TransactionDetailIDCardInfoResultDTO,
  NewSupInfoDTO,
  CurrentSupInfoDTO
} from '../types';
import { getTransactionDetailIdCardInfo } from '../apis/getTransactionDetailIdCardInfo';
import { CompareResult, GetSupplementalInfoDTO } from '@screens/customerInfo/typings';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { CompareStringOptions, compareString } from 'src/common/utils/compareString';
import { fuzzyDateParser } from 'src/common/utils/fuzzyDateParser';
import {
  getTransactionDetailCustomerImages,
  getTransactionDetailIDCardImageInfo,
  getTransactionDetailTabletSignatureInfo,
  getTransactionDetailWetSignatureInfo,
} from '../apis/getTransactionDetailLibraryImage';
import {
  getTransactionSupplementaryInfo,
} from '../apis/getTransactionSupplementaryInfo';
import {
  GetTransactionDetailIDCardImageInfoDTO,
  GetTransactionDetailImagesDTO,
  GetTransactionDetailTabletSignatureInfoDTO,
  GetTransactionDetailWetSignatureInfoDTO,
} from '../types/GetTransactionDetailLibraryImageDTO';
import { useTransactionDetailETBContext } from '../contexts/TransactionDetailETBContext';

export type IdCardImageResponse =
  | {
      idCardImageInfo: GetTransactionDetailIDCardImageInfoDTO | undefined;
      getWetSignatureInfo: GetTransactionDetailWetSignatureInfoDTO | undefined;
      tabletSignatureImageInfo: GetTransactionDetailTabletSignatureInfoDTO | undefined;
      customerImages: GetTransactionDetailImagesDTO | undefined;
    }
  | undefined;

export type CustomerInfoResult = {
  IdCardInfoResult: GetTransactionDetailIDCardInfoDTO | undefined;
  compareInfoResult: CompareResult[];
  supInfo:
    | {
        requestUpdateInfo: NewSupInfoDTO | undefined;
        currentInfo: CurrentSupInfoDTO | undefined;
      }
    | undefined;
  idCardImageResponse: IdCardImageResponse;
};

export function useEtbCustomerInfoSection(transactionId: string) {
  const { setCustomerInfoErrorCount, setIsMuntipleCif } = useTransactionDetailETBContext();
  const processFetchDataIDCardInfo = useCallback<
    () => Promise<GetTransactionDetailIDCardInfoDTO>
  >(async () => {
    const idCardInfoList = await getTransactionDetailIdCardInfo(transactionId);
    return idCardInfoList;
  }, [transactionId]);

  const fetchSupInfo = async () => {
    return await new Promise<GetTransactionDetailSupInfoDTO>((resolve, reject) => {
      resolve(getTransactionSupplementaryInfo(transactionId));
  })

   // return await Promise.(getTransactionSupplementaryInfo(transactionId));
  };

  //MARK: - processFetchDataLibraryImage
  const processFetchDataLibraryImage = async () => {
    const [idCardImageInfo, getWetSignatureInfo, tabletSignatureImageInfo, customerImages] =
      await Promise.all([
        getTransactionDetailIDCardImageInfo(transactionId),
        getTransactionDetailWetSignatureInfo(transactionId),
        getTransactionDetailTabletSignatureInfo(transactionId),
        getTransactionDetailCustomerImages(transactionId),
      ]);
    return {
      idCardImageInfo,
      getWetSignatureInfo,
      tabletSignatureImageInfo,
      customerImages,
    };
  };

  //MARK: - useQuery get transaction detail id card info
  const { data } = useQuery({
    queryKey: ['transactionDetailIdCardInfo', transactionId],
    queryFn: processFetchDataIDCardInfo,
    suspense: true,
    enabled: !!transactionId,
    // staleTime: 0,
    cacheTime: 0,
  });

  //MARK: - useQuery get transaction image library
  const { data: idCardImageResponse } = useQuery({
    queryKey: ['transactionDetailLibraryImage', transactionId],
    queryFn: processFetchDataLibraryImage,
    suspense: true,
    useErrorBoundary: false,
    enabled: !!transactionId,
    // staleTime: 0,
    cacheTime: 0,
  });

  //MARK: - useQuery get transaction detail supplementary info
  const { data: supInfo } = useQuery({
    queryKey: ['transactionDetailSupInfo', transactionId],
    queryFn: fetchSupInfo,
    suspense: true,
    useErrorBoundary: false,
    enabled: !!transactionId,
    // staleTime: 0,
    cacheTime: 0,
  });

  const idCardInfoErrorCount = (function () {
    // const updatedInfoCard = data?.idCardInfoList.find((item) => item.type === 'UPDATING');
    const hasError =
      data?.updateIdCardInfoStatus === 'ERROR' ||
      data?.updateIdCardInfoStatus === 'FAIL' ||
      data?.updateIdCardInfoStatus === 'FAILED';
    return hasError ? 1 : 0;
  })();

  const isMultipleCif = (function () {
    const cifList = data?.idCardInfoList.filter((item) => item.type === 'EXISTING');
    return cifList ? (cifList?.length > 1 ? true : false) : false;
  })();

  const supErrorCount = (function () {
    
    if (supInfo == null 
      || supInfo?.requestUpdateInfo == null) {
      return 0;
    }
    // count all key of supInfo.newSupInfo that has code is FAILED
    const count = Object.keys(supInfo?.requestUpdateInfo).reduce((acc, key) => {
      const supInfoItem = supInfo?.requestUpdateInfo[key as keyof NewSupInfoDTO] as
        | SupItemDTO
        | null
        | undefined;
      if (supInfoItem?.code === 'FAILED' || supInfoItem?.code === 'ERROR') {
        return acc + 1;
      }
      return acc;
    }, 0);
   
    return count;
  })();

  const imageErrorCount = (function () {
    if (idCardImageResponse === null) {
      return 0;
    }
    let count = 0;
    if (
      idCardImageResponse?.idCardImageInfo.addingNewIdCardImageStatus === 'FAILED' ||
      idCardImageResponse?.idCardImageInfo.addingNewIdCardImageStatus === 'FAIL' ||
      idCardImageResponse?.idCardImageInfo.addingNewIdCardImageStatus === 'ERROR'
    ) {
      count = count + 1;
    }
    if (
      idCardImageResponse?.idCardImageInfo.deletingNewIdCardImageStatus === 'FAILED' ||
      idCardImageResponse?.idCardImageInfo.deletingNewIdCardImageStatus === 'FAIL' ||
      idCardImageResponse?.idCardImageInfo.deletingNewIdCardImageStatus === 'ERROR'
    ) {
      count = count + 1;
    }
    if (
      idCardImageResponse?.getWetSignatureInfo.addingNewWetSignatureStatus === 'FAILED' ||
      idCardImageResponse?.getWetSignatureInfo.addingNewWetSignatureStatus === 'FAIL' ||
      idCardImageResponse?.getWetSignatureInfo.addingNewWetSignatureStatus === 'ERROR'
    ) {
      count = count + 1;
    }
    if (
      idCardImageResponse?.getWetSignatureInfo.deletingOldWetSignatureStatus === 'FAILED' ||
      idCardImageResponse?.getWetSignatureInfo.deletingOldWetSignatureStatus === 'FAIL' ||
      idCardImageResponse?.getWetSignatureInfo.deletingOldWetSignatureStatus === 'ERROR'
    ) {
      count = count + 1;
    }
    if (
      idCardImageResponse?.tabletSignatureImageInfo.addingTabletSignatureStatus === 'FAILED' ||
      idCardImageResponse?.tabletSignatureImageInfo.addingTabletSignatureStatus === 'FAIL' ||
      idCardImageResponse?.tabletSignatureImageInfo.addingTabletSignatureStatus === 'ERROR'
    ) {
      count = count + 1;
    }

    return count;
  })();

  // set error count to sidebar
  useEffect(() => {
    setCustomerInfoErrorCount({
      mocErrorCount: idCardInfoErrorCount,
      supErrorCount: supErrorCount,
      imageErrorCount: imageErrorCount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCardInfoErrorCount, supErrorCount, imageErrorCount]);
  // set isMultipleCif to sidebar
  useEffect(() => {
    setIsMuntipleCif(isMultipleCif);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMultipleCif]);

  function compareMocWithCifInfo(
    updateInfo: TransactionDetailIDCardInfoResultDTO,
    oldInfo: TransactionDetailIDCardInfoResultDTO
  ): CompareResult[] {
    const result: CompareResult[] = [];

    const stringCompareOptions: CompareStringOptions = {
      ignoreCase: true,
      trim: true,
      ignoreSpace: true,
      ignoreSpecialChar: false,
      ignoreVietnameseAccent: true,
    };

    // Compare full name
    const fullName = updateInfo.fullName;
    const oldFullName = oldInfo.fullName;
    if (!compareString(fullName ?? '', oldFullName ?? '', stringCompareOptions)) {
      result.push('NAME');
    }

    // Compare birthdate
    const dateOfBirth = fuzzyDateParser(updateInfo.dob ?? '');
    const cifDateOfBirth = fuzzyDateParser(oldInfo.dob ?? '');

    if (
      dateOfBirth == null ||
      cifDateOfBirth == null ||
      !moment(dateOfBirth).isSame(cifDateOfBirth, 'date')
    ) {
      result.push('BIRTHDATE');
    }

    // TODO: Compare gender

    // Compare id no
    const idNo = updateInfo.idNumber;
    const cifIdNo = oldInfo.idNumber;
    if (!compareString(idNo ?? '', cifIdNo ?? '', stringCompareOptions)) {
      result.push('ID_NO');
    }

    // compare Gender
    const gender = updateInfo.gender;
    const cifGender = oldInfo.gender;
    if (!compareString(gender ?? '', cifGender ?? '', stringCompareOptions)) {
      result.push('GENDER');
    }

    // Compare issue date
    const issueDate = fuzzyDateParser(updateInfo.validDate ?? '');
    const cifIssueDate = fuzzyDateParser(oldInfo.validDate ?? '');
    if (
      issueDate == null ||
      cifIssueDate == null ||
      !moment(issueDate).isSame(cifIssueDate, 'day')
    ) {
      result.push('ISSUE_DATE');
    }

    // Compare issue place
    // TODO: get issue place from CIF
    const cifIssuePlaceCode = oldInfo.issuePlace;
    const issuePlaceCode = updateInfo.issuePlace;

    if (!compareString(cifIssuePlaceCode ?? '', issuePlaceCode ?? '', stringCompareOptions)) {
      result.push('ISSUE_PLACE');
    }

    // Compare expired date
    const expiredDate = fuzzyDateParser(updateInfo.expiredDate ?? '');
    const cifExpiredDate = fuzzyDateParser(oldInfo.expiredDate ?? '');
    if (
      updateInfo.formattedExpiredDate !== 'Không thời hạn' &&
      oldInfo.formattedExpiredDate !== 'Không thời hạn'
    ) {
      if (
        expiredDate == null ||
        cifExpiredDate == null ||
        !moment(expiredDate).isSame(cifExpiredDate, 'day')
      ) {
        result.push('EXPIRED_DATE');
      }
    } else {
      if (
        expiredDate == null ||
        cifExpiredDate == null ||
        !moment(expiredDate).isSame(cifExpiredDate, 'day')
      ) {
        result.push('EXPIRED_DATE');
      }
    }

    // Compare nationality
    const nationality = updateInfo.nationality ?? '';
    const cifNationality = oldInfo.nationality ?? '';
    if (!compareString(nationality, cifNationality, stringCompareOptions)) {
      result.push('NATIONALITY');
    }

    return result;
  }

  const result = useMemo<CustomerInfoResult>(() => {
    return {
      IdCardInfoResult: data,
      compareInfoResult: compareMocWithCifInfo(
        data?.idCardInfoList.find((item) => item.type === 'EXISTING') ?? {},
        data?.idCardInfoList.find((item) => item.type === 'UPDATING') ?? {}
      ),
      supInfo: supInfo,
      idCardImageResponse: idCardImageResponse,
    };
  }, [data, supInfo, idCardImageResponse]);

  return useMemo(() => {
    return { result };
  }, [result]);
}

////
