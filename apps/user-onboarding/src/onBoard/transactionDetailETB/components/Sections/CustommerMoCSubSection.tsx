import { IconNoteBlue } from '@assets/images';
import { CompareResult, GetSupplementalInfoDTO } from '@screens/customerInfo/typings';
import ContentSection from '@screens/transactionDetail/components/common/ContentSection';
import GeneralInfoItem from '@screens/transactionDetail/components/common/GeneralInfoItem';
import StatusChip from '@screens/transactionDetail/components/common/StatusChip';
import Colors from '@screens/transactionDetailETB/assets/Colors';
import { translate } from '@screens/transactionDetailETB/assets/translations/translate';
import { useCustommerInfoSectionContext } from '@screens/transactionDetailETB/contexts/CustommerInfoSectionContext';
import { useTransactionDetailETBContext } from '@screens/transactionDetailETB/contexts/TransactionDetailETBContext';
import {
  CurrentSupInfoDTO,
  GetTransactionDetailIDCardInfoDTO,
  NewSupInfoDTO,
} from '@screens/transactionDetailETB/types';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatFuzzyDate } from 'src/common/utils/fuzzyDateParser';
import { transactionStatusName } from 'src/common/utils/transactionStatusName';

type Props = {
  idCardInfoResult: GetTransactionDetailIDCardInfoDTO | undefined;
  compareInfoResult: CompareResult[] | undefined;
  supInfoResult:
    | {
        requestUpdateInfo: NewSupInfoDTO | undefined;
        currentInfo: CurrentSupInfoDTO | undefined;
      }
    | undefined;
  isCustomerInfoUpdated: boolean;
};

export function CustommerMoCSubSection({
  idCardInfoResult,
  compareInfoResult,
  supInfoResult,
  isCustomerInfoUpdated,
}: Props) {
  const { selectedButton } = useCustommerInfoSectionContext();
  const { isMuntipleCif } = useTransactionDetailETBContext();
  const infoUpdate = idCardInfoResult?.idCardInfoList.find((item) => item.type === 'UPDATING');
  const infoOld = idCardInfoResult?.idCardInfoList.find((item) => item.type === 'EXISTING');
  const oldSupplementalInfo = supInfoResult?.currentInfo;

  //MARK: Render thông tin cập nhật giấy tờ tuỳ thân

  const renderContentUpdateInfo = useCallback(() => {
    if (!infoUpdate) {
      return null;
    }

    return (
      <>
        {(!isMuntipleCif && compareInfoResult && compareInfoResult.length > 0 && (
          <View style={styles.container_warning}>
            <IconNoteBlue />
            <Text style={styles.text_warning}>
              {translate('transaction_info_label_id_card_warning')}
            </Text>
          </View>
        )) || <View />}

        <View style={{ marginTop: 10, backgroundColor: Colors.gray_10, borderRadius: 8 }}>
          {/* {Họ tên} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('full_name')} />}
            right={<GeneralInfoItem.Value value={infoUpdate.fullName ?? ''} />}
            style={{
              paddingHorizontal: 16,
              backgroundColor: compareInfoResult?.includes('NAME')
                ? Colors.green_10
                : Colors.gray_10,
            }}
          />
          {/* {Ngày sinh} */}
          {/* infoUpdate.dob */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('dob')} />}
            right={
              <GeneralInfoItem.Value value={formatFuzzyDate(infoUpdate.dob ?? '', 'DD/MM/YYYY')} />
            }
            style={{
              paddingHorizontal: 16,
              backgroundColor: compareInfoResult?.includes('BIRTHDATE')
                ? Colors.green_10
                : Colors.gray_10,
            }}
          />

          {/* {Giới tính} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('sex')} />}
            right={<GeneralInfoItem.Value value={infoUpdate.gender ?? ''} />}
            style={{
              paddingHorizontal: 16,
              backgroundColor: compareInfoResult?.includes('GENDER')
                ? Colors.green_10
                : Colors.gray_10,
            }}
          />
          {/* {Đặc điểm nhận dạng} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('Supplemental_Information')} />}
            right={<GeneralInfoItem.Value value={infoUpdate.ddnd ?? ''} />}
            style={{ paddingHorizontal: 16 }}
          />
          {/* {Số CCCD} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('cccd_num')} />}
            right={<GeneralInfoItem.Value value={infoUpdate.idNumber ?? ''} />}
            style={{
              paddingHorizontal: 16,
              backgroundColor: compareInfoResult?.includes('ID_NO')
                ? Colors.green_10
                : Colors.gray_10,
            }}
          />
          {/* {Số CMND} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('id_num')} />}
            right={<GeneralInfoItem.Value value={infoUpdate.oldIdNumber ?? ''} />}
            style={{ paddingHorizontal: 16 }}
          />
          {/* {Ngày cấp} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('date_range')} />}
            right={
              <GeneralInfoItem.Value
                value={formatFuzzyDate(infoUpdate.validDate ?? '', 'DD/MM/YYYY')}
              />
            }
            style={{
              paddingHorizontal: 16,
              backgroundColor: compareInfoResult?.includes('ISSUE_DATE')
                ? Colors.green_10
                : Colors.gray_10,
            }}
          />
          {/* {Có giá trị đến} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('limited_date')} />}
            right={
              <GeneralInfoItem.Value
                value={
                  infoUpdate.formattedExpiredDate === 'Không thời hạn'
                    ? 'Không thời hạn'
                    : formatFuzzyDate(infoUpdate.expiredDate ?? '', 'DD/MM/YYYY')
                }
              />
            }
            style={{
              paddingHorizontal: 16,
              backgroundColor: compareInfoResult?.includes('EXPIRED_DATE')
                ? Colors.green_10
                : Colors.gray_10,
            }}
          />
          {/* {Nơi cấp} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={'Nơi cấp'} />}
            right={<GeneralInfoItem.Value value={infoUpdate.issuePlaceDescription ?? ''} />}
            style={{
              paddingHorizontal: 16,
              backgroundColor: compareInfoResult?.includes('ISSUE_PLACE')
                ? Colors.green_10
                : Colors.gray_10,
            }}
          />
          {/* {Quốc tịch} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('nationality')} />}
            right={<GeneralInfoItem.Value value={infoUpdate.nationality ?? ''} />}
            style={{
              paddingHorizontal: 16,
              backgroundColor: compareInfoResult?.includes('NATIONALITY')
                ? Colors.green_10
                : Colors.gray_10,
            }}
          />
          {/* {Quê quán} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('home_town')} />}
            right={<GeneralInfoItem.Value value={infoUpdate.hometown ?? ''} />}
            style={{
              paddingHorizontal: 16,
              backgroundColor: compareInfoResult?.includes('HOME_TOWN')
                ? Colors.green_10
                : Colors.gray_10,
            }}
          />
          {/* {Nơi thường trú} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('residence')} />}
            right={<GeneralInfoItem.Value value={infoUpdate.resident ?? ''} />}
            style={{ paddingHorizontal: 16, borderBottomWidth: 0 }}
          />
        </View>
        {/* {Địa chỉ hiện tại} */}
        {(((infoUpdate.currentAddress &&
          isCustomerInfoUpdated &&
          idCardInfoResult?.updateIdCardInfoStatus != 'NOT_REGISTERED') ||
          (!isCustomerInfoUpdated &&
            infoOld &&
            oldSupplementalInfo?.currentAddress &&
            oldSupplementalInfo?.currentAddress !== '')) && (
          // infoOld.currentAddress &&
          // infoOld.currentAddress !== ''
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('current_address')} />}
            right={
              <GeneralInfoItem.Value
                value={
                  isCustomerInfoUpdated
                    ? infoUpdate.currentAddress ?? ''
                    : oldSupplementalInfo?.currentAddress ?? ''
                }
              />
            }
            style={{
              marginTop: 10,
              borderBottomWidth: 1,
            }}
          />
        )) || <View />}

        {/* {Trạng thái} */}
        {(idCardInfoResult?.updateIdCardInfoStatus !== 'NOT_REGISTERED' &&
          idCardInfoResult?.updateIdCardInfoStatus !== 'REGISTERED' && (
            <GeneralInfoItem
              left={<GeneralInfoItem.Label label={translate('update_status')} />}
              right={
                idCardInfoResult?.updateIdCardInfoStatus === 'COMPLETE' ||
                idCardInfoResult?.updateIdCardInfoStatus === 'SUCCESS' ? (
                  <StatusChip
                    status="green"
                    title={transactionStatusName[idCardInfoResult?.updateIdCardInfoStatus]}
                  />
                ) : idCardInfoResult?.updateIdCardInfoStatus === 'MANUAL' ? (
                  <StatusChip
                    status="purple"
                    title={transactionStatusName[idCardInfoResult?.updateIdCardInfoStatus]}
                  />
                ) : idCardInfoResult?.updateIdCardInfoStatus === 'SUBMITTED' ||
                  idCardInfoResult?.updateIdCardInfoStatus === 'PROCESSING' ||
                  idCardInfoResult?.updateIdCardInfoStatus === 'PENDING' ? (
                  <StatusChip
                    status="blue"
                    title={transactionStatusName[idCardInfoResult?.updateIdCardInfoStatus]}
                  />
                ) : idCardInfoResult?.updateIdCardInfoStatus === 'FAIL' ||
                  idCardInfoResult?.updateIdCardInfoStatus === 'FAILED' ||
                  idCardInfoResult?.updateIdCardInfoStatus === 'ERROR' ? (
                  <View style={styles.valueContainer}>
                    <StatusChip status="red" title={'Lỗi'} />
                    {idCardInfoResult?.updateIdCardInfoCode &&
                    idCardInfoResult.updateIdCardInfoMessage ? (
                      <>
                        <View style={{ height: 8 }} />
                        <Text style={{ color: Colors.error_red, fontSize: 14, fontWeight: '400' }}>
                          {`${idCardInfoResult?.updateIdCardInfoCode ?? ''} - ${
                            idCardInfoResult.updateIdCardInfoMessage ?? ''
                          }` || ''}
                        </Text>
                      </>
                    ) : (
                      ''
                    )}
                  </View>
                ) : idCardInfoResult?.updateIdCardInfoStatus === 'CANCEL' ? (
                  <StatusChip
                    status="yellow"
                    title={transactionStatusName[idCardInfoResult?.updateIdCardInfoStatus]}
                  />
                ) : idCardInfoResult?.updateIdCardInfoStatus === 'OPEN' ? (
                  <StatusChip
                    status="gray"
                    title={transactionStatusName[idCardInfoResult?.updateIdCardInfoStatus]}
                  />
                ) : (
                  <StatusChip
                    status="gray"
                    title={idCardInfoResult?.updateIdCardInfoStatus ?? ''}
                  />
                )
              }
              style={{ borderBottomWidth: 0 }}
            />
          )) || <View />}
      </>
    );
  }, [
    compareInfoResult,
    idCardInfoResult?.updateIdCardInfoCode,
    idCardInfoResult?.updateIdCardInfoMessage,
    idCardInfoResult?.updateIdCardInfoStatus,
    infoOld,
    infoUpdate,
    isCustomerInfoUpdated,
    isMuntipleCif,
    oldSupplementalInfo?.currentAddress,
  ]);

  //MARK: render thông tin cũ

  const renderContentOldInfo = useCallback(() => {
    if (!infoOld || !infoUpdate) {
      return null;
    }
    return (
      <>
        <View style={{ marginTop: 10, backgroundColor: Colors.gray_10, borderRadius: 8 }}>
          {/* {Họ tên} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('full_name')} />}
            right={<GeneralInfoItem.Value value={infoOld.fullName ?? ''} />}
            style={{ paddingHorizontal: 16 }}
          />
          {/* {Ngày sinh} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('dob')} />}
            right={
              <GeneralInfoItem.Value value={formatFuzzyDate(infoOld.dob ?? '', 'DD/MM/YYYY')} />
            }
            style={{ paddingHorizontal: 16 }}
          />
          {/* {Giới tính} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('sex')} />}
            right={<GeneralInfoItem.Value value={infoOld.gender ?? ''} />}
            style={{ paddingHorizontal: 16 }}
          />

          {/* {Số CCCD} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('cccd_num')} />}
            right={<GeneralInfoItem.Value value={infoOld.idNumber ?? ''} />}
            style={{ paddingHorizontal: 16 }}
          />

          {/* {Ngày cấp} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('date_range')} />}
            right={
              <GeneralInfoItem.Value
                value={formatFuzzyDate(infoOld.validDate ?? '', 'DD/MM/YYYY')}
              />
            }
            style={{ paddingHorizontal: 16 }}
          />
          {/* {Có giá trị đến} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('limited_date')} />}
            right={
              <GeneralInfoItem.Value
                value={
                  infoOld.formattedExpiredDate === 'Không thời hạn'
                    ? 'Không thời hạn'
                    : formatFuzzyDate(infoOld.expiredDate ?? '', 'DD/MM/YYYY')
                }
              />
            }
            style={{ paddingHorizontal: 16 }}
          />
          {/* {Nơi cấp} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={'Nơi cấp'} />}
            right={<GeneralInfoItem.Value value={infoOld.issuePlaceDescription ?? ''} />}
            style={{ paddingHorizontal: 16 }}
          />
          {/* {Quốc tịch} */}
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('nationality')} />}
            right={<GeneralInfoItem.Value value={infoOld.nationality ?? ''} />}
            style={{ paddingHorizontal: 16, borderBottomWidth: 0 }}
          />
        </View>

        {/* {Địa chỉ hiện tại} */}
        {(infoOld.currentAddress &&
          idCardInfoResult?.updateIdCardInfoStatus != 'NOT_REGISTERED' && (
            <GeneralInfoItem
              left={<GeneralInfoItem.Label label={translate('current_address')} />}
              right={<GeneralInfoItem.Value value={infoOld.currentAddress ?? ''} />}
              style={{ marginTop: 10, borderBottomWidth: 0 }}
            />
          )) || <View />}
      </>
    );
  }, [idCardInfoResult?.updateIdCardInfoStatus, infoOld, infoUpdate]);

  return (
    <ContentSection title="Thông tin giấy tờ tuỳ thân">
      {/* <Text>{`CustommerMoCSubSection - ${selectedButton} data`}</Text> */}
      {selectedButton === 'updated' ? renderContentUpdateInfo() : renderContentOldInfo()}
    </ContentSection>
  );
}

const styles = StyleSheet.create({
  container_warning: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_warning: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.blue_70,
    marginLeft: 8,
  },
  valueContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
