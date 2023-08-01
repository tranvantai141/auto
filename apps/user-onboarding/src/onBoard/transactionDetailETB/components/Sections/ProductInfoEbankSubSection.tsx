import React from 'react';
import { translate } from '../../assets/translations/translate';
import GeneralInfoItem from '../common/GeneralInfoItem';
import InfoItem from '../common/InfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import { StyleSheet, Text, View } from 'react-native';
import { transaction_detail } from '@screens/transactionDetailETB/assets/dummyData/dummyData';
import Colors from '@screens/transactionDetailETB/assets/Colors';

const ProductInfoEbankSubSection = () => {
  const info = transaction_detail?.informationForProductRequest?.electronicBanking;
  const isSMSBankingRegistered =
    transaction_detail?.informationForProductRequest?.isRegisterSMSBanking ?? false;
  const isPhoneBankingRegistered =
    transaction_detail?.informationForProductRequest?.isRegisterPhoneBanking ?? false;

  const shouldDisableEbanking =
    (info?.mobilePhone ?? '').length === 0 ||
    transaction_detail?.informationForProductRequest?.ebankingRequested === false;

  return (
    <>
      {!shouldDisableEbanking && (
        <SubSection
          title={translate('pi_ebank_title')}
          contentContainerStyle={Styles.mainContainer}
        >
          <SubSection
            style={Styles.itemSubSectionstyle}
            contentContainerStyle={Styles.subSectionContentContainer}
          >
            <InfoItem title={translate('pi_ebank_name')} />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={
                <GeneralInfoItem.Label
                  label={translate('pi_ebank_phone')}
                  labelLeftStyle={Styles.leftLabel}
                />
              }
              right={<GeneralInfoItem.Value value={info?.mobilePhone ?? '-'} />}
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={
                <GeneralInfoItem.Label
                  label={translate('pi_ebank_email')}
                  labelLeftStyle={Styles.leftLabel}
                />
              }
              right={<GeneralInfoItem.Value value={info?.email ?? '-'} />}
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={
                <GeneralInfoItem.Label
                  label={translate('pi_ebank_status')}
                  labelLeftStyle={Styles.leftLabel}
                />
              }
              right={
                info?.status === 'SUCCESS' ? (
                  <StatusChip status="green" title="Thành công" />
                ) : info?.status === 'MANUAL' ? (
                  <StatusChip status="purple" title="Xử lý thủ công" />
                ) : info?.status === 'PENDING' ? (
                  <StatusChip status="yellow" title="Chờ xử lý" />
                ) : info?.status === 'PROCESSING' ? (
                  <StatusChip status="yellow" title="Đang xử lý" />
                ) : info?.status === 'ERROR' || info?.status === 'FAIL' ? (
                  <View>
                    <StatusChip style={{ maxWidth: 20 }} status="red" title="Lỗi" />
                    <Text style={{ color: 'red' }}>999 - Thẻ đã tồn tại</Text>
                  </View>
                ) : (
                  <StatusChip status="red" title="Không xác định" />
                )
              }
            />
          </SubSection>
        </SubSection>
      )}

      {isSMSBankingRegistered && (
        <SubSection>
          <InfoItem title={translate('pi_ebank_sms_banking')} />
        </SubSection>
      )}

      {isPhoneBankingRegistered && (
        <SubSection>
          <InfoItem title={translate('pi_ebank_phone_banking')} />
        </SubSection>
      )}
    </>
  );
};

const Styles = StyleSheet.create({
  mainContainer: {
    minHeight: 86,
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  subSectionStyle: {
    backgroundColor: Colors.gray_10,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
  },
  itemSubSectionstyle: {
    backgroundColor: Colors.gray_10,
    marginBottom: 16,
    borderRadius: 8,
  },
  subSectionContentContainer: {
    minHeight: 86,
    backgroundColor: Colors.gray_10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  leftLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});
export default ProductInfoEbankSubSection;
