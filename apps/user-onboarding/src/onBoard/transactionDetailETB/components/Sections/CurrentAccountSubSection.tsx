import React from 'react';
import { translate } from '../../assets/translations/translate';
import GeneralInfoItem from '../common/GeneralInfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@screens/transactionDetailETB/assets/Colors';
import { AccountInterface } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
export const validStatus = ['PROCESSING', 'SUCCESS', 'MANUAL', 'PENDING', 'ERROR'];
type Props = {
  data?: AccountInterface;
  currentAccountID?: string;
};
const CurrentAccountSubSection = (props: Props) => {
  const { data } = props;
  const currentAccountList = data?.currentAccounts ?? [];
  return (
    <>
      <SubSection
        title={
          props?.currentAccountID === 'product_info' ? translate('pi_current_account_title') : ''
        }
        contentContainerStyle={Styles.mainContainer}
      >
        {currentAccountList
          .filter((item) => (item.status ?? '').length > 0)
          .map((item, index) => (
            <SubSection
              key={index}
              style={Styles.itemSubSectionstyle}
              contentContainerStyle={Styles.subSectionContentContainer}
            >
              <GeneralInfoItem
                left={
                  <GeneralInfoItem.Label
                    label={translate('pi_current_account_type')}
                    labelLeftStyle={Styles.leftLabel}
                  />
                }
                right={
                  <GeneralInfoItem.Value
                    value={item.productName ?? item.productCode ?? ''}
                    valueRightStyle={Styles.rightValue}
                  />
                }
              />
              <GeneralInfoItem
                left={
                  <GeneralInfoItem.Label
                    label={translate('pi_current_account_number')}
                    labelLeftStyle={Styles.leftLabel}
                  />
                }
                right={
                  <GeneralInfoItem.Value
                    value={item?.accountNumber ?? '-'}
                    valueRightStyle={Styles.rightValue}
                  />
                }
              />
              {validStatus.includes(item?.status ?? '') && (
                <GeneralInfoItem
                  left={
                    <GeneralInfoItem.Label
                      label={translate('pi_current_account_status')}
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
                      <View style={Styles.valueContainer}>
                        <StatusChip status="red" title={'Lỗi'} />
                        {item?.errorCode && item.errorMessage ? (
                          <>
                            <View style={{ height: 8 }} />
                            <Text
                              style={{ color: Colors.error_red, fontSize: 14, fontWeight: '400' }}
                            >
                              {`${item?.errorCode ?? ''} - ${item.errorMessage ?? ''}` || ''}
                            </Text>
                          </>
                        ) : (
                          ''
                        )}
                      </View>
                    ) : null
                  }
                />
              )}
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
  valueContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  leftLabel: { fontSize: 14, fontWeight: '600' },
  rightValue: { fontSize: 14, fontWeight: '400' },
});
export default CurrentAccountSubSection;
