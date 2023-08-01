import React, { useState } from 'react';
import GeneralInfoItem from '../common/GeneralInfoItem';
import { translate } from '../../assets/translations/translate';
import SubSection from '../common/SubSection';
import InfoItem from '../common/InfoItem';
import StatusChip from '../common/StatusChip';
import { StyleSheet } from 'react-native';
import { transaction_detail } from '@screens/transactionDetailETB/assets/dummyData/dummyData';
import Colors from '@screens/transactionDetailETB/assets/Colors';

const ProductInfoPhysicalCardSubSection = () => {
  const [expandedIDs, setExpandedIDs] = useState<string[]>([]);

  const _info = transaction_detail?.informationForProductRequest?.debitCarts;
  const info = Array.isArray(_info) ? _info : [];

  if (info.length === 0) {
    return null;
  }

  return (
    <>
      <SubSection
        title={translate('pi_debit_card_title')}
        contentContainerStyle={Styles.mainContainer}
      >
        {info.map((item, index) => (
          <SubSection
            key={index}
            style={Styles.itemSubSectionstyle}
            contentContainerStyle={Styles.subSectionContentContainer}
          >
            <React.Fragment key={index}>
              <InfoItem title={item.productName} />
              {item.status.length !== 0 && (
                <GeneralInfoItem
                  leftRightRatio="1:1"
                  left={
                    <GeneralInfoItem.Label
                      label={translate('pi_debit_card_status')}
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
                      <StatusChip status="red" title="Loi" />
                    ) : null
                  }
                />
              )}
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
                  right={<GeneralInfoItem.Value value={item.cardType} />}
                />
                <GeneralInfoItem
                  leftRightRatio="1:1"
                  left={
                    <GeneralInfoItem.Label
                      label={translate('pi_debit_card_distribute')}
                      labelLeftStyle={Styles.leftLabel}
                    />
                  }
                  right={
                    <GeneralInfoItem.Value
                      value={item.issueType === 'REGULAR' ? 'Thông thường' : 'Phát hành nhanh'}
                    />
                  }
                />
                <GeneralInfoItem
                  leftRightRatio="1:1"
                  left={
                    <GeneralInfoItem.Label
                      label={translate('pi_debit_card_distribute_pay')}
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
                      label={translate('pi_debit_card_secondary_account')}
                      labelLeftStyle={Styles.leftLabel}
                    />
                  }
                  right={<GeneralInfoItem.Value value={item.secondaryAcctNo} />}
                />
                <GeneralInfoItem
                  leftRightRatio="1:1"
                  left={
                    <GeneralInfoItem.Label
                      label={translate('pi_debit_card_fee')}
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
                      label={translate('pi_debit_card_3d_secure')}
                      labelLeftStyle={Styles.leftLabel}
                    />
                  }
                  right={<GeneralInfoItem.Value value={item.isRegisterOtpEmail ? 'Có' : 'Không'} />}
                />
                <GeneralInfoItem
                  leftRightRatio="1:1"
                  left={
                    <GeneralInfoItem.Label
                      label={translate('pi_debit_card_3d_secure_email')}
                      labelLeftStyle={Styles.leftLabel}
                    />
                  }
                  right={<GeneralInfoItem.Value value={item.otpEmail} />}
                />
                <GeneralInfoItem
                  leftRightRatio="1:1"
                  left={
                    <GeneralInfoItem.Label
                      label={translate('pi_debit_card_membership_code')}
                      labelLeftStyle={Styles.leftLabel}
                    />
                  }
                  right={
                    <GeneralInfoItem.Value
                      value={
                        item.affiliateMembershipCode !== '' ? item.affiliateMembershipCode : '-'
                      }
                    />
                  }
                />
                <GeneralInfoItem
                  leftRightRatio="1:1"
                  left={
                    <GeneralInfoItem.Label
                      label={translate('pi_debit_card_pick_up_point')}
                      labelLeftStyle={Styles.leftLabel}
                    />
                  }
                  right={<GeneralInfoItem.Value value={item?.address || ''} />}
                />
              </SubSection.HidableSection>
            </React.Fragment>
          </SubSection>
        ))}
      </SubSection>
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
export default ProductInfoPhysicalCardSubSection;
