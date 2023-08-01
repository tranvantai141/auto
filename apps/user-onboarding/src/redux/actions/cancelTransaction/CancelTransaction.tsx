import {
  onCancelTransactionError,
  onCancelTransactionSuccess,
  setLoading,
} from '../../slices/cancelTransaction/CancelTransactionSlice';
import axiosTokenInstance from 'src/service/network/axios';
import { ICancelTransactionParams } from 'src/typings/global';
import { CANCEL_TRANSACTION_URL } from 'src/api/endpoints';
import { getData, removeData, TRANSACTION_ID } from 'src/asyncstorage';
import { ISaveTransaction } from '@interfaces/I_Save_Transaction';
import { RouteNames } from '@routeNames';
import { resetGetSupplementaryDetailResponse } from '@screens/addSupplementaryInfo/redux/slices/GetSupplementalDetailSlice';
import { resetcreateFatcaInfoResponse } from '@screens/onBoardingProcess/OnBoardingStep4/redux/slices/CreateFatcaInfoSlice';
import { resetGetFatcaInfoResponse } from '@screens/onBoardingProcess/OnBoardingStep4/redux/slices/GetFatcaInfoSlice';
import { resetProductRegistrationResponse } from '@screens/phoneNumberCheck/redux/slices/ProductRegistrationSlice';
import { resetProductAndServiceState } from '@screens/productAndService/redux/slices/ProductAndServiceSlice';
import { setNavigationState } from 'src/redux/slices/navState/NavStateSlice';
import { resetGetTransactionResultResponse } from '@screens/onBoardingProcess/onBoardingSuccess/redux/slices/GetTransactionResultSlice';
import { resetAdditionalGlobalInfo } from 'src/redux/slices/additonalGlobalInfo/AdditionalGlobalInfo';
import { resetVerifyOtpResponse } from '@screens/phoneNumberCheck/redux/slices/VerifyOtpSlice';
import { resetOtpResponse } from '@screens/phoneNumberCheck/redux/slices/SendOtpSlice';
import { resetCheckedAMLInfo } from 'src/redux/slices/checkingAmlGlobalInfo/checkingAmlGlobalInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetMoCResult } from 'src/redux/slices/mocResultInfo/MoCResultInfo';
import { resetSupplementalResult } from '../../slices/mocResultInfo/SupplementalInfo';
import { resetAccountList } from '@screens/productServices/redux/slices/GetAccountListSlice';
import { resetProduct } from '@screens/productServices/redux/slices/GetProductListSlice';
import { resetDigi } from '@screens/productServices/redux/slices/GetDigibankRegisteredInfoSlice';
import { resetCardList } from '@screens/productServices/redux/slices/GetExistingPhysicalCardSlice';
import { resetAddress } from '@screens/productServices/redux/slices/UpdateAddressSlice';
import { resetDebitCardList } from '@screens/productServices/redux/slices/GetRequestedDebitCardSlice';
import { resetDelivery } from '@screens/productServices/redux/slices/UpdateDeliveryInfoSlice';
import { resetAdditional } from '@screens/productServices/redux/slices/UpdateAdditionalInfoSlice';
import { resetGetRegCustomerAccFormResponse } from '@screens/printApplicationForm/redux/slices/GetRegCustomerAccFormSlice';
import { resetGetFatcaInfoFormResponse } from '@screens/printApplicationForm/redux/slices/GetFatcaFormToPrintSlice';
import { resetGetRegDebitAccFormResponse } from '@screens/printApplicationForm/redux/slices/GetDebitAccFormToPrintSlice';
import { resetGetContractFormResponse } from '@screens/reviewETBInformation/redux/slices/getContractFormSlice';
import { resetGetRegDigibankAccFormResponse } from '@screens/printApplicationForm/redux/slices/GetRegEBankFormToPrintSlice';
import { resetSaveMocResponse } from '@screens/customerInformation/redux/slices/SaveMocResultSlice';
import { resetGetEtbFatcaInfoResponse } from '@screens/etbFatcaInformation/redux/slices/GetEtbFatcaInfoSlice';

export const cancelTransaction =
  (param: ICancelTransactionParams, onSuccess: () => void) => async (dispatch: any | undefined) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'post',
        url: CANCEL_TRANSACTION_URL,
        data: param,
      })
        .then((resp) => {
          dispatch(onCancelTransactionSuccess(resp?.data));
          dispatch(setLoading(false));
          onSuccess();
        })
        .catch((error) => {
          dispatch(setLoading(false));
          const _error = {
            data: error?.response?.data || error?.message,
            status: error?.response?.status || error?.status,
          };
          dispatch(onCancelTransactionError(_error));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

export const handleCancelApi =
  (selectedOption: string, navigation: any) => async (dispatch: any | undefined) => {
    try {
      await getData(TRANSACTION_ID).then((t) => {
        if (t !== null) {
          const data: ISaveTransaction = {
            transactionId: t,
            transactionStatus: 'CANCEL',
            reason: selectedOption,
          };
          dispatch(resetProduct());
          dispatch(resetDigi());
          dispatch(resetDebitCardList());
          dispatch(resetSaveMocResponse());
          dispatch(resetCardList());
          dispatch(resetAdditional());
          dispatch(resetAccountList());
          dispatch(resetDelivery());
          dispatch(resetAdditional());
          dispatch(resetSupplementalResult());
          dispatch(resetGetSupplementaryDetailResponse());
          dispatch(resetcreateFatcaInfoResponse());
          dispatch(resetGetFatcaInfoResponse());
          dispatch(resetProductRegistrationResponse());
          dispatch(resetProductAndServiceState());
          dispatch(setNavigationState(null));
          dispatch(resetGetTransactionResultResponse());
          dispatch(resetCheckedAMLInfo());
          dispatch(resetMoCResult());
          dispatch(resetVerifyOtpResponse());
          dispatch(resetAdditionalGlobalInfo());
          dispatch(resetOtpResponse());
          dispatch(resetAddress());
          dispatch(resetGetRegDigibankAccFormResponse());
          dispatch(resetGetRegCustomerAccFormResponse());
          dispatch(resetGetFatcaInfoFormResponse());
          dispatch(resetGetRegDebitAccFormResponse());
          dispatch(resetGetContractFormResponse());
          dispatch(resetGetRegDigibankAccFormResponse());
          dispatch(resetGetEtbFatcaInfoResponse());

          dispatch(
            cancelTransaction(data, () => {
              removeData(TRANSACTION_ID);
              getData(TRANSACTION_ID).then((data) => {
                AsyncStorage.setItem(`face_image${data}`, JSON.stringify([])).catch(() => {
                  //
                });
              });
              getData(TRANSACTION_ID).then((data) => {
                AsyncStorage.setItem(`clickedPictures${data}`, JSON.stringify([])).catch(() => {
                  // console.log('Failed to update images in AsyncStorage:', error);
                });
              });
              if (navigation != null) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: RouteNames.home.name }],
                });
              }
            })
          );
        }
      });
    } catch (error) {
      //
    }
  };

export const clearCacheTransaction =
  (navigation: any, transactionID: string) => async (dispatch: any) => {
    try {
      dispatch(resetProduct());
      dispatch(resetDigi());
      dispatch(resetDebitCardList());
      dispatch(resetSaveMocResponse());
      dispatch(resetCardList());
      dispatch(resetAdditional());
      dispatch(resetAccountList());
      dispatch(resetDelivery());
      dispatch(resetAdditional());
      dispatch(resetSupplementalResult());
      dispatch(resetGetSupplementaryDetailResponse());
      dispatch(resetcreateFatcaInfoResponse());
      dispatch(resetGetFatcaInfoResponse());
      dispatch(resetProductRegistrationResponse());
      dispatch(resetProductAndServiceState());
      dispatch(setNavigationState(null));
      dispatch(resetGetTransactionResultResponse());
      dispatch(resetCheckedAMLInfo());
      dispatch(resetMoCResult());
      dispatch(resetVerifyOtpResponse());
      dispatch(resetAdditionalGlobalInfo());
      dispatch(resetOtpResponse());
      dispatch(resetAddress());
      dispatch(resetGetRegCustomerAccFormResponse());
      dispatch(resetGetFatcaInfoFormResponse());
      dispatch(resetGetRegDebitAccFormResponse());
      dispatch(resetGetContractFormResponse());
      dispatch(resetGetRegDigibankAccFormResponse());
      dispatch(resetGetEtbFatcaInfoResponse());
      removeData(transactionID);
      AsyncStorage.setItem(`face_image${transactionID}`, JSON.stringify([])).catch(() => {
        //
      });
      AsyncStorage.setItem(`clickedPictures${transactionID}`, JSON.stringify([])).catch(() => {
        // console.log('Failed to update images in AsyncStorage:', error);
      });
      if (navigation != null) {
        navigation.reset({
          index: 0,
          routes: [{ name: RouteNames.home.name }],
        });
      }
    } catch (error) {
      //
    }
  };
