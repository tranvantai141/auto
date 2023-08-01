import { AppButton } from '@components/Button/AppButton';
import { SideBarItemID } from '@screens/transactionDetail/typings';
import Colors from '@screens/transactionDetailETB/assets/Colors';
import { CustommerInfoSectionProvider } from '@screens/transactionDetailETB/contexts/CustommerInfoSectionContext';
import { useTransactionDetailETBContext } from '@screens/transactionDetailETB/contexts/TransactionDetailETBContext';
import { CustomerInfoResult } from '@screens/transactionDetailETB/hooks/useEtbCustomerInfoSection';
import { TransactionDetailSummaryResultDTO } from '@screens/transactionDetailETB/types';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomerNotUpdateSupSubSection } from '../NotUpdatedCustomerInfoSection/CustomerNotUpdateSupSubSection';
import { CustommerImageSubSection } from './CustommerImageSubSection';
import { CustommerMoCSubSection } from './CustommerMoCSubSection';
import { CustommerSupSubSection } from './CustommerSupSubSection';

type Props = {
  sideBarItemID: Extract<
    SideBarItemID,
    'customer_info' | 'customer_info_moc' | 'customer_info_addition' | 'customer_info_image'
  >;
  customerInfoResult: CustomerInfoResult | undefined;
  isCustomerInfoUpdated: boolean;
  summaryData: TransactionDetailSummaryResultDTO;
};

export function CustommerInfoSection({
  sideBarItemID,
  customerInfoResult,
  isCustomerInfoUpdated,
}: Props) {
  const [selectedButton, setSelectedButton] = useState<'updated' | 'old'>('updated');
  const { isMuntipleCif } = useTransactionDetailETBContext();
  const infoOld = customerInfoResult?.IdCardInfoResult?.idCardInfoList.filter(
    (item) => item.type === 'EXISTING'
  );
  const renderSwitchButton = useCallback(() => {
    if (!isCustomerInfoUpdated || isMuntipleCif) {
      return null;
    }

    return (
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <AppButton
          style={styles[`switch_button_${selectedButton === 'updated' ? 'enabled' : 'disabled'}`]}
          textStyles={
            styles[`switch_button_text_${selectedButton === 'updated' ? 'enabled' : 'disabled'}`]
          }
          type="outline"
          onPress={() => {
            setSelectedButton('updated');
          }}
        >
          Thông tin cập nhật
        </AppButton>
        <View style={{ width: 8 }} />
        <AppButton
          style={styles[`switch_button_${selectedButton === 'old' ? 'enabled' : 'disabled'}`]}
          textStyles={
            styles[`switch_button_text_${selectedButton === 'old' ? 'enabled' : 'disabled'}`]
          }
          type="outline"
          onPress={() => {
            setSelectedButton('old');
          }}
        >
          Thông tin cũ
        </AppButton>
      </View>
    );
  }, [isCustomerInfoUpdated, selectedButton, isMuntipleCif]);

  const renderMoCSection = useCallback(() => {
    const isSideBarMoCActice =
      sideBarItemID === 'customer_info' || sideBarItemID === 'customer_info_moc';

    if (!isSideBarMoCActice) {
      return null;
    }

    // if (!isCustomerInfoUpdated && infoOld && infoOld.length === 1) {
    //   return <CustomerNotUpdateMoCSubSection />;
    // }

    return (
      <CustommerMoCSubSection
        idCardInfoResult={customerInfoResult?.IdCardInfoResult}
        compareInfoResult={customerInfoResult?.compareInfoResult}
        supInfoResult={customerInfoResult?.supInfo}
        isCustomerInfoUpdated={isCustomerInfoUpdated}
      />
    );
  }, [
    customerInfoResult?.IdCardInfoResult,
    customerInfoResult?.compareInfoResult,
    customerInfoResult?.supInfo,
    isCustomerInfoUpdated,
    sideBarItemID,
  ]);

  const renderSupSection = useCallback(() => {
    const isSideBarSupActice =
      sideBarItemID === 'customer_info' || sideBarItemID === 'customer_info_addition';

    if (!isSideBarSupActice) {
      return null;
    }

    if (!isCustomerInfoUpdated) {
      return <CustomerNotUpdateSupSubSection data={customerInfoResult} />;
    }

    return <CustommerSupSubSection data={customerInfoResult?.supInfo} />;
  }, [customerInfoResult, isCustomerInfoUpdated, sideBarItemID]);

  const renderImageSection = useCallback(() => {
    const isSideBarImageActice =
      sideBarItemID === 'customer_info' || sideBarItemID === 'customer_info_image';

    if (!isSideBarImageActice) {
      return null;
    }

    if (!isCustomerInfoUpdated) {
      return null;
    }

    return (
      <CustommerImageSubSection idCardImageResponse={customerInfoResult?.idCardImageResponse} />
    );
  }, [customerInfoResult?.idCardImageResponse, isCustomerInfoUpdated, sideBarItemID]);

  return (
    <CustommerInfoSectionProvider
      value={{
        selectedButton: selectedButton,
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 6 }}>
            Thông tin khách hàng
          </Text>
          {infoOld &&
            infoOld.map((item, index) => {
              if (infoOld.length > 1) {
                return (
                  <Text
                    style={{ fontSize: 16, fontWeight: '400', marginBottom: 16 }}
                    key={item.idNumber}
                  >
                    Số CIF {index + 1}: {item.cifNumber + ' - ' + item.fullName ?? ''}
                  </Text>
                );
              } else {
                return (
                  <Text
                    style={{ fontSize: 16, fontWeight: '400', marginBottom: 16 }}
                    key={item.idNumber}
                  >
                    Số CIF: {item.cifNumber ?? ''}
                  </Text>
                );
              }
            })}
          {/* <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 16 }}>
            Số CIF: {summaryData.cifNumber ?? '-'}
          </Text> */}
        </View>
        {renderSwitchButton()}
      </View>
      <>
        {renderMoCSection()}
        {!isMuntipleCif && renderSupSection()}
        {!isMuntipleCif && renderImageSection()}
      </>
    </CustommerInfoSectionProvider>
  );
}

const styles = StyleSheet.create({
  switch_button_enabled: {
    borderColor: Colors.app_green,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  switch_button_disabled: {
    borderColor: Colors.placeholder_grey,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  switch_button_text_enabled: {
    color: Colors.app_green,
    fontSize: 14,
  },
  switch_button_text_disabled: {
    color: Colors.app_black,
    fontSize: 14,
  },
});
