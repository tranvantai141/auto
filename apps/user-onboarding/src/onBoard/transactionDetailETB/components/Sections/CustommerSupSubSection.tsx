import ContentSection from '@screens/transactionDetail/components/common/ContentSection';
import GeneralInfoItem from '@screens/transactionDetail/components/common/GeneralInfoItem';
import { useCustommerInfoSectionContext } from '@screens/transactionDetailETB/contexts/CustommerInfoSectionContext';
import React from 'react';
import { translate } from '../../assets/translations/translate';
import SubSection from '@screens/transactionDetail/components/common/SubSection';
import {
  CurrentSupInfoDTO,
  NewSupInfoDTO,
  SupItemDTO,
  SupItemStatus,
} from '@screens/transactionDetailETB/types';
import StatusChip from '@screens/transactionDetail/components/common/StatusChip';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../assets/Colors';
import { GetSupplementalInfoDTO } from '@screens/customerInfo/typings';
import { RowValue } from '@screens/customerInfo/components/SuplementaryInfoSection';

const statusName: Record<SupItemStatus, string> = {
  SUCCESS: 'Thành công',
  FAILED: 'Lỗi',
  ERROR: 'Lỗi',
  REGISTERED: 'Đã đăng ký',
  MANUAL: 'Xử lý thủ công',
  PROCESSING: 'Đang xử lý',
  CANCELLED: 'Đã hủy',
  PENDING: 'Chờ xử lý',
  NOT_REGISTERED: 'Không đăng ký',
};

// new type from GetTransactionDetailSupInfoDTO without code and message
const fieldMapTranslation: Record<keyof NewSupInfoDTO, string> = {
  mobile_phone: 'sup_info_mobile',
  landline_phone: 'sup_info_landline',
  email: 'sup_info_email',
  occupation: 'sup_info_occupation',
  job_title: 'sup_info_job_title',
};

export function CustommerSupSubSection({
  data,
}: {
  data?:
    | {
        requestUpdateInfo: NewSupInfoDTO | undefined;
        currentInfo: CurrentSupInfoDTO | undefined;
      }
    | undefined;
}) {

  const { selectedButton } = useCustommerInfoSectionContext();

  if (selectedButton === 'updated') {
    return <UpdatedInfoView data={data?.requestUpdateInfo} />;
  }

  if (selectedButton === 'old') {

    return <OldInfo currentDataInfo={data?.currentInfo} updateDataInfo={data?.requestUpdateInfo} />;
  }

  return null;
}

function UpdatedInfoView({ data }: { data?: NewSupInfoDTO }) {
  if (data == null) {
    return null;
  }

  const renderValueView = (
    field: keyof NewSupInfoDTO,
    item: SupItemDTO | undefined
  ) => {
    if (item == null || item.code === 'CANCELLED') {
      return null;
    }

    if (field === 'occupation' || field === 'job_title') {
      return <Text style={{ fontSize: 16 }}>{item.value ?? ''}</Text>;
    }
    if (item.code == null) {
      return null;
    }
    const statusTitle = statusName[item.code];

    if (item.code === 'SUCCESS') {
      return (
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{item.value ?? ''}</Text>
          <StatusChip status="green" title={statusTitle} />
        </View>
      );
    }

    if (item.code === 'REGISTERED') {
      return <Text style={{ fontSize: 16 }}>{item.value ?? ''}</Text>;
    }

    if (item.code === 'MANUAL') {
      return (
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{item.value ?? ''}</Text>
          <StatusChip status="purple" title={statusTitle} />
        </View>
      );
    }

    if (item.code === 'PROCESSING') {
      return (
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{item.value ?? ''}</Text>
          <StatusChip status="yellow" title={statusTitle} />
        </View>
      );
    }

    if (item.code === 'ERROR') {
      return (
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{item.value ?? ''}</Text>
          <StatusChip status="red" title={statusTitle} />
          <View style={{ height: 4 }} />
          <Text style={{ color: Colors.error_red, fontSize: 14, fontWeight: '400' }}>
            {item?.message ?? ''}
          </Text>
        </View>
      );
    }

    return null;
  };

  const displayedFields: (keyof NewSupInfoDTO)[] = (function () {
    // Create array from TransactionDetailSupInfoDTO type, not data
    const fields = Object.keys(fieldMapTranslation) as (keyof NewSupInfoDTO)[];

    return fields.filter((field) => {
      const value = data[field];
      if (value == null) {
        return false;
      }
      if (value.is_request_update === false) {
        return false;
      }
      return true;
    });
  })();

  return (
    <ContentSection title={translate('sup_info_title')}>
      <SubSection styleContent={{ minHeight: displayedFields.length > 0 ? 0 : 84 }}>
        {displayedFields.map((field) => {
          if (data[field]?.code !== 'NOT_REGISTERED') {
            return (
              <GeneralInfoItem
                key={field}
                left={<GeneralInfoItem.Label label={translate(fieldMapTranslation[field])} />}
                right={renderValueView(field, data[field])}
              />
            );
          }
        })}
      </SubSection>
    </ContentSection>
  );
}

function OldInfo({
  currentDataInfo,
  updateDataInfo,
}: {
  currentDataInfo?: CurrentSupInfoDTO;
  updateDataInfo?: NewSupInfoDTO;
}) {

  if (currentDataInfo == null || updateDataInfo == null) {
    return null;
  }
  
  const displayedData: Record<keyof NewSupInfoDTO, string[]> = (function () {
    const newPhoneSeqNo = updateDataInfo?.mobile_phone?.currentSeqNo ?? '0';
    const newLandlinePhone = updateDataInfo?.landline_phone?.currentSeqNo ?? '0';
    const newEmail = updateDataInfo?.email?.currentSeqNo ?? '0';
    const mobilePhones = currentDataInfo?.currentMobilePhones?.filter((item) => item.currentSeqNo !== newPhoneSeqNo)
                                                       .map((item) => item.contactValue)
                                                       .sort((a, b) => parseFloat(b.currentSeqNo) - parseFloat(a.currentSeqNo)) ?? ['-'];
    const landlinePhones = currentDataInfo?.currentLandPhones?.filter((item) => item.currentSeqNo !== newLandlinePhone)
                                                         .map((item) => item.contactValue)
                                                         .sort((a, b) => parseFloat(b.currentSeqNo) - parseFloat(a.currentSeqNo)) ?? ['-'];
    const emails = currentDataInfo?.currentEmails?.filter((item) => item.currentSeqNo !== newEmail)
                                                 .map((item) => item.contactValue)
                                                 .sort((a, b) => parseFloat(b.currentSeqNo) - parseFloat(a.currentSeqNo)) ?? ['-'];

    
    const occupations = currentDataInfo.currentOccupation ?? '-';
    const displayedOccupation =
      occupations === 'Khác' ? [`Khác (${currentDataInfo.otherCurrentOccupation})`] : [occupations];

    const jobTitles = currentDataInfo.jobTitle ?? '-';
    const displayedJobTitle =
      jobTitles === 'Khác' ? [`Khác (${currentDataInfo.otherJobTitle})`] : [jobTitles];

    return {
      mobile_phone: mobilePhones,
      landline_phone: landlinePhones,
      email: emails,
      occupation: displayedOccupation,
      job_title: displayedJobTitle,
    };
  })();
  const displayedFields: (keyof NewSupInfoDTO)[] = (function () {
    // Create array from TransactionDetailSupInfoDTO type, not data
    const fields = Object.keys(fieldMapTranslation) as (keyof NewSupInfoDTO)[];

    return fields.filter((field) => {
      const value = updateDataInfo[field];

      if (value == null) {
        return false;
      }
      if (value.is_request_update === false) {
        return false;
      }
      return true;
    });
  })();
  return (
    <ContentSection title={translate('sup_info_title')}>
      <SubSection styleContent={{ minHeight: displayedFields.length > 0 ? 0 : 84 }}>
        {displayedFields.map((field) => {
          return (
            <GeneralInfoItem
              key={field}
              left={<GeneralInfoItem.Label label={translate(fieldMapTranslation[field])} />}
              right={<RowValue value={displayedData[field]} isError={false} />}
            />
          );
        })}
      </SubSection>
    </ContentSection>
  );
}

const styles = StyleSheet.create({
  valueContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  valueText: {
    marginBottom: 8,
    fontSize: 16,
  },
});
