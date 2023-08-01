import React from 'react';
import { translate } from '../../assets/translations/translate';
import ErrorAction from '../common/ErrorAction';
import GeneralInfoItem from '../common/GeneralInfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { markCifAsManual, retryCif, retryCifDoc } from '@screens/transactionDetail/redux/actions/GetTransactionDetailAction';

const ProductInfoCustomerFileSubSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);
  const dispatch = useAppDispatch();
  const info = response?.informationForProductRequest?.customerInformationFile;
  return (
    <SubSection title={translate('pi_customer_file_title')}>
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={translate('pi_customer_file_label_id')} />}
        right={<GeneralInfoItem.Value value={info?.cifNumber ?? '-'} />}
      />
      {info?.document.filter((item) => item.status.length > 0).map((item, index) => (
        <GeneralInfoItem
          key={item.type + index}
          left={<GeneralInfoItem.Label label={item.name} />}
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
                  if (item.type === 'CREATE_CIF') {
                    dispatch(
                      retryCif({
                        transactionId: response?.transactionDetail.transactionId ?? '',
                        requestType: 'RETRY',
                        itemType: 'CIF',
                        itemId: '',
                      })
                    );
                  } else {
                    dispatch(
                      retryCifDoc({
                        transactionId: response?.transactionDetail.transactionId ?? '',
                        typeRetry: item.type === 'CREATE_CONTACT' ? 'CONTACT' : 'ID_IMAGE'
                      })
                    );
                  }
                }}
                onPressManual={() => {
                  // if (item.type === 'CREATE_CIF') {
                  //   dispatch(
                  //     retryCif({
                  //       transactionId: response?.transactionDetail.transactionId ?? '',
                  //       requestType: 'MANUAL',
                  //     })
                  //   );
                  // }
                  dispatch(
                    markCifAsManual(
                      response?.transactionDetail.transactionId ?? '',
                      item.type === 'CREATE_CIF'
                        ? 'OPEN_CIF'
                        : item.type === 'CREATE_CONTACT'
                        ? 'CONTACT'
                        : 'IMAGE'
                    )
                  );
                }}
              />
            ) : null
          }
        />
      ))}
    </SubSection>
  );
};

export default ProductInfoCustomerFileSubSection;
