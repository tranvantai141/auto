import React, { useState } from 'react';
import { translate } from '../../assets/translations/translate';
import GeneralInfoItem from '../common/GeneralInfoItem';
import InfoItem from '../common/InfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import { RootState } from 'src/redux/store';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import ErrorAction from '../common/ErrorAction';
import { Card } from '@screens/transactionDetail/typings';
import { retryCif } from '@screens/transactionDetail/redux/actions/GetTransactionDetailAction';
import InfoItemWithContent from '@screens/transactionDetail/components/common/InfoItemWithContent';
import { View } from 'react-native';
import { heightPercentageToDP } from '@assets/sizes/Sizes';
import colors from '@screens/home/assets/Colors';

const ProductInfoEcardSubSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);
  const [expandedIDs, setExpandedIDs] = useState<string[]>([]);

  const _info = response?.informationForProductRequest?.electronicDebitCart;
  const infoEBanking = response?.informationForProductRequest?.electronicBanking;
  const infoAccount = response?.informationForProductRequest?.currentAccount ?? [];

  const info: Card[] = Array.isArray(_info) ? _info : [];
  const dispatch = useAppDispatch();
  //To Fix unused warning
  // const hideSensitiveString = (raw: string) => {
  //   let exposedPrefix = '';
  //   let exposedSuffix = '';
  //   const numberOfStars = 4;
  //   if (raw.length < 4) {
  //     return '*'.repeat(raw.length);
  //   }
  //   if (raw.length < 8) {
  //     exposedPrefix = '';
  //     // exposed 2 latest characters
  //     exposedSuffix = raw.substring(raw.length - 2, raw.length);
  //   } else {
  //     exposedPrefix = raw.substring(0, 4);
  //     exposedSuffix = raw.substring(raw.length - 4, raw.length);
  //   }
  //   return exposedPrefix + '*'.repeat(numberOfStars) + exposedSuffix;
  // };
  //
  if (
    info.length === 0 &&
    infoEBanking?.status !== 'SUCCESS' &&
    infoAccount?.filter((account) => account.accountCurrency.includes('VND')).length <= 0
  ) {
    return null;
  }

  return (
    <SubSection title={translate('pi_debit_ecard_title')}>
      {infoEBanking?.status === 'SUCCESS' &&
        infoAccount?.filter((account) => account.accountCurrency.includes('VND')).length > 0 && (
          <React.Fragment>
            <InfoItemWithContent
              title={`Thẻ Ghi nợ quốc tế phi vật lý VCB DigiCard`}
              content={
                'Được phát hành mặc định và miễn phí cho khách hàng đăng ký VCB Digiank và có tài khoản thanh toán VND'
              }
            />

            <GeneralInfoItem
              leftRightRatio="2:1"
              left={<GeneralInfoItem.Label label={'Trạng thái'} />}
              right={<GeneralInfoItem.Value value={'Đã tiếp nhận'} />}
            />
          </React.Fragment>
        )}

      {info.map((item, index) => (
        <React.Fragment key={index}>
          <InfoItem title={item.productName} />
          {/* <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('pi_debit_ecard_number')} />}
            right={
              <GeneralInfoItem.Value
                value={
                  item.primaryAcctNo != null ? hideSensitiveString(item.primaryAcctNo ?? '') : '-'
                }
              />
            }
          /> */}
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('pi_debit_ecard_status')} />}
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
                    );
                  }}
                />
              ) : null
            }
          />
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
              left={<GeneralInfoItem.Label label={translate('pi_debit_ecard_issue_fee_type')} />}
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
              left={<GeneralInfoItem.Label label={translate('pi_debit_ecard_secondary_account')} />}
              right={<GeneralInfoItem.Value value={item.subAccounts ? 'Có' : 'Không'} />}
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={<GeneralInfoItem.Label label={translate('pi_debit_ecard_fee')} />}
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
              left={<GeneralInfoItem.Label label={translate('pi_debit_ecard_3d_secure')} />}
              right={<GeneralInfoItem.Value value={item.isRegisterOtpEmail ? 'Có' : 'Không'} />}
            />
            <GeneralInfoItem
              leftRightRatio="1:1"
              left={<GeneralInfoItem.Label label={translate('pi_debit_ecard_3d_secure_email')} />}
              right={<GeneralInfoItem.Value value={item.otpEmail ?? ''} />}
            />
          </SubSection.HidableSection>
        </React.Fragment>
      ))}
    </SubSection>
  );
};

export default ProductInfoEcardSubSection;
