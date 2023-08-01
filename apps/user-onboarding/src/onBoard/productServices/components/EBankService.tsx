import {
  IconBlackLogo,
  IconCheckBoxInactive,
  IconCheckboxActive,
  IconEBanking,
} from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { TestIds } from '@screens/onBoardingProcess/termsConditions/assets/TestIds';
import InputTextBox from './InputTextBox';
import { Account } from '@screens/productAndService/typings';
import {
  updateDigiBankEmail,
  updateDigiBankMobile,
  updateDigiBankStatus,
} from '@screens/productServices/redux/slices/GetDigibankRegisteredInfoSlice';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { calculateAge } from 'src/common/utils/CalculateAge';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { ListItem, ListItemAccounts } from 'src/typings/global';
import Colors from '../assets/Colors';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import AllAccountsDropdown from './AllAccountsDropdown';
import HelperManager from '../../../common/utils/HelperManager';
import { clearOnlyEDebitCardList } from '@screens/productServices/redux/slices/GetRequestedDebitCardSlice';
import { Debit_Card_Type } from '@screens/productServices/typings';

type Props = {
  emailDigi?: string;
  phoneDigi?: any;
  isRegisterDigibank?: boolean;
  isRegisterSmsBanking?: boolean;
  isRegisterPhoneBanking?: boolean;
  onDigiToggle?: () => void;
  onPhoneToggle?: () => void;
  onSmsToggle?: () => void;
  onOutFocusPhonenumber?: (phone: string) => void;
  setPhoneNumber?: (text: string) => void;
  accounts?: Account[];
  error?: boolean;
  error_mess?: string;
  value?: string;
  onChangeText?: () => void;
  data?: Array<ListItemAccounts>;
  phoneNumberExist?: string;
  emailExist?: string;
  savedAccNo?: any;
  setSaveAccCurrency?: any;
  existAcc?: any;
  isExistAccountSelect?: any;
  popupError?: boolean;
  onLayout?: any;
  borderColourOnError?: boolean;
  accountsListLength: number;
  pendingOpenAccountsLength: number;
  // toggleDigiBank?: boolean;
  savedValue?: string;
  existingDigibank?: boolean;
  requestedAccount: number;
  currency: string;
  loading?: boolean;
  phoneNumberValid?: boolean;
  phoneNumberMess?: string;
};

const getFirstVal = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value?.split(',')[0].trim();
};

const EBankService = (props: Props) => {
  const dispatch = useAppDispatch();

  const getDigibankDetail = useAppSelector((state) => state.getRegDigibankInfo.response);
  const mocResults = useAppSelector((state: RootState) => state.getMoCResults);
  const birthDate = mocResults?.data?.DOB;
  const age = calculateAge(birthDate);

  const existingDebitCardList = useAppSelector(
    (state: RootState) => state.existingDebitCardRequest.response
  );

  const supplementalData = useAppSelector(
    (state: RootState) => state.getSupplementalInfoSlice.data
  );

  const have052Card = useMemo(() => {
    return existingDebitCardList && existingDebitCardList?.filter((card: Debit_Card_Type) => card?.pdtNumber === '052')
  }, [existingDebitCardList]);

  const arrPhone: Array<ListItem> = useMemo(() => {
    const arrData: Array<ListItem> = [];
    const arrResult: Array<string> = supplementalData?.mobilePhone?.split(',');
    if (HelperManager.isValid(supplementalData?.newMobilePhone))
      arrResult.push(supplementalData?.newMobilePhone);

    arrResult?.map((item: string) => {
      arrData.push({
        name: item,
        code: item,
        label: item,
      });
    });

    return arrData?.reverse();
  }, [supplementalData]);

  const arrEmail: Array<ListItem> = useMemo(() => {
    const arrData: Array<ListItem> = [];
    const arrResult: Array<string> = supplementalData?.email?.split(',');
    if (HelperManager.isValid(supplementalData?.newEmail))
      arrResult.push(supplementalData?.newEmail);

    arrResult?.map((item: string) => {
      arrData.push({
        name: item,
        code: item,
        label: item,
      });
    });

    return arrData?.reverse();
  }, [supplementalData]);

  const updatedAccList = React.useMemo(() => (props?.data && [...props.data]) || [], [props.data]);

  const renderCheckBoxViewDigi = React.useCallback(() => {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={Style.checkView}>
          <TouchableOpacity
            onPress={() => {
              dispatch(clearOnlyEDebitCardList());
              dispatch(updateDigiBankStatus(!getDigibankDetail?.isToggle ?? false));
            }}
            testID={TestIds.toggle_checkbox}
          >
            {getDigibankDetail?.isToggle ? (
              <IconCheckboxActive height={28} width={28} style={Style.checkImage} />
            ) : (
              <IconCheckBoxInactive height={28} width={28} style={Style.checkImage} />
            )}
          </TouchableOpacity>
          <Text style={Style.heading_style}>{translate('vcb_digital_bank')}</Text>
        </View>
        {getDigibankDetail?.isToggle && (
          <View
            style={{
              backgroundColor: Colors.frame_color,
              marginLeft: wp(10),
              marginRight: wp(5),
              borderRadius: 12,
              flex: 1,
              padding: 20,
            }}
          >
            <View>
              <View style={Style.box_digi}>
                <View onLayout={props.onLayout} style={Style.box_digi_phone}>
                  <InputTextBox
                    value={getFirstVal(props?.phoneDigi)}
                    onChangeText={(text) => {
                      dispatch(updateDigiBankMobile(text));
                      // props?.onOutFocusPhonenumber?.();
                      // props?.setPhoneNumber?.(text);
                    }}
                    onClearText={() => {
                      dispatch(updateDigiBankMobile(''));

                      // props?.setPhoneNumber?.('');
                    }}
                    onBlur={() => {
                      // props?.onOutFocusPhonenumber?.();
                    }}
                    onSelectProduct={(item: ListItem) => {
                      dispatch(updateDigiBankMobile(item?.name ?? ''));
                      props?.onOutFocusPhonenumber?.(item?.name ?? '');
                    }}
                    heading={translate('digibank_phone_title')}
                    viewStyle={{
                      width: '100%',
                      borderColor:
                        props.borderColourOnError === true ? Colors.error_red : Colors.border_grey,
                    }}
                    keyboardType="number-pad"
                    maxLength={10}
                    source={Images.clear}
                    sourceSuccess={Images.success}
                    error_msg={props?.phoneNumberMess ?? ''}
                    success={props?.phoneNumberValid ?? false}
                    products={arrPhone}
                    idDropList={'name'}
                    valueDropList={'name'}
                    dropdown
                    dropdownWidth={wp(22)}
                    search={false}
                  />
                </View>
                <View style={Style.box_digi_email}>
                  <InputTextBox
                    value={getFirstVal(props?.emailDigi || '')}
                    heading={translate('digibank_email_title')}
                    viewStyle={{
                      width: '100%',
                      backgroundColor: Colors.light_grey,
                      borderColor: Colors.border_grey,
                    }}
                    keyboardType="email-address"
                    // disabled={true}
                    products={arrEmail}
                    idDropList={'name'}
                    valueDropList={'name'}
                    dropdown
                    dropdownWidth={wp(50)}
                    onSelectProduct={(item: ListItem) => {
                      dispatch(updateDigiBankEmail(item?.name ?? ''));
                    }}
                    search={false}
                  />
                </View>
              </View>
              {updatedAccList && updatedAccList?.length > 0 && (
                <AllAccountsDropdown
                  value={props.savedValue ?? updatedAccList[0]?.accountNumber ?? ''}
                  currency={props.currency}
                  data={updatedAccList}
                  onChangeText={() => props.onChangeText}
                  dropdownHeading={translate('default_accounts')}
                />
              )}

              {(!props.data || props.data?.length === 0) && (
                <InputTextBox
                  heading={translate('default_accounts')}
                  value={'Tài khoản đăng ký mở mới'}
                  viewStyle={{
                    width: '100%',
                    backgroundColor: Colors.frame_color,
                    borderColor: Colors.border_grey,
                  }}
                  keyboardType="email-address"
                  disabled={true}
                />
              )}
            </View>
          </View>
        )}
      </View>
    );
  }, [getDigibankDetail?.isToggle, props, arrPhone, arrEmail, updatedAccList, dispatch]);

  return (
    <View
      style={[
        Style.box_style,
        {
          borderColor: Colors.white,
          marginVertical: props.error ? hp(0.5) : hp(0),
        },
      ]}
    >
      <View style={Style.top_view}>
        <IconEBanking height={32} width={32} style={Style.icon_style} />
        <Text style={Style.title_text}>{translate('service_ebanking')}</Text>
      </View>
      <>
        {props?.existingDigibank === false &&
          props?.accountsListLength === 0 &&
          props?.pendingOpenAccountsLength === 0 &&
          props?.requestedAccount === 0 && (
            <View style={Style.main_margin}>
              <Text style={Style.warn}>{translate('warn_for_ebank')}</Text>
            </View>
          )}
        {getDigibankDetail && props?.existingDigibank ? (
          <View style={Style.main_margin}>
            <View style={{ flexDirection: 'row' }}>
              <IconBlackLogo height={hp(1)} width={hp(1)} style={Style.icon_black_logo} />
              <Text style={Style.title_heading}>{translate('vcb_digital_bank') + ':'}</Text>
              {getDigibankDetail?.electronicBanking?.mobilePhone ? (
                <Text style={Style.title_sub_heading}>
                  {getDigibankDetail?.electronicBanking?.mobilePhone + ' | '}
                </Text>
              ) : (
                ''
              )}
              <Text style={Style.title_sub_heading}>
                {getDigibankDetail?.electronicBanking?.email}
              </Text>
            </View>
          </View>
        ) : (
          <>
            <View style={Style.title_view}>
              {props?.accountsListLength > 0 ||
              props?.pendingOpenAccountsLength > 0 ||
              props?.requestedAccount > 0 ? (
                <>
                  {
                    <>
                      {age >= 18 ? (
                        <>
                          <Text style={Style.des_text}>
                            {!HelperManager.isValid(have052Card)
                              ? translate('service_ebanking_digicard_des')
                              : translate('service_ebanking_des')}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={Style.des_text}>
                            {translate('service_ebanking_des_below18')}
                          </Text>
                        </>
                      )}
                    </>
                  }

                  {renderCheckBoxViewDigi()}
                </>
              ) : null}
            </View>
          </>
        )}
      </>
    </View>
  );
};

const Style = StyleSheet.create({
  view: {
    marginTop: hp(1),
    height: hp(66),
    width: wp(94),
  },
  heading_style: {
    lineHeight: 24,
    fontSize: 16,
    fontWeight: '400',
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border_color,
    padding: 16,
    paddingTop: 0,
  },
  title_view: {
    marginTop: 20,
  },
  box_digi: {
    flexDirection: 'row',
    flex: 1,
  },
  box_digi_phone: {
    backgroundColor: Colors.frame_color,
    paddingHorizontal: 15,
    flex: 0.3,
  },
  box_digi_email: {
    backgroundColor: Colors.frame_color,
    pointerEvents: 'none',
    flex: 0.7,
  },
  box_style: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 15,
  },
  icon_style: {
    height: hp(3.7),
    width: hp(3.7),
  },
  title_text: {
    marginLeft: wp(2),
    color: Colors.black,
    fontSize: hp(1.8),
    fontWeight: '600',
  },
  des_text: {
    marginLeft: wp(3),
    color: Colors.text_grey,
    lineHeight: 18,
    fontSize: hp(1.4),
    fontWeight: '400',
    marginBottom: 8,
  },
  checkView: {
    flexDirection: 'row',
    margin: hp(1),
    marginLeft: hp(2),
    alignItems: 'center',
  },
  checkImage: {
    height: 28,
    width: 28,
    marginRight: 10,
  },
  title_heading: {
    marginLeft: wp(1.5),
    color: Colors.black,
    fontSize: hp(1.5),
    fontWeight: '600',
  },
  title_sub_heading: {
    marginLeft: wp(1),
    color: Colors.grey_black,
    fontSize: hp(1.5),
    fontWeight: '400',
  },
  main_margin: {
    marginTop: 10,
  },
  icon_black_logo: {
    marginLeft: wp(8),
    alignSelf: 'center',
  },
  warn: {
    color: Colors.light_black,
    fontSize: hp(1.5),
    marginLeft: wp(3),
  },
});
export default EBankService;
