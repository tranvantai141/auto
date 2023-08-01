import Colors from '@screens/transactionDetailETB/assets/Colors';
import { CardInterface } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HelperManager from 'src/common/utils/HelperManager';
import { translate } from '../../assets/translations/translate';
import GeneralInfoItem from '../common/GeneralInfoItem';
import InfoItem from '../common/InfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import { validStatus } from './CurrentAccountSubSection';

type Props = {
  data?: CardInterface;
  debitCardID?: string;
};
const DebitCardSubSection = (props: Props) => {
  const { data } = props;
  const [expandedIDs, setExpandedIDs] = useState<string[]>([]);
  const info = data?.debitCarts ?? [];

  const removeLeadingZero = (s: string) => {
    if (s.length > 3 && s.slice(0, 3) === '000') return s.substring(3);
    else return s;
  };
  return (
    <>
      <SubSection
        title={props?.debitCardID === 'product_info' ? translate('pi_debit_card_title') : ''}
        contentContainerStyle={Styles.mainContainer}
      >
        {info.map((item, index) => (
          <SubSection
            key={index}
            style={Styles.itemSubSectionstyle}
            contentContainerStyle={Styles.subSectionContentContainer}
          >
            <React.Fragment key={index}>
              <InfoItem title={item.productName ?? ''} />
              {item?.status && validStatus.includes(item?.status ?? '') && (
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
                      <View style={{ marginVertical: 5 }}>
                        <StatusChip status="red" title="Lỗi" style={{ width: 30 }} />
                        <Text style={Styles.errorText}>
                          {item?.errorCode + ' - ' + item?.errorMessage}
                        </Text>
                      </View>
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
                  right={<GeneralInfoItem.Value value={item?.type ? item?.type : ''} />}
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
                      value={item?.issueType === 'REGULAR' ? 'Thông thường' : 'Phát hành nhanh'}
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
                  right={
                    <GeneralInfoItem.Value
                      value={
                        item?.existingPrimaryAcctRequested
                          ? removeLeadingZero(item?.primaryAcctNo ?? '')
                          : !item?.primaryAcctNo?.length
                          ? 'Tài khoản mở mới'
                          : removeLeadingZero(item?.primaryAcctNo ?? '')
                      }
                    />
                  }
                />
                <GeneralInfoItem
                  leftRightRatio="1:1"
                  left={
                    <GeneralInfoItem.Label
                      label={translate('pi_debit_card_secondary_account')}
                      labelLeftStyle={Styles.leftLabel}
                    />
                  }
                  right={
                    <GeneralInfoItem.Value
                      value={
                        !item?.subAccounts
                          ? 'Không'
                          : !item?.existingSecondaryAcctRequested
                          ? item?.secondaryAcctNo && item?.secondaryAcctNo?.length
                            ? removeLeadingZero(item?.secondaryAcctNo ?? '')
                            : 'Tài khoản mở mới'
                          : removeLeadingZero(item?.secondaryAcctNoRequested ?? '')
                      }
                    />
                  }
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
                  right={<GeneralInfoItem.Value value={item?.otpEmail ? item?.otpEmail : ''} />}
                />
                {item?.productType && ['048', '448', '047', '447'].includes(item?.productType) && (
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
                        value={item?.affiliateMembershipCode ? item?.affiliateMembershipCode : '-'}
                      />
                    }
                  />
                )}

                {HelperManager.isValid(data?.cardDeliveryDetail?.detailedAddress) && (
                  <GeneralInfoItem
                    leftRightRatio="1:1"
                    left={
                      <GeneralInfoItem.Label
                        label={translate('pi_debit_card_pick_up_point')}
                        labelLeftStyle={Styles.leftLabel}
                      />
                    }
                    right={
                      <GeneralInfoItem.Value
                        value={data?.cardDeliveryDetail?.detailedAddress ?? ''}
                      />
                    }
                  />
                )}
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
  errorText: {
    color: Colors.error_red,
    maxWidth: 550,
    marginTop: 5,
    fontSize: 14,
    fontWeight: '400',
  },
});
export default DebitCardSubSection;
