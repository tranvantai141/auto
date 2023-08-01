import { translate } from '@screens/transactionDetail/assets/translations/translate';
import ContentSection from '@screens/transactionDetail/components/common/ContentSection';
// import GeneralInfoItem from '@screens/transactionDetail/components/common/GeneralInfoItem';
import StatusChip from '@screens/transactionDetail/components/common/StatusChip';
import { TransactionDetailSummaryResultDTO } from '@screens/transactionDetailETB/types';
import React from 'react';
import { View } from 'react-native';
import { formatFuzzyDate } from 'src/common/utils/fuzzyDateParser';
import { transactionStatusName } from 'src/common/utils/transactionStatusName';
import GeneralInfoItem from '../common/GeneralInfoItem';

type Props = {
  summaryResult: TransactionDetailSummaryResultDTO;
};

export function TransactionSummarySection({ summaryResult }: Props) {
  return (
    <ContentSection title="Thông tin giao dịch">
      {/* {Mã giao dịch} */}
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_id')} />}
        right={<GeneralInfoItem.Value value={summaryResult?.transactionId} />}
      />
      {/* {Trạng thái} */}
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_status')} />}
        right={
          summaryResult.transactionStatus === 'COMPLETE' ||
          summaryResult.transactionStatus === 'SUCCESS' ? (
            <StatusChip
              status="green"
              title={transactionStatusName[summaryResult.transactionStatus]}
            />
          ) : summaryResult.transactionStatus === 'MANUAL' ? (
            <StatusChip
              status="purple"
              title={transactionStatusName[summaryResult.transactionStatus]}
            />
          ) : summaryResult.transactionStatus === 'SUBMITTED' ||
            summaryResult.transactionStatus === 'PENDING' ? (
            <StatusChip
              status="blue"
              title={transactionStatusName[summaryResult.transactionStatus]}
            />
          ) : summaryResult.transactionStatus === 'FAIL' ||
            summaryResult.transactionStatus === 'ERROR' ? (
            <StatusChip
              status="red"
              title={transactionStatusName[summaryResult.transactionStatus]}
            />
          ) : summaryResult.transactionStatus === 'CANCEL' ? (
            <StatusChip
              status="yellow"
              title={transactionStatusName[summaryResult.transactionStatus]}
            />
          ) : summaryResult.transactionStatus === 'OPEN' ? (
            <StatusChip
              status="gray"
              title={transactionStatusName[summaryResult.transactionStatus]}
            />
          ) : (
            <StatusChip status="gray" title={summaryResult.transactionStatus} />
          )
        }
      />
      {/* {Loại khách hàng} */}
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_type_customer')} />}
        right={
          <GeneralInfoItem.Value
            value={
              summaryResult.type === 'NTB'
                ? translate('transaction_info_classification_new_customer')
                : translate('transaction_info_classification_existing_customer')
            }
          />
        }
      />
      {/* {Cán bộ tạo} */}
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_pbo')} />}
        right={<GeneralInfoItem.Value value={summaryResult.staffFullName ?? ''} />}
      />
      {/* {Điểm giao dịch} */}
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_pos')} />}
        right={<GeneralInfoItem.Value value={summaryResult.transactionPointName ?? ''} />}
      />
      {/* {Chi nhánh} */}
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_branch')} />}
        right={<GeneralInfoItem.Value value={summaryResult.userBranchName ?? ''} />}
      />
      {/* {Ngày tạo} */}
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_created_at')} />}
        right={
          <GeneralInfoItem.Value
            value={formatFuzzyDate(summaryResult.createdAt ?? '', 'DD/MM/yyyy HH:mm:ss')}
          />
        }
      />
      {/* {Ngày cập nhật} */}
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_updated_at')} />}
        right={
          <GeneralInfoItem.Value
            value={formatFuzzyDate(summaryResult.updatedAt ?? '', 'DD/MM/yyyy HH:mm:ss')}
          />
        }
      />
      {/* {Ngày hoàn thành} */}
      {((summaryResult.transactionStatus === 'MANUAL' ||
        summaryResult.transactionStatus === 'COMPLETE' ||
        summaryResult.transactionStatus === 'CANCEL') && (
        <GeneralInfoItem
          left={<GeneralInfoItem.Label label={translate('transaction_info_label_completed')} />}
          right={
            <GeneralInfoItem.Value
              value={formatFuzzyDate(summaryResult.updatedAt ?? '', 'DD/MM/yyyy HH:mm:ss')}
            />
          }
        />
      )) || <View />}

      {/* {Thời gian kết thúc} */}
      {/* <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_completed')} />}
        right={
          <GeneralInfoItem.Value
            value={formatFuzzyDate(summaryResult.completedTime ?? '', 'DD/MM/yyyy HH:mm:ss')}
          />
        }
      /> */}

      {/* {Thời gian xử lý} */}
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('transaction_info_label_duration')} />}
        right={<GeneralInfoItem.Value value={summaryResult.processingTime ?? ''} />}
      />
      {/* {Lý do dừng thực hiện} */}
      {summaryResult.transactionStatus === 'CANCEL' &&
        summaryResult.reason != null &&
        summaryResult.reason.length > 0 &&
        summaryResult.reason !== '-' && (
          <GeneralInfoItem
            left={<GeneralInfoItem.Label label={translate('transaction_info_label_reason')} />}
            right={<GeneralInfoItem.Value value={summaryResult.reason} />}
          />
        )}
    </ContentSection>
  );
}
