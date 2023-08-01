import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Colors from '@screens/transactionDetailETB/assets/Colors';
import { CardInterface } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { translate } from '../../assets/translations/translate';
import GeneralInfoItem from '../common/GeneralInfoItem';
import InfoItem from '../common/InfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import { validStatus } from './CurrentAccountSubSection';

type Props = {
  data?: CardInterface;
  eDebitCardID?: string;
  isOpen052EdebitCard?: boolean;
};

const EDebitCardSubSection = (props: Props) => {
  const { data, isOpen052EdebitCard } = props;
  const [expandedIDs, setExpandedIDs] = useState<string[]>([]);
  const info = data?.debitCarts;
  const removeLeadingZero = (s: string) => {
    if (s.length > 3 && s.slice(0, 3) === '000') return s.substring(3);
    else return s;
  };

  return (
    <SubSection
      title={props?.eDebitCardID === 'product_info' ? translate('pi_debit_ecard_title') : ''}
      contentContainerStyle={Styles.mainContainer}
    >
      <>
        {isOpen052EdebitCard && (
          <View style={Styles.info_view}>
            <Text style={Styles.heading_text}>{'Thẻ Ghi nợ quốc tế phi vật lý VCB DigiCard'}</Text>
            <Text
              style={Styles.info_heading_digi}
            >{`${'Được phát hành mặc định và miễn phí cho khách hàng đăng ký VCB Digibank và có tài khoản thanh toán VND'}`}</Text>
            <GeneralInfoItem
              leftRightRatio="2:1"
              left={<GeneralInfoItem.Label label={'Trạng thái'} />}
              right={<GeneralInfoItem.Value value={'Đã tiếp nhận'} />}
            />
          </View>
        )}
      </>
      {info?.map((item, index) => (
        <React.Fragment key={index}>
          <SubSection
            style={Styles.itemSubSectionstyle}
            contentContainerStyle={Styles.subSectionContentContainer}
          >
            <InfoItem title={item?.productName ?? ''} />

            {validStatus.includes(item?.status ?? '') && (
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
                      {item?.errorCode && (
                        <Text
                          style={{
                            color: Colors.error_red,
                            fontSize: 14,
                            fontWeight: '400',
                          }}
                        >
                          {item?.errorCode}
                          {item?.errorMessage && ' - ' + item?.errorMessage}
                        </Text>
                      )}
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
                right={<GeneralInfoItem.Value value={item.otpEmail ? item?.otpEmail : ''} />}
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
  heading_text: {
    fontSize: hp(1.6),
    fontWeight: '600',
    textAlign: 'left',
  },
  info_view: {
    borderRadius: 8,
    borderColor: Colors.background_color,
    backgroundColor: Colors.background_color,
    padding: hp(1.5),
    marginLeft: wp(0),
    marginBottom: 20,
  },
  info_heading_digi: {
    fontSize: hp(1.6),
    fontWeight: '400',
    textAlign: 'left',
    alignSelf: 'center',
    marginTop: 10,
    lineHeight: 25,
    marginLeft: -5,
  },
});

export default EDebitCardSubSection;
