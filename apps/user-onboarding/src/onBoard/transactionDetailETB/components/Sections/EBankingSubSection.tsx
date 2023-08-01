import React from 'react';
import { translate } from '../../assets/translations/translate';
import GeneralInfoItem from '../common/GeneralInfoItem';
import InfoItem from '../common/InfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@screens/transactionDetailETB/assets/Colors';
import { DigiInterface } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import { validStatus } from './CurrentAccountSubSection';

type Props = {
  data?: DigiInterface;
  showShowEbanking?: boolean;
  eBankingID?: string;
};
const EBankingSubSection = (props: Props) => {
  const { data, showShowEbanking } = props;
  const info = data?.electronicBanking;
  const isSMSBankingRegistered = data?.isRegisterPhoneBanking === true;
  const isPhoneBankingRegistered = data?.isRegisterSMSBanking === true;

  return (
    <>
      {showShowEbanking && (
        <SubSection
          title={props?.eBankingID === 'product_info' ? translate('pi_ebank_title') : ''}
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
              right={
                <GeneralInfoItem.Value
                  value={
                    info?.status === 'SUCCESS' ? (info?.mobilePhone ? info?.mobilePhone : '-') : '-'
                  }
                />
              }
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={
                <GeneralInfoItem.Label
                  label={translate('pi_ebank_email')}
                  labelLeftStyle={Styles.leftLabel}
                />
              }
              right={
                <GeneralInfoItem.Value
                  value={info?.status === 'SUCCESS' ? (info?.email ? info?.email : '-') : '-'}
                />
              }
            />
            {validStatus.includes(info?.status ?? '') && (
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
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <StatusChip status="red" title={'Lỗi'} />
                      {info?.errorCode && info.errorMessage ? (
                        <>
                          <View style={{ height: 8 }} />
                          <Text
                            style={{ color: Colors.error_red, fontSize: 14, fontWeight: '400' }}
                          >
                            {`${info?.errorCode ?? ''} - ${info.errorMessage ?? ''}` ?? ''}
                          </Text>
                        </>
                      ) : (
                        ''
                      )}
                    </View>
                  ) : (
                    <StatusChip status="red" title="Không xác định" />
                  )
                }
              />
            )}
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
export default EBankingSubSection;
