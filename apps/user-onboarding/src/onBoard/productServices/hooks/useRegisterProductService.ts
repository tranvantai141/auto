import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import { useMoCResult } from '@screens/customerInfo/hooks/useMoCResult';
import {
  REGISTER_DEBIT_CARD,
  REGISTER_OPEN_ACCOUNT,
} from '@screens/productAndService/api/endpoints';
import { prepareProductService, registerEBanking } from '@screens/productServices/api/endpoints';
import {
  Debit_Card_Requested,
  IRegisterEBankning,
  ResultMessageData,
} from '@screens/productServices/typings';
import { AccountDetails } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import axiosTokenInstance from 'src/service/network/axios';
import { useConfirmModal } from '../../../hooks/useConfirmModal';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

type Ebanking = { eBankinng: IRegisterEBankning; isReg: boolean , registered : boolean };

function useProcessProductService() {
  const { showConfirmModal, showAlertModal } = useConfirmModal();
  const getPhoneEBankingSlice = useAppSelector((state: RootState) => state.getPhoneEBankingSlice);

  const [isLoading, setIsLoading] = useState(false);

  function formatError(error: AxiosError): ResultMessageData {
    return {
      message: error?.response?.data || error?.message || 'Unknown error',
      errCode: error?.response?.status || 500,
      errData: undefined,
    };
  }

  const fetchData = (param: AccountDetails) => {
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

        throw { success: false, _error: 'ERRR' };
      });
  };

  const fetchDataDebit = (param: ISaveDebitCard, transactionID: string) => {
    const newParam: Debit_Card_Requested = {
      transactionId: transactionID,
      primaryAcctNo: '',
      secondaryAcctNo: '',
      productType: param?.cardProductType,
      productName: param?.cardProductName,
      currency: param?.currency,
      cardBin: param?.bin,
      isSubCard: false,
      cardProductId: param?.cardProductId,
      embossName: '',
      mailingStreet: '',
      mailingCity: '',
      mailingDistrict: '',
      mailingProvince: '',
      channel: '',
      issueFeePayment: param?.issueFeePayment,
      issueType: param?.issueType,
      cardType: param?.cardType,
      subAccounts: param?.subAccounts,
      affiliateMembershipCode: param?.affiliateMembershipCode,
      feesReceivable: param?.feesReceivable,
      isRegisterOtpEmail: false,
      otpEmail: param?.otpEmail,
      status: '',
      existingPrimaryAcctRequested: param?.existingPrimaryAcctRequested,
      primaryAcctNoRequested: param?.primaryAcctNoRequested,
      primaryCurrencyRequested: param?.primaryCurrencyRequested,
      existingSecondaryAcctRequested: param?.existingSecondaryAcctRequested,
      secondaryAcctNoRequested: param?.secondaryAcctNoRequested,
      secondaryCurrencyRequested: param?.secondaryCurrencyRequested,
    };

    return axiosTokenInstance
      .post(REGISTER_DEBIT_CARD, newParam)
      .then((resp) => {
        return { success: true, data: resp?.data };
      })
      .catch((error: AxiosError) => {
        // const _error = {
        //     data: error?.response?.data || error?.message,
        //     status: error?.response?.status || error?.status, };
        // console.log('ERROR');
        // console.log(error);

        throw { success: false, _error: 'ERRR' };
      });
  };

  const processProductService = useCallback(
    async (
      transactionID: string,
      requestedAccount: AccountDetails[],
      eBanking: Ebanking,
      listECard: Array<ISaveDebitCard>,
      listDebitCard: Array<ISaveDebitCard>
    ) => {
      setIsLoading(true);

      let resultData: ResultMessageData;

      // console.log(getPhoneEBankingSlice)

      // //Error phone number register
      // if (getPhoneEBankingSlice?.error ?? false) {
      //   setIsLoading(false);
      //   return;
      // }

      try {
        // prepare data
        // const prepareResponse = await prepareProductService(transactionID);


        //register open account
        const requestAccountResponse = await Promise.all(requestedAccount.map(fetchData));

        let requestDigiBankResponse = null;
        let requestECardResponse = null;

        //register ebanking
        if (eBanking?.isReg ?? false) {
          requestDigiBankResponse = await registerEBanking(eBanking?.eBankinng);
        }

        //register ebanking
        if (
          (eBanking?.isReg ?? false) ||
          (eBanking?.registered ?? false)
        ) {
          // register e-DebitCard
          requestECardResponse = await Promise.all(
            listECard?.map((ecard) => fetchDataDebit(ecard, transactionID))
          );
        }

        //register e-DebitCard
        //  requestECardResponse = await Promise.all(listECard?.map(ecard => fetchDataDebit(ecard,transactionID)))
        // console.log('E-Card =============> : ',requestECardResponse)

        //register Debit Card
        const requestDebitCardResponse = await Promise.all(
          listDebitCard?.map((ecard) => fetchDataDebit(ecard, transactionID))
        );

        resultData = {
          message: 'SUCCESS',
          errCode: 0,
          errData: undefined,
        };

        setIsLoading(false);
        return resultData;
      } catch (Exception: any) {
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

  return [isLoading, processProductService] as const;
}

export default useProcessProductService;
