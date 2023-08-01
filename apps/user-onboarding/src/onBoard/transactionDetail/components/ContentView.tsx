import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../assets/Colors';
import { SideBarItemID } from '../typings';
import ComplianceInfoSection from './contentSections/ComplianceInfoSection';
import CustomerInfoSection from './contentSections/CustomerInfoSection';
import FormSection from './contentSections/FormSection';
import ProductInfoSection from './contentSections/ProductInfoSection';
import TermSection from './contentSections/TermSection';
import TransactionDetailSection from './contentSections/TransactionDetailSection';

type Props = {
  sideBarItemID: SideBarItemID;
};

const ContentView = ({ sideBarItemID }: Props) => {
  return (
    <ScrollView style={Styles.scrollContainer}>
      {sideBarItemID === 'transaction_info' && <TransactionDetailSection />}

      {(sideBarItemID === 'customer_info' ||
        sideBarItemID === 'customer_info_moc' ||
        sideBarItemID === 'customer_info_addition' ||
        sideBarItemID === 'customer_info_image') && (
        <CustomerInfoSection sideBarItemID={sideBarItemID} />
      )}

      {sideBarItemID === 'compliance_info' && <ComplianceInfoSection />}

      {(sideBarItemID === 'product_info' ||
        sideBarItemID === 'product_info_customer_file' ||
        sideBarItemID === 'product_info_current_account' ||
        sideBarItemID === 'product_info_ebank' ||
        sideBarItemID === 'product_info_debit_ecard' ||
        sideBarItemID === 'product_info_debit_card') && (
        <ProductInfoSection sideBarItemID={sideBarItemID} />
      )}

      {sideBarItemID === 'terms_info' && <TermSection />}
      {sideBarItemID === 'document' && <FormSection />}
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.light_grey,
    padding: 20,
  },
});

export default ContentView;
