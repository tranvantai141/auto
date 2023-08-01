import { IconArrowDown, IconArrowUp, IconEditGreen } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import AdditionalCardInfo from './AdditionalCardInfo';
import DepositAccService from './DepositAccService';
import EBankServiceInfo from './EBankServiceInfo';
import NonPhysicalDebitCardInfo from './NonPhysicalDebitCardInfo';
import PhysicalDebitCardInfo from './PhysicalDebitCardInfo';
import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import { AccountDetails } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import HelperManager from 'src/common/utils/HelperManager';
import { Debit_Card_Type, DebitCardType } from '@screens/productServices/typings';

type Props = {
  onEdit?: () => void;
};

const VALID_ACCT_STATUS = [1, 3, 5, 6, 7, 9];

const RegisterServiceInfo = (props: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const createProductServiceState = useAppSelector(
    (state: RootState) => state?.transactionDetail?.response
  );
  const getSupplementalUpdateInfo = useAppSelector(
    (state: RootState) => state.getSupplementalInfoSlice.data
  );

  const additionalInfoRequest = useAppSelector(
    (state: RootState) => state.updateAdditionalInfo.response
  );
  // const AccountListData = useAppSelector((state: RootState) => state.getAccountList.response);

  const onPressCollapse = () => {
    setOpen(!open);
  };

  const getCardInfo = useAppSelector((state: RootState) => state?.getAdditionalCardInfo);
  const debitCardProducts = useAppSelector((state) => state.getCardProductList);

  const requetedDebitCardList = useAppSelector(
    (state: RootState) => state.requestedDebitCardSlice.response
  );
  const getDigibankDetail = useAppSelector((state: RootState) => state.getRegDigibankInfo.response);
  const accountListData = useAppSelector((state: RootState) => state.getAccountList.response);

  const existingDebitCardList = useAppSelector(
    (state: RootState) => state.existingDebitCardRequest.response
  );

  const requestDebit = requetedDebitCardList?.filter(
    (card: ISaveDebitCard) => card?.cardType === 'DEBIT'
  );
  const requestEDebit = requetedDebitCardList?.filter(
    (card: ISaveDebitCard) => card?.cardType === 'E_DEBIT'
  );

  // checking if customer requested for ebanking
  const checkIfDigibankRequested = getDigibankDetail?.isToggle;

  // checking if new VND account requested
  const newAccountRegistered = accountListData?.openAccounts || [];

  const checkIfVNDAccExist = newAccountRegistered?.some((item) => item && item?.currency === 'VND');

  // checking if there is any VND account in existing account listrequested
  // const checkIfVNDAccExist = accountListData?.openAccounts?.some(
  //   (item: AccountDetails) => item && item?.currency === 'VND' && String(item?.acctStatus) != '4'
  // );

  const checkIfNewAccRequested = accountListData?.currentAccounts?.some(
    (account: AccountDetails) =>
      VALID_ACCT_STATUS.includes(parseInt(account?.acctStatus ?? '')) &&
      account.acctType === 'D' &&
      account?.currency === 'VND'
  );

  const showVndMessage = checkIfDigibankRequested
    ? checkIfNewAccRequested || checkIfVNDAccExist
    : false;

  const have052Card = useMemo(() => {
    return existingDebitCardList?.filter((card: Debit_Card_Type) => card?.pdtNumber === '052');
  }, [existingDebitCardList]);

  const isShowAdditionalCardInfo =
    HelperManager.isValid(getSupplementalUpdateInfo?.homePhone) ||
    HelperManager.isValid(getSupplementalUpdateInfo?.newHomePhone) ||
    HelperManager.isValid(additionalInfoRequest?.academicLevel) ||
    HelperManager.isValid(additionalInfoRequest?.marriedStatus) ||
  HelperManager.isValid(additionalInfoRequest?.motherName) ||
  HelperManager.isValid(additionalInfoRequest?.workingOrg) ||
  HelperManager.isValid(additionalInfoRequest?.detailedAddress) ||
  HelperManager.isValid(additionalInfoRequest?.workingMobileNumber);


  return (
    <View style={Style.container}>
      <View style={Style.outer_view}>
        <Text style={Style.heading_text}>{translate('register_service_info')}</Text>
        <TouchableOpacity style={Style.icon_view} onPress={props?.onEdit}>
          <IconEditGreen height={hp(2.5)} width={hp(2.5)} style={Style.edit_icon} />
          <Text style={Style.edit_text}>{translate('fix')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.icon_view} onPress={onPressCollapse}>
          {!open ? (
            <IconArrowDown height={hp(2.5)} width={hp(2.5)} />
          ) : (
            <IconArrowUp height={hp(2.5)} width={hp(2.5)} />
          )}
        </TouchableOpacity>
      </View>

      {open && (
        <ScrollView style={Style.dropdown_view}>
          {HelperManager.isValid(accountListData?.openAccounts) && (
            <DepositAccService data={accountListData?.openAccounts ?? []} />
          )}
          {getDigibankDetail && getDigibankDetail?.isToggle && (
            <React.Fragment>
              <EBankServiceInfo data={getDigibankDetail} />
            </React.Fragment>
          )}

          {((showVndMessage && !HelperManager.isValid(have052Card) && requestEDebit?.length <= 0) ||
            (requestEDebit && requestEDebit?.length > 0)) && (
            <NonPhysicalDebitCardInfo
              showDigiCardinfo={showVndMessage}
              have052Card={HelperManager.isValid(have052Card)}
              data={requetedDebitCardList?.filter(
                (card: ISaveDebitCard) => card?.cardType === 'E_DEBIT'
              )}
              cardList={debitCardProducts?.response?.products}
            />
          )}

          {HelperManager.isValid(requestDebit) && (
            <PhysicalDebitCardInfo
              data={requetedDebitCardList?.filter(
                (card: ISaveDebitCard) => card?.cardType === 'DEBIT'
              )}
              cardList={debitCardProducts?.response?.products}
              // cardDeliveryRequested={createProductServiceState?.informationForProductRequest?.cardDeliveryRequested ?? ''}
            />
          )}

          {( HelperManager.isValid(requestDebit) && isShowAdditionalCardInfo && (
            <View style={{ marginLeft: 20 }}>
              <AdditionalCardInfo />
            </View>
          )) || <View />}
        </ScrollView>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  option_view: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: Colors.light_grey,
    flexDirection: 'row',
    paddingVertical: hp(1),
  },
  outer_view: { flexDirection: 'row' },
  container: {
    alignSelf: 'center',
    width: wp(94),
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: hp(1.5),
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  heading_text: {
    fontSize: hp(2),
    color: Colors.light_black,
    fontWeight: '500',
  },
  icon_style: {
    height: hp(2.5),
    width: hp(2.5),
  },
  icon_view: {
    right: wp(1),
    position: 'absolute',
  },
  edit_icon: {
    right: wp(10),
    position: 'absolute',
    height: hp(2.5),
    width: hp(2.5),
  },
  option_heading: {
    fontWeight: '600',
    color: Colors.light_black,
    fontSize: hp(1.6),
    textAlign: 'left',
    width: wp(35),
  },
  dropdown_view: {
    marginTop: hp(2),
    borderTopWidth: 1,
    borderTopColor: Colors.border_green,
  },
  option_info: {
    fontWeight: '400',
    color: Colors.light_black,
    fontSize: hp(1.6),
  },
  edit_text: {
    fontWeight: '400',
    color: Colors.border_green,
    fontSize: hp(1.6),
    right: wp(5.5),
    position: 'absolute',
    alignSelf: 'center',
  },
  info_view: {
    borderRadius: 8,
    borderColor: Colors.background_color,
    backgroundColor: Colors.background_color,
    padding: hp(1.5),
    marginLeft: wp(8),
  },
  info_heading: {
    fontSize: hp(1.6),
    fontWeight: '400',
    textAlign: 'left',
    alignSelf: 'center',
    marginLeft: 10,
  },
});
export default RegisterServiceInfo;
