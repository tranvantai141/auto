import { AxiosError } from 'axios';
import axiosTokenInstance from 'src/service/network/axios';
import {
  onRegisterOpenAccountError,
  onRegisterProductAndServiceSuccess,
} from '../slices/RegisterProductAndServiceSlice';
import { saveEBankRegisteredPInfo, setLoading } from '../slices/ProductAndServiceSlice';

import {
  REGISTER_DEBIT_CARD,
  REGISTER_DEBIT_CARD_DELIVERY,
  REGISTER_EBANKING,
  REGISTER_OPEN_ACCOUNT,
  PREPARING_DATA,
} from '@screens/productAndService/api/endpoints';
import {
  IRegisterDebit,
  IRegisterEBankning,
  IRegisterOpeAccount,
} from '@screens/productAndService/typings';
import { API_ERROR } from 'src/typings/global';

const fetchData = (param: IRegisterOpeAccount) => {
  return axiosTokenInstance
    .post(REGISTER_OPEN_ACCOUNT, param)
    .then((resp) => {
      return { success: true, data: resp?.data };
    })
    .catch((error: AxiosError) => {
      // const _error = {
      //     data: error?.response?.data || error?.message,
      //     status: error?.response?.status || error?.status, };
      // console.log('ERROR');
      // console.log(error);

      return { success: false, _error: 'ERRR' };
    });
};

const fetchDataDebit = (param: IRegisterOpeAccount) => {
  return axiosTokenInstance
    .post(REGISTER_DEBIT_CARD, param)
    .then((resp) => {
      return { success: true, data: resp?.data };
    })
    .catch((error: AxiosError) => {
      // const _error = {
      //     data: error?.response?.data || error?.message,
      //     status: error?.response?.status || error?.status, };
      // console.log('ERROR');
      // console.log(error);

      return { success: false, _error: 'ERRR' };
    });
};

export const RegisterPrepareDataOnly = (transactionId: any) => async (dispatch: any) => {
  try {
    axiosTokenInstance
      .post(PREPARING_DATA, { transactionId: transactionId })
      .then((resp) => {
        //
      })
      .catch((error: AxiosError) => {
        dispatch(onRegisterOpenAccountError(formatError(error)));
      });
  } catch (error) {
    //
  }
};
export const RegisterPrepareData =
  (
    params: Array<IRegisterOpeAccount>,
    paramEbanking: IRegisterEBankning,
    paramDebitECard: Array<IRegisterDebit>,
    paramDebitCard: Array<IRegisterDebit>,
    paramCardDeliver: any,
    isReceiverAtHome: boolean,
    isAcceptDebitECard: boolean
  ) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      axiosTokenInstance
        .post(PREPARING_DATA, { transactionId: paramEbanking?.transactionId })
        .then((resp) => {
          // dispatch(onRegisterProductAndServiceSuccess(resp?.data));
          // dispatch(setLoading(false));

          dispatch(
            RegisterOpenAccountRequest(
              params,
              paramEbanking,
              paramDebitECard,
              paramDebitCard,
              paramCardDeliver,
              isReceiverAtHome,
              isAcceptDebitECard
            )
          );
        })
        .catch((error: AxiosError) => {
          dispatch(setLoading(false));
          dispatch(onRegisterOpenAccountError(formatError(error)));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

export const RegisterOpenAccountRequest =
  (
    params: Array<IRegisterOpeAccount>,
    paramEbanking: IRegisterEBankning,
    paramDebitECard: Array<IRegisterDebit>,
    paramDebitCard: Array<IRegisterDebit>,
    paramCardDeliver: any,
    isReceiverAtHome: boolean,
    isAcceptDebitECard: boolean
  ) =>
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));

      Promise.all(params.map(fetchData))
        .then((resp) => {
          // console.log(resp)
          if (!resp[0]?.success ?? false) {
            dispatch(setLoading(false));
            // TODO: Fix any type
            dispatch(onRegisterOpenAccountError((resp ?? '') as any));
          } else {
            // dispatch(setLoading(false));
            // dispatch(onRegisterProductAndServiceSuccess(resp));

            RegisterEbankingRequest(
              paramEbanking,
              paramDebitECard,
              paramDebitCard,
              paramCardDeliver,
              isReceiverAtHome,
              isAcceptDebitECard,
              dispatch
            );
          }
        })
        .catch((e) => {
          dispatch(setLoading(false));
          dispatch(onRegisterOpenAccountError(e[0] ?? ''));
        });
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

export const RegisterEbankingRequest = (
  params: IRegisterEBankning,
  paramDebitECard: Array<IRegisterDebit>,
  paramDebitCard: Array<IRegisterDebit>,
  paramCardDeliver: any,
  isReceiverAtHome: boolean,
  isAcceptDebitECard: boolean,
  dispatch: any
) => {
  try {
    // dispatch(setLoading(true));

    axiosTokenInstance
      .post(REGISTER_EBANKING, params)
      .then((resp) => {
        // dispatch(onExistenceResponse(resp?.data));
        dispatch(setLoading(false));
        if (params != null) {
          dispatch(
            saveEBankRegisteredPInfo({
              phone: params?.digibankPhone,
              email: params?.digibankEmail,
            })
          );
        } else {
          dispatch(saveEBankRegisteredPInfo(null));
        }
        if (isAcceptDebitECard) {
          if (paramDebitECard?.length > 0)
            RegisterDebitECardRequest(
              paramDebitECard,
              paramDebitCard,
              paramCardDeliver,
              isReceiverAtHome,
              dispatch
            );
          else {
            if (paramDebitCard.length > 0)
              RegisterDebitCardRequest(
                paramDebitCard,
                paramCardDeliver,
                isReceiverAtHome,
                dispatch
              );
            else dispatch(onRegisterProductAndServiceSuccess(resp));
          }
        } else if (paramDebitCard.length > 0)
          RegisterDebitCardRequest(paramDebitCard, paramCardDeliver, isReceiverAtHome, dispatch);
        else dispatch(onRegisterProductAndServiceSuccess(resp));

        // RegisterDebitECardRequest(paramDebitECard , paramDebitCard , dispatch);
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        dispatch(saveEBankRegisteredPInfo(null));
        // dispatch(onExistenceError(error));
      });
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(saveEBankRegisteredPInfo(null));
  }
};

export const RegisterDebitECardRequest = (
  params: Array<IRegisterDebit>,
  paramDebitCard: Array<IRegisterDebit>,
  paramCardDeliver: any,
  isReceiverAtHome: boolean,
  dispatch: any
) => {
  try {
    dispatch(setLoading(true));
    // TODO: Fix any type
    Promise.all(params.map(fetchDataDebit as any))
      .then((resp) => {
        // TODO: Fix any type
        if (!(resp[0] as any)?.success ?? false) {
          dispatch(setLoading(false));
          // TODO: Fix any type
          dispatch(onRegisterOpenAccountError((resp ?? '') as any));

          // RegisterDebitCardRequest(paramDebitCard , dispatch);
        } else {
          if (paramDebitCard.length > 0)
            RegisterDebitCardRequest(paramDebitCard, paramCardDeliver, isReceiverAtHome, dispatch);
          else dispatch(onRegisterProductAndServiceSuccess(resp));

          dispatch(setLoading(false));
        }
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(onRegisterOpenAccountError(e[0] ?? ''));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const RegisterDebitCardRequest = (
  params: Array<IRegisterDebit>,
  paramCardDeliver: any,
  isReceiverAtHome: boolean,
  dispatch: any
) => {
  try {
    dispatch(setLoading(true));
    // TODO: Fix any type
    Promise.all(params.map(fetchDataDebit as any))
      .then((resp) => {
        // TODO: Fix any type
        if (!(resp[0] as any)?.success ?? false) {
          dispatch(setLoading(false));
          // TODO: Fix any type
          dispatch(onRegisterOpenAccountError((resp ?? '') as any));
        } else {
          //If receiver at home
          if (!isReceiverAtHome) RegisterDebitCardDelivery(paramCardDeliver, dispatch);
          else dispatch(onRegisterProductAndServiceSuccess(resp));

          dispatch(setLoading(false));
        }
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(onRegisterOpenAccountError(e[0] ?? ''));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};

const RegisterDebitCardDelivery = (param: any, dispatch: any) => {
  try {
    // console.log('RegisterDebitCardDelivery');

    dispatch(setLoading(true));
    axiosTokenInstance
      .post(REGISTER_DEBIT_CARD_DELIVERY, param)
      .then((resp) => {
        dispatch(onRegisterProductAndServiceSuccess(resp?.data));
        dispatch(setLoading(false));
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        dispatch(onRegisterOpenAccountError(formatError(error)));
      });
  } catch (error) {
    dispatch(setLoading(false));
  }
};

function formatError(error: AxiosError): API_ERROR | undefined {
  return {
    data: error?.response?.data || error?.message || 'Unknown error',
    status: error?.response?.status || 500,
  };
}
