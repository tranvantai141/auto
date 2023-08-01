import { RouteNames } from '@routeNames';
import useUpdateSupplementalInfo from '@screens/customerInfo/hooks/useUpdateSupplementalInfo';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useCallback, useMemo, useState } from 'react';
import { CompareStringOptions, compareString } from 'src/common/utils/compareString';
import { fuzzyDateParser } from 'src/common/utils/fuzzyDateParser';
import { useConfirmModal } from 'src/hooks/useConfirmModal';
import useTransactionId from 'src/hooks/useTransactionId';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { updateETBUpdatedInfo } from 'src/redux/slices/mocResultInfo/ETBUpdatedInfoSlice';
import { RootState } from 'src/redux/store';
import { MoCResultData } from 'src/typings/global';
import { updateCurentSupplementalResult } from '../../../redux/slices/mocResultInfo/SupplementalInfo';
import {
  getAccounts,
  getCifInfoList,
  getMemoByCif,
  getSupplementary,
  getUpdatedFlag,
  prepareProductService,
} from '../apis/endpoints';
import { CifDataDTO, CompareResult, MemoDataDTO, SupplementalInfoDTO } from '../typings';
import { AccountDataDTO } from '../typings/DTO';
import { SupplementalInformation } from '../typings/request';
import { useCancelTransactionMoC } from './useCancelTransactionMoC';
import {
  ResponseApiProductionAndServices,
  useProductionAndServices,
} from './useProductionAndServices';
import { updateCustomerInfoData } from 'src/redux/slices/customerInfoData/CustomerInfoDataSlice';
import { setPhoneNumber } from 'src/redux/slices/phoneNumberForOtp/PhoneNumberForOtp';
import { delay } from 'src/common/utils/delay';
import { resetDigi } from '@screens/productServices/redux/slices/GetDigibankRegisteredInfoSlice';
import { resetDebitCardList } from '@screens/productServices/redux/slices/GetRequestedDebitCardSlice';
import { resetAccountList } from '@screens/productServices/redux/slices/GetAccountListSlice';
import { resetDelivery } from '@screens/productServices/redux/slices/UpdateDeliveryInfoSlice';
import { resetAdditional } from '@screens/productServices/redux/slices/UpdateAdditionalInfoSlice';
import Config from 'react-native-config';
import { clearCacheTransaction } from 'src/redux/actions/cancelTransaction/CancelTransaction';

type MoCValidationErrors = 'ELIGIBLE_AGE' | 'EXPIRED' | 'INVALID_DOB' | 'INVALID_EXPIRED_DATE';

export type MoCResultFlow =
  | {
      result: 'MOC_FAILED';
      mocResult: MoCResultData;
    }
  | {
      result: 'INVALID_MOC';
      mocResult: MoCResultData;
      errors: MoCValidationErrors[];
    }
  | {
      result: 'NTB';
      mocResult: MoCResultData;
    }
  | {
      result: 'ETB';
      cif: CifDataDTO;
      mocResult: MoCResultData;
      diffInfos: CompareResult[];
      invalidDiffInfo: boolean;
      invalidMemoKyc: boolean;
      accountList: AccountDataDTO[];
      cifMemo: MemoDataDTO[];
      productResult: ResponseApiProductionAndServices;
      productStatus: 'LOADING' | 'SUCCESS' | 'FAILED';
      supplementalInfo: {
        state: 'LOADING' | 'SUCCESS' | 'FAILED';
        data: SupplementalInfoDTO[];
      };
      isSupInfoError: boolean;
    }
  | {
      result: 'MUTIPLE_CIF';
      cifs: CifDataDTO[];
      mocResult: MoCResultData;
    }
  | {
      result: 'INVALID_MEMO';
      mocResult: MoCResultData;
    };

export function useMocResultFlow() {
  const transactionId = useTransactionId();
  const mocResult = useAppSelector((state: RootState) => state.getMoCResults.data);
  const getSupplementalInfo = useAppSelector(
    (state: RootState) => state.getSupplementalInfoSlice.data
  );

  const dispatch = useAppDispatch();

  const navigation = useRootNavigation();
  const cancelTransaction = useCancelTransactionMoC();
  const [, updateSupplemental] = useUpdateSupplementalInfo();
  const { showConfirmModal, showAlertModal } = useConfirmModal();
  const [isSupInfoError, setIsSupInfoError] = useState(false);

  // 1. Check MOC result
  const isMocResultFailed = mocResult.error?.code != null && mocResult.error.code !== 0;

  const mocValidationErrors = useMemo(() => {
    const errors: MoCValidationErrors[] = [];

    // validate DOB is valid (> 15)
    const dateOfBirth = fuzzyDateParser(mocResult?.DOB ?? '');
    if (dateOfBirth == null) {
      errors.push('INVALID_DOB');
    } else {
      const age = moment().diff(dateOfBirth, 'years');
      if (age < 15) {
        errors.push('ELIGIBLE_AGE');
      }
    }

    // validate moc is expired
    if (
      !compareString(mocResult?.ExpiredDate ?? 'N/A', 'Không thời hạn', {
        ignoreCase: true,
        trim: true,
        ignoreSpace: true,
      })
    ) {
      const expiredDate = fuzzyDateParser(mocResult?.ExpiredDate ?? '');
      if (expiredDate == null) {
        errors.push('INVALID_EXPIRED_DATE');
      } else {
        if (expiredDate.getTime() < new Date().getTime()) {
          errors.push('EXPIRED');
        }
      }
    }

    return errors;
  }, [mocResult]);

  // 2. Check CIF by get CIF info list
  const { data: cifInfos, isFetched: isListCifFetched } = useQuery(
    ['getCifInfoList', transactionId],
    async () => {
      const res = await getCifInfoList(transactionId ?? '');
      if (res && res.code === 'SUCCESS') {
        return res.cifInfoList;
      }
      return []
      // throw new Error(res?.message);
    },
    {
      enabled: transactionId != null && mocValidationErrors.length === 0,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000,
      cacheTime: 10 * 1000,
    }
  );

  // 3. Compare moc with cif info if there is only 1 cif info
  const diffInfos = useMemo(() => {
    if (cifInfos == null || cifInfos.length !== 1) {
      return [];
    }
    return compareMocWithCifInfo(mocResult, cifInfos[0]);
  }, [cifInfos, mocResult]);

  const isBlockByDiffInfo = useMemo(() => {
    if (diffInfos.length === 0) {
      return false;
    }
    if (diffInfos.includes('NAME') || diffInfos.includes('BIRTHDATE')) {
      return true;
    }
    return false;
  }, [diffInfos]);

  // 4. Get memo by cif
  // only get if cif info has 1 item
  const { data: memos, isFetched: isMemoFetched } = useQuery(
    ['getMemo', transactionId],
    async () => {
      const res = await getMemoByCif(transactionId ?? '');
      if (res.code === 'SUCCESS') {
        return res.memoInfo ?? [];
      }
      throw new Error(res.message);
    },
    {
      enabled: cifInfos != null && cifInfos.length === 1 && !isBlockByDiffInfo,
      staleTime: 10 * 1000,
      cacheTime: 10 * 1000,
    }
  );

  // MARK: get api get-exitsting-account-list

  const { data: existingAccountList } = useQuery(
    ['getExistingAccountList', transactionId],
    async () => {
      const res = await getAccounts(transactionId ?? '');
      if (res.code === 'SUCCESS') {
        return res.accountList ?? [];
      }
      throw new Error(res.message);
    },
    {
      enabled: cifInfos != null && cifInfos.length === 1 && !isBlockByDiffInfo,
      staleTime: 10 * 1000,
      cacheTime: 10 * 1000,
    }
  );

  // Compare memo has kyc or not
  const isBlockByMemoKyc = useMemo(() => {
    if (
      (memos == null || memos.length === 0) &&
      (existingAccountList == null || existingAccountList.length === 0)
    ) {
      return false;
    }

    return (
      (memos ?? []).filter((memo) => memo.itemClass === 'EKYC').length > 0 ||
      (existingAccountList ?? []).filter((account) =>
        account.memoInfo?.some((memo) => memo.itemClass === 'EKYC')
      ).length > 0
    );
  }, [memos, existingAccountList]);

  const productResult = useProductionAndServices(
    cifInfos != null && cifInfos.length === 1 && !isBlockByDiffInfo
  );

  // 5. Get suplementary info
  const {
    data: suplementaryInfoList,
    status: getSuplementaryInfoStatus,
    refetch: refetchSuplementaryInfo,
  } = useQuery(
    ['getSuplementaryInfo', transactionId, isMemoFetched],
    async () => {
      // Mock error
      // await delay(2000);
      // throw new Error('Timeout');

      const res = await getSupplementary(transactionId ?? '');

      if (res.code === 'SUCCESS') {
        if (res.supplementalInfoList?.length && res.supplementalInfoList.length > 0) {
          const supplementalInfo = {
            transactionId: transactionId,
            currentAddress: res?.supplementalInfoList[0]?.currentAddress ?? '',
            newCurrentAddress: '',
            newProvinceCode: '',
            newDistrictCode: '',
            newCommuneCode: '',
            newDetailAddress: '',
            mobilePhone: res?.supplementalInfoList[0]?.contactList?.['MP']
              ?.map((e) => e.contactValue)
              .toString()
              .trim(),
            newMobilePhone: '',
            homePhone: res?.supplementalInfoList[0]?.contactList?.['HP']
              ?.map((e) => e.contactValue)
              .toString()
              .trim(),
            newHomePhone: '',
            email: res?.supplementalInfoList[0]?.contactList?.['EP']
              ?.map((e) => e.contactValue)
              .toString()
              .trim(),
            newEmail: '',
            currentOccupation: res?.supplementalInfoList[0]?.currentOccupation ?? '',
            newCurrentOccupation: '',
            otherOccupationInfo: '',
            jobTitle: res?.supplementalInfoList[0]?.jobTitle ?? '',
            newJobTitle: '',
            otherJobTitleInfo: '',
            otherCurrentOccupation: res?.supplementalInfoList[0]?.otherCurrentOccupation ?? '',
            otherJobTitle: res?.supplementalInfoList[0]?.otherJobTitle ?? '',
          } as SupplementalInformation;

          dispatch(updateCurentSupplementalResult(supplementalInfo));
        }

        return res.supplementalInfoList;
      }
      throw new Error(res.message);
    },
    {
      enabled: isMemoFetched,
      suspense: false,
      refetchOnMount: true,
      useErrorBoundary: false,
      staleTime: 10 * 1000,
      cacheTime: 10 * 1000,
    }
  );

  const result = useMemo<MoCResultFlow>(() => {
    if (isMocResultFailed) {
      return {
        result: 'MOC_FAILED',
        mocResult,
      };
    }

    if (mocValidationErrors.length > 0) {
      return {
        result: 'INVALID_MOC',
        errors: mocValidationErrors,
        mocResult,
      };
    }

    if (isListCifFetched) {
      if (cifInfos == null || cifInfos.length === 0) {
        return {
          result: 'NTB',
          mocResult,
        };
      }

      if (cifInfos.length > 1) {
        return {
          result: 'MUTIPLE_CIF',
          cifs: cifInfos,
          mocResult,
        };
      }

      return {
        result: 'ETB',
        cif: cifInfos[0],
        mocResult,
        diffInfos,
        invalidDiffInfo: isBlockByDiffInfo,
        invalidMemoKyc: isBlockByMemoKyc,
        cifMemo: memos ?? [],
        accountList: existingAccountList ?? [],
        productResult: productResult.result,
        productStatus:
          productResult.status === 'success'
            ? 'SUCCESS'
            : productResult.status === 'error'
            ? 'FAILED'
            : 'LOADING',
        supplementalInfo: {
          state:
            getSuplementaryInfoStatus === 'success'
              ? 'SUCCESS'
              : getSuplementaryInfoStatus === 'error'
              ? 'FAILED'
              : 'LOADING',
          data: suplementaryInfoList ?? [],
        },
        isSupInfoError: isSupInfoError,
      };
    }

    return {
      result: 'INVALID_MEMO',
      mocResult,
    };
  }, [
    isMocResultFailed,
    mocValidationErrors,
    isListCifFetched,
    mocResult,
    cifInfos,
    diffInfos,
    isBlockByDiffInfo,
    isBlockByMemoKyc,
    memos,
    existingAccountList,
    productResult.result,
    productResult.status,
    getSuplementaryInfoStatus,
    suplementaryInfoList,
    isSupInfoError,
  ]);

  const retryAction = useCallback(async () => {
    if (result.result === 'ETB' && getSuplementaryInfoStatus === 'error') {
      await refetchSuplementaryInfo();
    }
    if (result.result === 'ETB' && productResult.status === 'error') {
      await productResult.retry();
    }
  }, [getSuplementaryInfoStatus, productResult, refetchSuplementaryInfo, result.result]);

  const validateAction = useCallback(
    async (newValue: SupplementalInformation) => {
      if (result.result === 'ETB') {
        const isValid = validateSupInfo(suplementaryInfoList ?? [], newValue);
        setIsSupInfoError(!isValid);
      }
    },
    [result.result, suplementaryInfoList]
  );

  const continueAction = useCallback(async () => {
    if (result.result === 'INVALID_MOC') {
      // cancel transaction and go back to home page
      // const cancelReason = result.errors.includes('ELIGIBLE_AGE')
      //   ? 'Khách hàng chưa đủ tuổi'
      //   : 'CCCD hết hiệu lực';
      // await cancelTransaction(cancelReason);
      dispatch(clearCacheTransaction('Clear transaction data', transactionId ?? ''));
      navigation.navigate(RouteNames.home.name);
      return;
    }

    if (result.result === 'MUTIPLE_CIF') {
      // cancel transaction and go back to home page
      // const cancelReason = 'KH hiện hữu có 2 CIF trở lên';
      // await cancelTransaction(cancelReason);
      dispatch(clearCacheTransaction('Clear transaction data', transactionId ?? ''));
      navigation.navigate(RouteNames.home.name);
      return;
    }

    if (result.result === 'ETB' && result.invalidDiffInfo) {
      const cancelReason = 'KH hiện hữu có khác biệt họ tên/ngày sinh';
      await cancelTransaction(cancelReason);
      navigation.navigate(RouteNames.home.name);
      return;
    }

    if (result.result === 'ETB' && result.invalidMemoKyc) {
      // cancel transaction and go back to home page

      // const cancelReason = 'KH hiện hữu có memo EKYC';
      // await cancelTransaction(cancelReason);
      dispatch(clearCacheTransaction('Clear transaction data', transactionId ?? ''));
      navigation.navigate(RouteNames.home.name);

      return;
    }

    dispatch(
      updateCustomerInfoData({
        resultFlow: result,
      })
    );

    if (result.result === 'ETB') {
      // Handle ETB

      // Validate suplementary info
      const isValid = validateSupInfo(suplementaryInfoList ?? [], getSupplementalInfo);
      setIsSupInfoError(!isValid);

      if (isValid) {
        const resSupplimental = await updateSupplemental(getSupplementalInfo);
        if (resSupplimental?.data.code !== 'SUCCESS') {
          await showAlertModal({
            text: `${resSupplimental?.data}`,
            title: 'Cập nhật thông tin bổ sung.',
          });
          return;
        }
        if (getSupplementalInfo?.newMobilePhone)
          dispatch(setPhoneNumber(getSupplementalInfo?.newMobilePhone));
        else if (getSupplementalInfo?.mobilePhone)
          dispatch(setPhoneNumber(getSupplementalInfo?.mobilePhone));
        const flagDTO = await getUpdatedFlag(transactionId ?? '');
        const flags = [
          flagDTO.updateContact ?? false,
          flagDTO.updateCurrentAddress ?? false,
          flagDTO.updateIdInfo ?? false,
          flagDTO.updateJobDetail ?? false,
        ];
        const isRegisterProduct = await showConfirmModal({
          text: 'Bạn có muốn tiếp tục đăng ký sản phẩm dịch vụ?',
          confirmText: 'Có', // Without register new product
          confirmIcon: undefined,
          cancelIcon: undefined,
          cancelText: 'Không', // Register new product
        });

        // Save flag to redux
        dispatch(
          updateETBUpdatedInfo({
            updatedFlags: flagDTO,
            isRegisterProduct: isRegisterProduct,
            existingCifInfo: cifInfos?.[0] ?? null,
            isChangedWetSignature: null,
            newWetSignatureUri: null,
          })
        );

        // Delay to wait modal animation complete, avoid flickering
        await delay(200);
        if (!isRegisterProduct) {
          // Atleast 1 flag is true => show review ETB, else cancel transaction
          if (flags.includes(true)) {
            // call prepare for clear all registed producr&service before

            const data = await prepareProductService(transactionId ?? '');
            if (data?.status === 'success') {
              dispatch(resetDigi());
              dispatch(resetDebitCardList());
              // dispatch(resetCardList());
              dispatch(resetAccountList());
              dispatch(resetDelivery());
              dispatch(resetAdditional());
              navigation.navigate(RouteNames.reviewETBInformation.name, {
                registerProduct: true,
              });
            }
          } else {
            // yêu cầu mới không thực hiện gì cả
            // cancelTransaction('KH dừng thực hiện');
            // navigation.navigate(RouteNames.home.name);
          }
        } else {
          // Show product ETB
          navigation.navigate(RouteNames.productService.name);
        }
      }

      return;

      // const result = await updateSupplemental(getSupplementalInfo);
    }

    // NTB wihtout acctions
    // dispatch(
    //   setAdditionalGlobalInfo({
    //     otherIdNumber: otherIdNumber.trim().length > 0 ? otherIdNumber : undefined,
    //   })
    // );
    navigation.navigate(RouteNames.supplementaryInfo.name, {
      detailAddressParam: mocResult.Resident,
    });
  }, [result, dispatch, navigation, mocResult.Resident, transactionId, cancelTransaction, suplementaryInfoList, getSupplementalInfo, updateSupplemental, showConfirmModal, cifInfos, showAlertModal]);

  return useMemo(() => {
    return {
      result,
      continueAction,
      retryAction,
      validateAction,
    };
  }, [continueAction, result, retryAction, validateAction]);
}

function compareMocWithCifInfo(mocResult: MoCResultData, cifInfos: CifDataDTO): CompareResult[] {
  const result: CompareResult[] = [];

  const stringCompareOptions: CompareStringOptions = {
    ignoreCase: true,
    trim: true,
    ignoreSpace: true,
    ignoreSpecialChar: false,
    ignoreVietnameseAccent: true,
  };

  // Compare full name
  const fullName = mocResult.FullName;
  const cifFullName = cifInfos.fullName;
  if (!compareString(fullName, cifFullName, stringCompareOptions)) {
    result.push('NAME');
  }

  // Compare birthdate
  const dateOfBirth = fuzzyDateParser(mocResult.DOB ?? '');
  const cifDateOfBirth = fuzzyDateParser(Number(cifInfos.dob));

  if (
    dateOfBirth == null ||
    cifDateOfBirth == null ||
    !moment(dateOfBirth).isSame(cifDateOfBirth, 'date')
  ) {
    result.push('BIRTHDATE');
  }

  // TODO: Compare gender

  // Compare id no
  const idNo = mocResult.IDNumber;
  const cifIdNo = cifInfos.idNumber;
  if (!compareString(idNo, cifIdNo, stringCompareOptions)) {
    result.push('ID_NO');
  }

  // compare Gender
  const gender = mocResult.Gender;
  const cifGender = cifInfos.gender;
  if (!compareString(gender, cifGender, stringCompareOptions)) {
    result.push('GENDER');
  }

  // Compare issue date
  const issueDate = fuzzyDateParser(mocResult.ValidDate ?? '');
  const cifIssueDate = fuzzyDateParser(Number(cifInfos.validDate));

  if (issueDate == null || cifIssueDate == null || !moment(issueDate).isSame(cifIssueDate, 'day')) {
    if (!__DEV__ || Config.ENV !== 'sit') result.push('ISSUE_DATE');
  }

  // Compare issue place
  // TODO: get issue place from CIF
  const cifIssuePlaceCode = cifInfos.issuePlace;
  if (cifIssuePlaceCode !== '002') {
    result.push('ISSUE_PLACE');
  }

  // Compare expired date
  const expiredDate = fuzzyDateParser(mocResult.ExpiredDate ?? '');
  const cifExpiredDate = fuzzyDateParser(Number(cifInfos.expiredDate));
  if (
    mocResult.ExpiredDate !== 'Không thời hạn' &&
    cifInfos.formattedExpiredDate !== 'Không thời hạn'
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
  const nationality = mocResult.Nationality;
  const cifNationality = cifInfos.nationality;
  if (!compareString(nationality, cifNationality, stringCompareOptions)) {
    result.push('NATIONALITY');
  }

  return result;
}

function validateSupInfo(
  supInfoList: SupplementalInfoDTO[],
  updatedInfo: SupplementalInformation
): boolean {
  if (supInfoList.length === 0) {
    return false;
  }

  const verifyInfoDTO = (info: SupplementalInfoDTO): boolean => {
    return (
      info.currentOccupation != null &&
      info.currentOccupation !== '' &&
      info.jobTitle != null &&
      info.jobTitle !== '' &&
      info.currentAddress != null &&
      info.currentAddress !== '' &&
      info.contactList['MP'] != null &&
      (info.contactList['MP'] ?? []).length > 0 &&
      // info.contactList['HP'] != null &&
      // (info.contactList['HP'] ?? []).length > 0 &&
      info.contactList['EP'] != null &&
      (info.contactList['EP'] ?? []).length > 0
    );
  };

  const isNullOrEmpty = (value: string | undefined): boolean => {
    return value == null || value === '';
  };

  const newInfoInList = supInfoList.find((item) => item.infoType === 'NEW_INFO');
  if (newInfoInList != null) {
    return verifyInfoDTO(newInfoInList);
  }

  const isCurrentInfoValid = verifyInfoDTO(supInfoList[0]);

  if (isCurrentInfoValid) {
    return true;
  }

  // Combine current info with updated info
  const updatedInfoDTO: SupplementalInfoDTO = {
    infoType: 'NEW_INFO',
    currentOccupation: isNullOrEmpty(updatedInfo.newCurrentOccupation)
      ? supInfoList[0].currentOccupation
      : updatedInfo.newCurrentOccupation,
    jobTitle: isNullOrEmpty(updatedInfo.newJobTitle)
      ? supInfoList[0].jobTitle
      : updatedInfo.newJobTitle,
    currentAddress: isNullOrEmpty(updatedInfo.newCurrentAddress)
      ? supInfoList[0].currentAddress
      : updatedInfo.newCurrentAddress,
    contactList: {
      MP: isNullOrEmpty(updatedInfo.newMobilePhone)
        ? supInfoList[0].contactList?.MP ?? []
        : [{ contactType: 'MP', contactValue: updatedInfo.newMobilePhone }],
      HP: isNullOrEmpty(updatedInfo.newHomePhone)
        ? supInfoList[0].contactList?.HP ?? []
        : [{ contactType: 'HP', contactValue: updatedInfo.newHomePhone }],
      EP: isNullOrEmpty(updatedInfo.newEmail)
        ? supInfoList[0].contactList?.EP ?? []
        : [{ contactType: 'EP', contactValue: updatedInfo.newEmail }],
    },
  };

  return verifyInfoDTO(updatedInfoDTO);
}
