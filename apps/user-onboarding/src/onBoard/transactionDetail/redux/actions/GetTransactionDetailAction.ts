import { TransactionModel } from '@screens/transactionDetail/typings';
import {
  onGetTransactionDetailRequestError,
  onGetTransactionDetailRequestSuccess,
  onRetrySuccess,
  resetGetTransactionDetailState,
  setModalErrorMessage,
} from '../slices/GetTransactionDetailSlice';
import axiosTokenInstance from 'src/service/network/axios';
import {
  detail_transaction,
  manual_contract,
  mark_cif_as_manual,
  retry_cif,
  retry_cif_doc_and_id_image,
  retry_contract,
} from '@screens/transactionDetail/api/endpoints';
import { AxiosError } from 'axios';
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';

export const getTransactionDetail = (transactionId: string) => (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    // const response = await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(require('src/dummyContent/transactionDetailV2.json').transaction);
    //     // reject({ status: 1 } as API_ERROR);
    //   }, 1000);
    // });
    // dispatch(onGetTransactionDetailRequestSuccess(response as TransactionModel));
    axiosTokenInstance({
      method: 'post',
      url: `${detail_transaction}`,
      data: { transactionId },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        dispatch(
          onGetTransactionDetailRequestSuccess(response.data.transaction as TransactionModel)
        );
      })
      .catch((error: AxiosError) => {
        const _error = {
          data: error?.response?.data || error?.message,
          status: error?.response?.status || error?.status,
        };
        dispatch(onGetTransactionDetailRequestError(_error));
      });
  } catch (error: any) {
    dispatch(onGetTransactionDetailRequestError(error));
  }
};

export const resetTransactionDetail = () => async (dispatch: any) => {
  dispatch(resetGetTransactionDetailState());
};

export const dismissModalErrorMessage = () => async (dispatch: any) => {
  dispatch(setModalErrorMessage(null));
};

export const retryCif =
  (params: {
    transactionId: string;
    requestType: 'RETRY' | 'TRIGGER' | 'MANUAL';
    itemType: 'CIF' | 'ACCOUNT' | 'DIGIBANK' | 'CARD';
    itemId: string;
  }) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'post',
        url: retry_cif,
        data: params,
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          dispatch(onRetrySuccess(response?.data));
          dispatch(getTransactionDetail(params.transactionId));
        })
        .catch((error: AxiosError<any, any>) => {
          dispatch(setLoading(false));
          if (
            error?.response?.data?.errorCode === '501501' ||
            error?.response?.data?.errorCode === 'cifNumberExisting'
          ) {
            dispatch(setModalErrorMessage('Số CIF đã tồn tại'));
            return;
          }
          dispatch(setModalErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau!'));
        });
    } catch (error: any) {
      dispatch(setLoading(false));
      dispatch(setModalErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau!'));
    }
  };

export const retryCifDoc =
  ({ transactionId, typeRetry }: { transactionId: string; typeRetry: 'CONTACT' | 'ID_IMAGE' }) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'post',
        url: retry_cif_doc_and_id_image,
        data: {
          transactionId,
          createContactRetry: typeRetry === 'CONTACT',
          addImageRetry: typeRetry === 'ID_IMAGE',
        },
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          dispatch(onRetrySuccess(response?.data));
          dispatch(getTransactionDetail(transactionId));
        })
        .catch(() => {
          dispatch(setLoading(false));
          dispatch(setModalErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau!'));
        });
    } catch (error: any) {
      dispatch(setLoading(false));
      dispatch(setModalErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau!'));
    }
  };

export const markCifAsManual =
  (transactionId: string, type: 'OPEN_CIF' | 'CONTACT' | 'IMAGE') => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance({
        method: 'post',
        url: mark_cif_as_manual,
        data: {
          transactionId,
          openCifManual: type === 'OPEN_CIF',
          createContactManual: type === 'CONTACT',
          addImageManual: type === 'IMAGE',
        },
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          dispatch(onRetrySuccess(response?.data));
          dispatch(getTransactionDetail(transactionId));
        })
        .catch(() => {
          dispatch(setLoading(false));
          dispatch(setModalErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau!'));
        });
    } catch (error: any) {
      dispatch(setLoading(false));
      dispatch(setModalErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau!'));
    }
  };

export const retryContract = (transactionId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: retry_contract,
      data: {
        transactionId,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        dispatch(onRetrySuccess(response?.data));
        dispatch(getTransactionDetail(transactionId));
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(setModalErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau!'));
      });
  } catch (error: any) {
    dispatch(setLoading(false));
    dispatch(setModalErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau!'));
  }
};

export const markContractAsManualHandle = (transactionId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    axiosTokenInstance({
      method: 'post',
      url: manual_contract,
      data: {
        transactionId,
      },
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        dispatch(onRetrySuccess(response?.data));
        dispatch(getTransactionDetail(transactionId));
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(setModalErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau!'));
      });
  } catch (error: any) {
    dispatch(setLoading(false));
    dispatch(setModalErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau!'));
  }
};
