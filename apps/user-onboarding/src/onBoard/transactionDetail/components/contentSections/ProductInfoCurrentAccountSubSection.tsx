import React from 'react';
import { translate } from '../../assets/translations/translate';
import ErrorAction from '../common/ErrorAction';
import GeneralInfoItem from '../common/GeneralInfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { retryCif } from '@screens/transactionDetail/redux/actions/GetTransactionDetailAction';

const ProductInfoCurrentAccountSubSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);
  const info = response?.informationForProductRequest?.currentAccount ?? [];
  const dispatch = useAppDispatch();

  return (
    <>
      {info
        .filter((item) => (item.status ?? '').length > 0)
        .map((item, index) => (
          <SubSection key={index} title={translate('pi_current_account_title')}>
            <GeneralInfoItem
              left={<GeneralInfoItem.Label label={translate('pi_current_account_type')} />}
              right={
                <GeneralInfoItem.Value
                  value={item.productName ?? item.productCode ?? ''}
                />
              }
            />
            <GeneralInfoItem
              left={<GeneralInfoItem.Label label={translate('pi_current_account_number')} />}
              right={<GeneralInfoItem.Value value={item.accountNumber ?? '-'} />}
            />
            <GeneralInfoItem
              left={<GeneralInfoItem.Label label={translate('pi_current_account_status')} />}
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
                    message={item.errorMessage ?? 'Unknown error'}
                    onPressRetry={() => {
                      dispatch(
                        retryCif({
                          transactionId: response?.transactionDetail.transactionId ?? '',
                          requestType: 'RETRY',
                          itemType: 'ACCOUNT',
                          itemId: item.id ?? '',
                        })
                      );
                    }}
                    onPressManual={() => {
                      dispatch(
                        retryCif({
                          transactionId: response?.transactionDetail.transactionId ?? '',
                          requestType: 'MANUAL',
                          itemType: 'ACCOUNT',
                          itemId: item.id ?? '',
                        })
                      );
                    }}
                  />
                ) : null
              }
            />
          </SubSection>
        ))}
    </>
  );
};

export default ProductInfoCurrentAccountSubSection;
