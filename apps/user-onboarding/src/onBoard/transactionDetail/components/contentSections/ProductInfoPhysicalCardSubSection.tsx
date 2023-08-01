import React, { useState } from 'react';
import GeneralInfoItem from '../common/GeneralInfoItem';
import { translate } from '../../assets/translations/translate';
import SubSection from '../common/SubSection';
import InfoItem from '../common/InfoItem';
import StatusChip from '../common/StatusChip';
import { RootState } from 'src/redux/store';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import ErrorAction from '../common/ErrorAction';
import { retryCif } from '@screens/transactionDetail/redux/actions/GetTransactionDetailAction';

const ProductInfoPhysicalCardSubSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);
  const [expandedIDs, setExpandedIDs] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const _info = response?.informationForProductRequest?.debitCarts;
  const info = Array.isArray(_info) ? _info : [];

  if (info.length === 0) {
    return null;
  }

  return (
    <SubSection title={translate('pi_debit_card_title')}>
      {info.map((item, index) => (
        <React.Fragment key={index}>
          <InfoItem title={item.productName} />
          {/* <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('pi_debit_card_number')} />}
            right={<GeneralInfoItem.Value value={item.primaryAcctNo ?? ''} />}
          /> */}
          {item.status.length !== 0 && (
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={<GeneralInfoItem.Label label={translate('pi_debit_card_status')} />}
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
                  <ErrorAction
                    message={item.errorLog ?? 'Unknown error'}
                    onPressRetry={() => {
                      dispatch(
                        retryCif({
                          transactionId: response?.transactionDetail.transactionId ?? '',
                          requestType: 'RETRY',
                          itemType: 'CARD',
                          itemId: item.id ?? '',
                        })
                      );
                    }}
                    onPressManual={() => {
                      dispatch(
                        retryCif({
                          transactionId: response?.transactionDetail.transactionId ?? '',
                          requestType: 'MANUAL',
                          itemType: 'CARD',
                          itemId: item.id ?? '',
                        })
                        // markCifAsManual(
                        //   response?.transactionDetail.transactionId ?? '',
                        //   'OPEN_CIF'
                        // )
                      );
                    }}
                  />
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
              left={<GeneralInfoItem.Label label={translate('pi_debit_card_distribute')} />}
              right={
                <GeneralInfoItem.Value
                  value={item.issueType === 'REGULAR' ? 'Thông thường' : 'Phát hành nhanh'}
                />
              }
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={<GeneralInfoItem.Label label={translate('pi_debit_card_distribute_pay')} />}
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
              left={<GeneralInfoItem.Label label={translate('pi_debit_card_secondary_account')} />}
              right={<GeneralInfoItem.Value value={item.subAccounts ? 'Có' : 'Không'} />}
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={<GeneralInfoItem.Label label={translate('pi_debit_card_fee')} />}
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
              left={<GeneralInfoItem.Label label={translate('pi_debit_card_3d_secure')} />}
              right={<GeneralInfoItem.Value value={item.isRegisterOtpEmail ? 'Có' : 'Không'} />}
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={<GeneralInfoItem.Label label={translate('pi_debit_card_3d_secure_email')} />}
              right={<GeneralInfoItem.Value value={item.otpEmail} />}
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={
                <GeneralInfoItem.Label label={translate('pi_debit_card_secondary_card_issued')} />
              }
              right={<GeneralInfoItem.Value value={item.isSubCard ? 'Có' : 'Không'} />}
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={<GeneralInfoItem.Label label={translate('pi_debit_card_membership_code')} />}
              right={<GeneralInfoItem.Value value={item.affiliateMembershipCode ?? ''} />}
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={
                <GeneralInfoItem.Label label={translate('pi_debit_card_receive_card_method')} />
              }
              right={<GeneralInfoItem.Value value={item.methodOfReceivingCard ?? '-'} />}
            />
          </SubSection.HidableSection>
        </React.Fragment>
      ))}
    </SubSection>
  );
};

export default ProductInfoPhysicalCardSubSection;
