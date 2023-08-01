import React from 'react';
import { translate } from '../../assets/translations/translate';
import ContentSection from '../common/ContentSection';
import GeneralInfoItem from '../common/GeneralInfoItem';
import StatusChip from '../common/StatusChip';
import { RootState } from 'src/redux/store';
import { useAppSelector } from 'src/redux/hooks';
import { formatFuzzyDate } from 'src/common/utils/fuzzyDateParser';
import { transactionStatusName } from 'src/common/utils/transactionStatusName';

const TransactionDetailSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);

  const { transactionDetail } = response ?? {};

  const processingTime = () => {
    if ((transactionDetail?.createdDate ?? 0) > 0 && (transactionDetail?.endDate ?? 0) > 0) {
      const diff = transactionDetail!.endDate - transactionDetail!.createdDate;
      const seconds = diff / 1000;
      // format to mm:ss
      const minutes = Math.floor(seconds / 60);
      const secondsLeft = Math.floor(seconds % 60);
      // Add leading zero if needed in both minutes and seconds
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
      return `${formattedMinutes}:${formattedSeconds}`;
    }
    return '';
  };

  if (!transactionDetail) {
    return null;
  }

  return (
    <ContentSection title="Thông tin giao dịch">
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_id')} />}
        right={<GeneralInfoItem.Value value={transactionDetail.transactionId} />}
      />
      {transactionDetail.transactionStatus.length > 0 && (
        <GeneralInfoItem
          left={<GeneralInfoItem.Label label={translate('transaction_info_label_status')} />}
          right={
            transactionDetail.transactionStatus === 'COMPLETE' ||
            transactionDetail.transactionStatus === 'SUCCESS' ? (
              <StatusChip
                status="green"
                title={transactionStatusName[transactionDetail.transactionStatus]}
              />
            ) : transactionDetail.transactionStatus === 'MANUAL' ? (
              <StatusChip
                status="purple"
                title={transactionStatusName[transactionDetail.transactionStatus]}
              />
            ) : transactionDetail.transactionStatus === 'SUBMITTED' ||
              transactionDetail.transactionStatus === 'PENDING' ? (
              <StatusChip
                status="blue"
                title={transactionStatusName[transactionDetail.transactionStatus]}
              />
            ) : transactionDetail.transactionStatus === 'FAIL' ||
              transactionDetail.transactionStatus === 'ERROR' ? (
              <StatusChip
                status="red"
                title={transactionStatusName[transactionDetail.transactionStatus]}
              />
            ) : transactionDetail.transactionStatus === 'CANCEL' ? (
              <StatusChip
                status="yellow"
                title={transactionStatusName[transactionDetail.transactionStatus]}
              />
            ) : transactionDetail.transactionStatus === 'OPEN' ? (
              <StatusChip
                status="gray"
                title={transactionStatusName[transactionDetail.transactionStatus]}
              />
            ) : (
              <StatusChip status="gray" title={transactionDetail.transactionStatus} />
            )
          }
        />
      )}
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_type_customer')} />}
        right={
          <GeneralInfoItem.Value
            value={
              transactionDetail.classification === 'NEW TO BANK' || transactionDetail.classification === 'Khách hàng mới'
                ? translate('transaction_info_classification_new_customer')
                : translate('transaction_info_classification_existing_customer')
            }
          />
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_pbo')} />}
        right={<GeneralInfoItem.Value value={transactionDetail.createdBy ?? ''} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_pos')} />}
        right={<GeneralInfoItem.Value value={transactionDetail.departmentName ?? ''} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_branch')} />}
        right={<GeneralInfoItem.Value value={transactionDetail.branchName} />}
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_created_at')} />}
        right={
          <GeneralInfoItem.Value
            value={formatFuzzyDate(transactionDetail.createdDate, 'DD/MM/yyyy HH:mm:ss')}
          />
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_updated_at')} />}
        right={
          <GeneralInfoItem.Value
            value={formatFuzzyDate(transactionDetail.statusChangedDate, 'DD/MM/yyyy HH:mm:ss')}
          />
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_completed')} />}
        right={
          <GeneralInfoItem.Value
            value={formatFuzzyDate(transactionDetail.endDate, 'DD/MM/yyyy HH:mm:ss')}
          />
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_duration')} />}
        right={<GeneralInfoItem.Value value={processingTime()} />}
      />
      {transactionDetail.transactionStatus === 'CANCEL' &&
        transactionDetail.cancellationReason != null &&
        transactionDetail.cancellationReason.length > 0 &&
        transactionDetail.cancellationReason !== '-' && (
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('transaction_info_label_reason')} />}
            right={<GeneralInfoItem.Value value={transactionDetail.cancellationReason} />}
          />
        )}
      {transactionDetail.transactionStatus === 'CANCEL' &&
        transactionDetail.cancellationReason === '-' &&
        (transactionDetail.otherReason ?? '').length > 0 && (
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('transaction_info_label_reason')} />}
            right={<GeneralInfoItem.Value value={transactionDetail.otherReason} />}
          />
        )}
    </ContentSection>
  );
};

export default TransactionDetailSection;
