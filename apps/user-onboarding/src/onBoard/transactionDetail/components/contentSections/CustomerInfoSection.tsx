import React from 'react';
import ContentSection from '../common/ContentSection';
import CustomerInfoMocSubSection from './CustomerInfoMocSubSection';
import CustomerInfoAdditionalSubSection from './CustomerInfoAdditionalSubSection';
import CustomerInfoImageSubSection from './CustomerInfoImageSubSection';
import { SideBarItemID } from '@screens/transactionDetail/typings';

type Props = {
  sideBarItemID: Extract<
    SideBarItemID,
    'customer_info' | 'customer_info_moc' | 'customer_info_addition' | 'customer_info_image'
  >;
};

const CustomerInfoSection = ({ sideBarItemID }: Props) => {
  return (
    <ContentSection title="Thông tin khách hàng">
      {(sideBarItemID === 'customer_info' || sideBarItemID === 'customer_info_moc') && (
        <CustomerInfoMocSubSection />
      )}
      {(sideBarItemID === 'customer_info' || sideBarItemID === 'customer_info_addition') && (
        <CustomerInfoAdditionalSubSection />
      )}
      {(sideBarItemID === 'customer_info' || sideBarItemID === 'customer_info_image') && (
        <CustomerInfoImageSubSection />
      )}
    </ContentSection>
  );
};

export default CustomerInfoSection;
