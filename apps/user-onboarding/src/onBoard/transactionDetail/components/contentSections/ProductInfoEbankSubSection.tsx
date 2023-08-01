import React from 'react';
import { translate } from '../../assets/translations/translate';
import GeneralInfoItem from '../common/GeneralInfoItem';
import InfoItem from '../common/InfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import ErrorAction from '../common/ErrorAction';
import { retryCif } from '@screens/transactionDetail/redux/actions/GetTransactionDetailAction';

const ProductInfoEbankSubSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);
  const info = response?.informationForProductRequest?.electronicBanking;
  const isSMSBankingRegistered =
    response?.informationForProductRequest?.isRegisterSMSBanking ?? false;
  const isPhoneBankingRegistered =
    response?.informationForProductRequest?.isRegisterPhoneBanking ?? false;
  const dispatch = useAppDispatch();

  const shouldDisableEbanking =
    (info?.mobilePhone ?? '').length === 0 ||
    response?.informationForProductRequest?.ebankingRequested === false;

  return (
    <>
      {!shouldDisableEbanking && (
        <SubSection title={translate('pi_ebank_title')}>
          <InfoItem title={translate('pi_ebank_name')} />
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('pi_ebank_phone')} />}
            right={<GeneralInfoItem.Value value={info?.mobilePhone ?? '-'} />}
          />
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('pi_ebank_email')} />}
            right={<GeneralInfoItem.Value value={info?.email ?? '-'} />}
          />
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('pi_ebank_status')} />}
            right={
              info?.status === 'SUCCESS' ? (
                <StatusChip status="green" title="Thành công" />
              ) : info?.status === 'MANUAL' ? (
                <StatusChip status="purple" title="Xử lý thủ công" />
              ) : info?.status === 'PENDING' ? (
                <StatusChip status="yellow" title="Chờ xử lý" />
              ) : info?.status === 'PROCESSING' ? (
                <StatusChip status="yellow" title="Đang xử lý" />
              ) : info?.status === 'ERROR' || info?.status === 'FAIL' ? (
                <ErrorAction
                  message={info?.errorMessage ?? 'Unknown error'}
                  onPressRetry={() => {
                    dispatch(
                      retryCif({
                        transactionId: response?.transactionDetail.transactionId ?? '',
                        requestType: 'RETRY',
                        itemType: 'DIGIBANK',
                        itemId: '',
                      })
                    );
                  }}
                  onPressManual={() => {
                    dispatch(
                      retryCif({
                        transactionId: response?.transactionDetail.transactionId ?? '',
                        requestType: 'MANUAL',
                        itemType: 'DIGIBANK',
                        itemId: '',
                      })
                    );
                  }}
                />
              ) : (
                <StatusChip status="red" title="Không xác định" />
              )
            }
          />
        </SubSection>
      )}

      {isSMSBankingRegistered && (
        <SubSection>
          <InfoItem title={translate('pi_ebank_sms_banking')} />
        </SubSection>
      )}

      {isPhoneBankingRegistered && (
        <SubSection>
          <InfoItem title={translate('pi_ebank_phone_banking')} />
        </SubSection>
      )}
    </>
  );
};

export default ProductInfoEbankSubSection;
