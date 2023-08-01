import { IconPrintGreen } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Loader from '@components/loaders/ActivityIndicator';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from 'src/redux/hooks';
import Color from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import InfoTextLineView from '../components/InfoTextLineView';
import {
  GetTransactionResultResult,
  IRegistrationResultlInfoHeadings,
} from '../typings/TransactionResultParams';
import InfoDivider from './Divider';

type Props = {
  data: GetTransactionResultResult;
  image_id: string;
  text_id: string;
  icon_id: string;
  isLoading?: boolean;
  printHandoverSlip?: () => void;
  printTransaction?: () => void;
  transactionId: string;
};

const ResultInfo = (props: Props) => {
  const { data, isLoading, transactionId } = props;
  const keys = Object.keys(data);
  const { isRegisterProduct } = useAppSelector((state) => state.etbUpdatedInfo);

  const vndAccountList = data?.accounts?.filter((e) => e.currency === 'VND');
  const foreignAccountList = data?.accounts
    ?.filter((e) => e.currency !== 'VND')
    .sort((e1, e2) => (e1?.currency ?? '').localeCompare(e2?.currency ?? ''));
  let currentCurrency =
    foreignAccountList && foreignAccountList?.length > 0 && foreignAccountList[0]?.currency;
  let isFistHeading = true;
  let accountIndex = 0;

  const shouldDisplayPrintButtons = (function () {
    // NTB
    if (
      isRegisterProduct == null ||
      isRegisterProduct === false ||
      isRegisterProduct === undefined
    ) {
      return false;
    }

    // ETB
    if (isRegisterProduct) {
      return true;
    }

    return false;
  })();

  const isHaveDigiCard = () => {
    return (
      (keys.includes('digibank') &&
      data?.digibank?.registered &&
      !data?.digibank?.opened_by_new_account &&
      keys.includes('accounts') &&
      data?.accounts?.length > 0 &&
      vndAccountList?.length > 0) ||
      (!data?.has_international_digi_card && data?.digibank?.registered)
    );
  };

  return (
    <View style={Style.info_box}>
      <InfoTextLineView
        heading={IRegistrationResultlInfoHeadings?.transactionId}
        info={transactionId.length > 0 ? `#${transactionId}` : ''}
      />
      <InfoDivider />
      {keys.includes('customer_name') && (
        <View>
          <InfoTextLineView
            heading={IRegistrationResultlInfoHeadings?.customer_name}
            info={data?.customer_name || ''}
          />
          <InfoDivider />
        </View>
      )}

      <InfoTextLineView
        heading={IRegistrationResultlInfoHeadings?.cif}
        info={
          data?.cif?.status === 'ERROR'
            ? 'error'
            : data?.cif?.status === 'SUCCESS'
            ? data?.cif?.number
            : ''
        }
        errorMessage={data?.cif?.errorCode === 'cifNumberExisting' ? translate('existing_cif') : ''}
      />
      <InfoDivider />
      {keys.includes('accounts') &&
        data?.accounts?.length > 0 &&
        vndAccountList?.length > 0 &&
        vndAccountList.map((item, index) => {
          return (
            <InfoTextLineView
              accountIndex={vndAccountList?.length > 1 ? index + 1 : 0}
              isHideHeading={index !== 0}
              key={index}
              heading={IRegistrationResultlInfoHeadings?.accounts}
              info={
                item?.status === 'SUCCESS' ? item?.number : item?.status === 'ERROR' ? 'error' : ''
              }
            />
          );
        })}
      {keys.includes('accounts') && data?.accounts?.length > 0 && vndAccountList?.length > 0 && (
        <InfoDivider />
      )}
      {keys.includes('accounts') &&
        data?.accounts?.length > 0 &&
        foreignAccountList?.length > 0 &&
        foreignAccountList.map((res, index) => {
          const sameCurrencyList = foreignAccountList?.filter((e) => e.currency === res.currency);
          const isShowIndex = sameCurrencyList.length > 1;

          if (res?.currency !== currentCurrency || index === 0) {
            (isFistHeading = true), (currentCurrency = res?.currency);
            accountIndex = 1;
          } else {
            isFistHeading = false;
            accountIndex++;
          }
          return (
            <InfoTextLineView
              accountIndex={isShowIndex && foreignAccountList?.length > 1 ? accountIndex : 0}
              isHideHeading={!isFistHeading}
              key={index}
              heading={`${IRegistrationResultlInfoHeadings?.foreignCurrencyAccountNumber} ${res.currency}`}
              info={
                res?.status === 'SUCCESS' ? res?.number : res?.status === 'ERROR' ? 'error' : ''
              }
            />
          );
        })}
      {keys.includes('accounts') &&
        data?.accounts?.length > 0 &&
        foreignAccountList?.length > 0 && <InfoDivider />}

      {keys.includes('digibank') && data?.digibank?.registered && (
        <View>
          <InfoTextLineView
            heading={IRegistrationResultlInfoHeadings?.digibankUsername}
            info={
              data?.cif?.status === 'SUCCESS'
                ? data?.digibank?.status === 'ERROR'
                  ? 'error'
                  : data?.digibank?.status === 'SUCCESS' && data?.digibank?.registered
                  ? data?.digibank?.phone_number
                  : ''
                : ''
            }
          />
          <InfoDivider />
        </View>
      )}

      {keys.includes('update_cif') && data.update_cif.is_update_request && (
        <View>
          <InfoTextLineView
            heading={translate('info_update')}
            info={
              data?.update_cif?.status === 'SUCCESS'
                ? translate('update_success')
                : data?.update_cif?.status === 'ERROR'
                ? 'error'
                : data?.update_cif?.status === 'PROCESSING'
                ? 'processing'
                : ''
            }
          />
          <InfoDivider />
        </View>
      )}

      {keys.includes('update_supplemental') && data.update_supplemental.is_update_request && (
        <View>
          <InfoTextLineView
            heading={IRegistrationResultlInfoHeadings?.update_supplemental}
            info={
              data?.update_supplemental?.status === 'SUCCESS'
                ? translate('update_success')
                : data?.update_supplemental?.status === 'ERROR'
                ? 'error'
                : data?.update_supplemental?.status === 'PROCESSING'
                ? 'processing'
                : ''
            }
          />
          <InfoDivider />
        </View>
      )}

      {keys.includes('update_signature') && data.update_signature.is_update_request && (
        <View>
          <InfoTextLineView
            heading={IRegistrationResultlInfoHeadings?.update_signature}
            info={
              data?.update_signature?.status === 'SUCCESS'
                ? translate('update_success')
                : data?.update_signature?.status === 'ERROR'
                ? 'error'
                : data?.update_signature?.status === 'PROCESSING'
                ? 'processing'
                : ''
            }
          />
          <InfoDivider />
        </View>
      )}
      {data?.sms_banking_registered && (
        <View>
          <InfoTextLineView
            heading={IRegistrationResultlInfoHeadings?.sms_banking_registered}
            info={translate('registration_accepted')}
          />
          <InfoDivider />
        </View>
      )}
      {(data?.debit_cards?.length > 0 || isHaveDigiCard()) && (
        <View>
          <InfoTextLineView
            heading={IRegistrationResultlInfoHeadings?.edebitCardNumber}
            info={
              data?.debit_cards?.length > 0 || isHaveDigiCard()
                ? IRegistrationResultlInfoHeadings?.card_detail
                : ''
            }
            card={data?.debit_cards || []}
            isHaveDigiCard={isHaveDigiCard()}
          />
          <InfoDivider />
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginHorizontal: hp(1),
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {(shouldDisplayPrintButtons && (
            <>
              {props?.data?.is_overprinted ? (
                <TouchableOpacity
                  disabled={
                    isLoading ||
                    props.data.transaction_status !== 'COMPLETE' ||
                    !props?.data?.is_overprinted_succeed
                  }
                  onPress={props?.printTransaction}
                  style={[
                    Style.button_view,
                    {
                      width: wp(36),
                      marginRight: wp(1),
                      opacity:
                        props.data.transaction_status !== 'COMPLETE' ||
                        !props?.data?.is_overprinted_succeed
                          ? 0.3
                          : 1,
                    },
                  ]}
                >
                  {
                    // isLoading ? (
                    //   <Loader style={Style.loader_style} color={Color.primary} />
                    // ) : (
                    <>
                      <IconPrintGreen />
                      <Text style={Style.print_text}>{translate('print_transaction')}</Text>
                    </>
                    // )
                  }
                </TouchableOpacity>
              ) : null}
            </>
          )) || <View />}
          {(props?.data?.debit_cards?.length > 0 &&
            props?.data?.debit_cards.filter((item) => item?.fee && Number(item?.fee) > 0).length >
              0 && (
              <TouchableOpacity
                disabled={isLoading}
                onPress={props?.printHandoverSlip}
                style={Style.button_view}
              >
                {isLoading ? (
                  <Loader style={Style.loader_style} color={Color.primary} />
                ) : (
                  <>
                    <IconPrintGreen />
                    <Text style={Style.print_text}>{translate('print_handover_slip')}</Text>
                  </>
                )}
              </TouchableOpacity>
            )) || <View />}
        </View>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  loader_style: { margin: 0 },
  info_box: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.white,
    width: wp(70),
    alignSelf: 'center',
    backgroundColor: Color.light_grey,
    paddingVertical: hp(1.2),
    marginTop: hp(2),
  },
  button_view: {
    width: wp(26),
    height: hp(4.8),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.primary,
    alignSelf: 'center',
    marginVertical: hp(1),
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: hp(2),
    alignItems: 'center',
  },
  print_icon: {
    height: hp(2.5),
    width: hp(2.5),
    alignSelf: 'center',
  },
  print_text: {
    alignSelf: 'center',
    color: Color.primary,
    paddingLeft: 5,
    fontSize: hp(1.8),
    fontWeight: '600',
  },
});
export default ResultInfo;
