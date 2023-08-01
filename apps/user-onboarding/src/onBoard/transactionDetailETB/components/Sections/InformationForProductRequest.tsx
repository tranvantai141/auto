import {
  ProductServicesRegistrationInterface,
  SideBarItemID,
} from '@screens/transactionDetailETB/types';
import React from 'react';
import { translate } from '../../assets/translations/translate';
import ContentSection from '../common/ContentSection';
import CurrentAccountSubSection from './CurrentAccountSubSection';
import DebitCardSubSection from './DebitCardSubSection';
import EBankingSubSection from './EBankingSubSection';
import EDebitCardSubSection from './EDebitCardSubSection';
import { EmptyDebitCardSubSection } from './EmptyDebitCardSubSection';

type Props = {
  sideBarItemID: SideBarItemID;
  data?: ProductServicesRegistrationInterface;
};

const InformationForProductRequest = ({ sideBarItemID, data }: Props) => {
  const currentAccountData = data?.openingAccount;
  const eBankingData = data?.digiBank;
  const eDebitCardData = data?.electricDebitCard;
  const debitCardData = data?.physicalDebitCard;
  const existingVNDaccount = currentAccountData?.existingAccounts?.filter(
    (item) => item?.accountCurrency === 'VND'
  );
  const openingVNDaccount = currentAccountData?.currentAccounts?.filter(
    (item) => item?.accountCurrency === 'VND'
  );
  const isVNDAccountExist =
    (existingVNDaccount && existingVNDaccount?.length > 0) ||
    (openingVNDaccount && openingVNDaccount?.length > 0);
  const isOpen052EdebitCard =
    eBankingData?.ebankingRequested &&
    isVNDAccountExist &&
    !eDebitCardData?.hasInternationalEDigiCardExisted;
  const isShowCurrentAccount =
    currentAccountData?.openAccountRequested &&
    (sideBarItemID === 'product_info_current_account' || sideBarItemID === 'product_info');
  const isShowEBanking =
    (sideBarItemID === 'product_info_ebank' || sideBarItemID === 'product_info') &&
    eBankingData?.ebankingRequested;
  const isShowEDebitCard =
    (sideBarItemID === 'product_info_debit_ecard' || sideBarItemID === 'product_info') &&
    (eDebitCardData?.debitCardRequested || isOpen052EdebitCard);
  const isShowDebitCard =
    (sideBarItemID === 'product_info_debit_card' || sideBarItemID === 'product_info') &&
    debitCardData?.debitCardRequested;

  function titles(sideBarItemID: string) {
    if (sideBarItemID === 'product_info_debit_card') {
      return translate('pi_debit_card_title');
    } else if (sideBarItemID === 'product_info_debit_ecard') {
      return translate('pi_debit_ecard_title');
    } else if (sideBarItemID === 'product_info_ebank') {
      return translate('pi_ebank_title');
    } else if (sideBarItemID === 'product_info_current_account') {
      return translate('pi_current_account_title');
    } else {
      return translate('product_info_title');
    }
  }

  return (
    <ContentSection title={titles(sideBarItemID)}>
      {isShowCurrentAccount && (
        <CurrentAccountSubSection data={currentAccountData} currentAccountID={sideBarItemID} />
      )}
      {isShowEBanking && (
        <EBankingSubSection
          data={eBankingData}
          showShowEbanking={isShowEBanking}
          eBankingID={sideBarItemID}
        />
      )}
      {isShowEDebitCard && (
        <EDebitCardSubSection
          data={eDebitCardData}
          eDebitCardID={sideBarItemID}
          isOpen052EdebitCard={isOpen052EdebitCard}
        />
      )}
      {isShowDebitCard ? (
        <DebitCardSubSection data={debitCardData} debitCardID={sideBarItemID} />
      ) : sideBarItemID === 'product_info_debit_card' ? (
        <EmptyDebitCardSubSection />
      ) : (
        ''
      )}
    </ContentSection>
  );
};

export default InformationForProductRequest;
