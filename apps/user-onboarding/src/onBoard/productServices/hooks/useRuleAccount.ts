import { useCallback, useState } from 'react';
import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { AccountDetails } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import {
  addRequestedDebitCardList,
  updateRequestedDebitCardList,
} from '@screens/productServices/redux/slices/GetRequestedDebitCardSlice';



function useRuleAccount() {

  const requetedDebitCardList = useAppSelector((state: RootState) => state.requestedDebitCardSlice.response);
  const accountListData = useAppSelector((state: RootState) => state.getAccountList.response);
  const dispatch = useAppDispatch();


  const [newOpenDebitCard , setNewOpenDebitCard] = useState<ISaveDebitCard>()


  const numberOpenAccount = (debit : ISaveDebitCard) => {
    if((!debit?.existingSecondaryAcctRequested && debit?.subAccounts) && !debit?.existingPrimaryAcctRequested ) return 2;
    if((!debit?.existingSecondaryAcctRequested && debit?.subAccounts) || !debit?.existingPrimaryAcctRequested ) return 1;
    return 0;
  }

  const compare2Number = (number1 : number , number2 : number) => {
     return number1-number2 >= 0 ? true : false;
  }

  const processRegisterDebitCard = useCallback( () => {
      try {
          const newDebitCardData = requetedDebitCardList?.filter((debit : ISaveDebitCard) => {

            const currency = debit?.cardProduct === '86' ? 'VND,USD' :  debit?.currency;
            const accountWithCurrency = accountListData?.openAccounts?.filter((account : AccountDetails) => currency.includes(account?.currency));

            return compare2Number(accountWithCurrency?.length ?? 0 , numberOpenAccount(debit));


          });

        dispatch(updateRequestedDebitCardList(newDebitCardData));

      } catch (Exception : any) {

      }

    },
    [requetedDebitCardList , accountListData]
  );

  return [newOpenDebitCard , processRegisterDebitCard] as const;
}

export default useRuleAccount;
