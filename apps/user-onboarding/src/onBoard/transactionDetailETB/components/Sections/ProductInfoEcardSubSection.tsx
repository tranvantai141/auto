import React, { useState } from 'react';
import { translate } from '../../assets/translations/translate';
import GeneralInfoItem from '../common/GeneralInfoItem';
import InfoItem from '../common/InfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import { StyleSheet, Text, View } from 'react-native';
import { transaction_detail } from '@screens/transactionDetailETB/assets/dummyData/dummyData';
import Colors from '@screens/transactionDetailETB/assets/Colors';

const ProductInfoEcardSubSection = () => {
  const [expandedIDs, setExpandedIDs] = useState<string[]>([]);

  const info = transaction_detail?.informationForProductRequest?.electronicDebitCart;

  if (info.length === 0) {
    return null;
  }
  return (
    <SubSection
      title={translate('pi_debit_ecard_title')}
      contentContainerStyle={Styles.mainContainer}
    >
      {info.map((item, index) => (
        <React.Fragment key={index}>
          <SubSection
            style={Styles.itemSubSectionstyle}
            contentContainerStyle={Styles.subSectionContentContainer}
          >
            <InfoItem title={item.productName} />

            <GeneralInfoItem
              leftRightRatio="1:1"
              left={
                <GeneralInfoItem.Label
                  label={translate('pi_debit_ecard_status')}
                  labelLeftStyle={Styles.leftLabel}
                />
              }
              right={
                item.status === 'SUCCESS' ? (
                  <StatusChip status="green" title="Thành công" />
                ) : item.status === 'MANUAL' ? (
                  <StatusChip status="purple" title="Xử lý thủ công" />
                ) : item.status === 'PENDING' ? (
                  <StatusChip status="yellow" title="Chờ xử lý" />
                ) : item.status === 'PROCESSING' ? (
                  <StatusChip status="blue" title="Đang xử lý" />
                ) : item.status === 'ERROR' ? (
                  <View>
                    <StatusChip
                      style={{ maxWidth: 20, marginBottom: 8 }}
                      status="red"
                      title="Lỗi"
                    />
                    <Text
                      style={{
                        color: Colors.error_red,
                        fontSize: 14,
                        fontWeight: '400',
                      }}
                    >
                      Khách hàng đã có loại thẻ này
                    </Text>
                  </View>
                ) : null
              }
            />
            <SubSection.HidableSection
              expanded={expandedIDs.includes(item.id ?? '')}
              onTogglePressed={() => {
                if (expandedIDs.includes(item.id ?? '')) {
                  setExpandedIDs(expandedIDs.filter((id) => id !== item.id));
                } else {
                  setExpandedIDs([...expandedIDs, item.id ?? '']);
                }
              }}
            >
              <GeneralInfoItem
                leftRightRatio="1:1"
                left={
                  <GeneralInfoItem.Label label={'Card Type'} labelLeftStyle={Styles.leftLabel} />
                }
                right={<GeneralInfoItem.Value value={item.issueFeePayment} />}
              />
              <GeneralInfoItem
                leftRightRatio="1:1"
                left={
                  <GeneralInfoItem.Label
                    label={translate('pi_debit_card_main_account')}
                    labelLeftStyle={Styles.leftLabel}
                  />
                }
                right={<GeneralInfoItem.Value value={item.primaryAcctNo} />}
              />
              <GeneralInfoItem
                leftRightRatio="1:1"
                left={
                  <GeneralInfoItem.Label
                    label={translate('pi_debit_ecard_issue_fee_type')}
                    labelLeftStyle={Styles.leftLabel}
                  />
                }
                right={
                  <GeneralInfoItem.Value
                    value={
                      item.issueFeePayment === 'AUTO_DEBIT'
                        ? 'Tự động ghi nợ tài khoản'
                        : 'Nộp tiền mặt'
                    }
                  />
                }
              />
              <GeneralInfoItem
                leftRightRatio="1:1"
                left={
                  <GeneralInfoItem.Label
                    label={translate('pi_debit_ecard_secondary_account')}
                    labelLeftStyle={Styles.leftLabel}
                  />
                }
                right={<GeneralInfoItem.Value value={item.subAccounts ? 'Có' : 'Không'} />}
              />
              <GeneralInfoItem
                leftRightRatio="1:1"
                left={
                  <GeneralInfoItem.Label
                    label={translate('pi_debit_ecard_fee')}
                    labelLeftStyle={Styles.leftLabel}
                  />
                }
                right={
                  <GeneralInfoItem.Value
                    value={
                      item.feesReceivable != null
                        ? item.feesReceivable.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                            currencyDisplay: 'code',
                          })
                        : '-'
                    }
                  />
                }
              />
              <GeneralInfoItem
                leftRightRatio="1:1"
                left={
                  <GeneralInfoItem.Label
                    label={translate('pi_debit_ecard_3d_secure')}
                    labelLeftStyle={Styles.leftLabel}
                  />
                }
                right={<GeneralInfoItem.Value value={item.isRegisterOtpEmail ? 'Có' : 'Không'} />}
              />
              <GeneralInfoItem
                leftRightRatio="1:1"
                left={
                  <GeneralInfoItem.Label
                    label={translate('pi_debit_ecard_3d_secure_email')}
                    labelLeftStyle={Styles.leftLabel}
                  />
                }
                right={<GeneralInfoItem.Value value={item.otpEmail ?? ''} />}
              />
            </SubSection.HidableSection>
          </SubSection>
        </React.Fragment>
      ))}
    </SubSection>
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
  leftLabel: { fontSize: 14, fontWeight: '600' },
});

export default ProductInfoEcardSubSection;
