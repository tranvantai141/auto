import { SideBarItemID } from '@screens/transactionDetail/typings';
import React from 'react';
import ContentSection from '../common/ContentSection';
import ProductInfoCurrentAccountSubSection from './ProductInfoCurrentAccountSubSection';
import ProductInfoCustomerFileSubSection from './ProductInfoCustomerFileSubSection';
import ProductInfoEbankSubSection from './ProductInfoEbankSubSection';
import ProductInfoEcardSubSection from './ProductInfoEcardSubSection';
import ProductInfoPhysicalCardSubSection from './ProductInfoPhysicalCardSubSection';
import { translate } from '@screens/transactionDetail/assets/translations/translate';

type Props = {
  sideBarItemID: Extract<
    SideBarItemID,
    | 'product_info'
    | 'product_info_customer_file'
    | 'product_info_current_account'
    | 'product_info_ebank'
    | 'product_info_debit_ecard'
    | 'product_info_debit_card'
  >;
};

const ProductInfoSection = ({ sideBarItemID }: Props) => {
  return (
    <ContentSection title={translate('product_info_title')}>
      {(sideBarItemID === 'product_info' || sideBarItemID === 'product_info_customer_file') && (
        <ProductInfoCustomerFileSubSection />
      )}
      {(sideBarItemID === 'product_info' || sideBarItemID === 'product_info_current_account') && (
        <ProductInfoCurrentAccountSubSection />
      )}
      {(sideBarItemID === 'product_info' || sideBarItemID === 'product_info_ebank') && (
        <ProductInfoEbankSubSection />
      )}
      {(sideBarItemID === 'product_info' || sideBarItemID === 'product_info_debit_ecard') && (
        <ProductInfoEcardSubSection />
      )}
      {(sideBarItemID === 'product_info' || sideBarItemID === 'product_info_debit_card') && (
        <ProductInfoPhysicalCardSubSection />
      )}
    </ContentSection>
  );
};

export default ProductInfoSection;
