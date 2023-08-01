import {
  IconBlackLogo,
  IconDebitCard,
  IconEditGrey,
  IconLocation,
  IconPlusGreen,
  IconPlusGrey,
  IconTrashActive,
} from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { ISaveDebitCard } from '@interfaces/I_SaveDebitCard_Info';
import { ICodes } from '@interfaces/apis/I_Contact_Form';
import { getProvinceList } from '@screens/addSupplementaryInfo/redux/actions/GetProvinceList';
import { resetAdditional } from '@screens/productServices/redux/slices/UpdateAdditionalInfoSlice';
import {
  AddressInterface,
  resetAddress,
  updateOtherCommune,
  updateOtherDistrict,
  updateOtherProvince,
} from '@screens/productServices/redux/slices/UpdateAddressSlice';
import {
  DeliveryInfoInterface,
  updateDeliveryInfoSuccess,
} from '@screens/productServices/redux/slices/UpdateDeliveryInfoSlice';
import { AccountDetails } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import Colors from '../assets/Colors';
import { Debit_Card_Type, cardPickup, cardPickupData } from '../assets/dummyData/Index';
import { translate } from '../assets/translations/translate';
import {
  getCommunesByDistrictCode,
  getDistrictsByProvinceCode,
} from '../redux/actions/GetDeliveryAction';
import { Additional_Info_Request, DebitCardType } from '../typings';
import CardPickupDropdown from './CardPickupDropdown';
import InputField from './InputField';
import HelperManager from '../../../common/utils/HelperManager';

type Props = {
  debitCardList?: Debit_Card_Type[];
  accountlist?: AccountDetails[];
  requestedAccount?: AccountDetails[];

  existingRequestList?: ISaveDebitCard[];
  addPress?: () => void;
  popupError?: boolean;
  onPressAddCard?: () => void;
  onDeletePress?: (id: string) => void;
  onUpdatePress?: (item: ISaveDebitCard) => void;
  setDeliveryMethod?: (e: string) => void;
  setDeliveryAddress?: (e: string | undefined) => void;
  setDeliveryInfoRequestParam?: (param: Additional_Info_Request | undefined) => void;
  communceErr?: string;
  provinceErr?: string;
  districtErr?: string;
  detailedAddressErr?: string;
  // provinces?: { code: string; name: string }[];
  // getDistrictByProvinceCode?: (code: string) => void;
  // district?: { code: string; name: string; provinceCode: string }[];
  // getCommunceByDistrictCode?: (code: string) => void;
  // communce?: { name: string; code: string; disrictCode: string }[];
  isHaveDomesticDebitCard?: boolean;
  address?: string;
  cardList?: DebitCardType[];
  suppplementalAddress?: string;
  // additionalAddress?: Additional_Info_Request;
  workingAddressProvice?: string;
  workingAddressCommunce?: string;
  workingAddressDistrict?: string;
  loading?: boolean;

  addressOther: AddressInterface;

  provinces?: Array<ICodes>;
  getDistrictByProvinceCode?: (code: string) => void;
  district?: { code: string; name: string; provinceCode: string }[];
  getCommunceByDistrictCode?: (code: string) => void;
  communce?: { name: string; code: string; disrictCode: string }[];
  setProvince?: Dispatch<SetStateAction<string>>;
  setCommunce?: Dispatch<SetStateAction<string>>;
  setDistrict?: Dispatch<SetStateAction<string>>;
  deliveryInfo: DeliveryInfoInterface;
};

const PhysicalCardView = (props: Props) => {
  const { deliveryInfo } = props;

  const dispatch = useAppDispatch();

  const additionalAddress = useAppSelector(
    (state: RootState) => state.updateAdditionalInfo.response
  );

  const [selectedValue, setSelectedValue] = useState('');
  const [additionalInfoRequest, setAdditionalInfoRequest] = useState<DeliveryInfoInterface>();

  const listProvince = props?.addressOther.province.list;
  const listDistrict = props?.addressOther.district.listOther;
  const listCommune = props?.addressOther.commune.listOther;
  const otherProvince = props?.addressOther.province.otherAddress;
  const otherDistrict = props?.addressOther.district.otherAddress;
  const otherCommune = props?.addressOther.commune.otherAddress;
  const detailAddress = deliveryInfo?.detailedAddress;

  const combineWorkingAddress = ` ${
    additionalAddress?.detailedAddress && additionalAddress?.detailedAddress?.length
      ? additionalAddress?.detailedAddress + ', '
      : ''
  } ${
    additionalAddress?.communceName && additionalAddress?.communceName.length
      ? additionalAddress?.communceName + ', '
      : ''
  } ${
    additionalAddress?.districtName && additionalAddress?.districtName?.length
      ? additionalAddress?.districtName + ', '
      : ''
  } ${additionalAddress?.provinceName}`;

  const handleSelectProvince = useCallback(
    (item: ICodes) => {
      dispatch(
        updateDeliveryInfoSuccess({
          ...deliveryInfo,
          provinceCode: item.code,
          provinceName: item.name,
          districtCode: '',
          districtName: '',
          communceCode: '',
          communceName: '',
        })
      );
      dispatch(updateOtherProvince(item));
      item.code && dispatch(getDistrictsByProvinceCode(item.code));
    },
    [deliveryInfo, dispatch]
  );

  const handleSelectDistrict = useCallback(
    (item: ICodes) => {
      dispatch(
        updateDeliveryInfoSuccess({
          ...deliveryInfo,
          districtCode: item.code,
          districtName: item.name,
          communceCode: '',
          communceName: '',
        })
      );
      dispatch(updateOtherDistrict(item));
      item.code && dispatch(getCommunesByDistrictCode(item.code));
    },
    [deliveryInfo, dispatch]
  );

  const handleSelectCommune = useCallback(
    (item: ICodes) => {
      dispatch(
        updateDeliveryInfoSuccess({
          ...deliveryInfo,
          communceCode: item.code,
          communceName: item.name,
        })
      );
      dispatch(updateOtherCommune(item));
    },
    [deliveryInfo, dispatch]
  );

  const addCommas = (num: string | undefined) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const removeNonNumeric = (num: string | undefined) => num?.toString().replace(/[^0-9]/g, '');
  useEffect(() => {
    props?.setDeliveryInfoRequestParam &&
      //   additionalInfoRequest &&
      props?.setDeliveryInfoRequestParam(additionalInfoRequest);
  }, [additionalInfoRequest, props]);

  useEffect(() => {
    // console.log(cardPickupData?.filter((item) => item?.name === deliveryInfo?.deliveryMethod))
    setSelectedValue(cardPickupData[2].name);
  }, []);

  useEffect(() => {


    if (props?.isHaveDomesticDebitCard) {
      setSelectedValue(cardPickup[0].name);
      dispatch(
        updateDeliveryInfoSuccess({
          ...deliveryInfo,
          deliveryMethod: cardPickup[0].name,
          deliveryMethodCode: cardPickup[0].code,
        })
      );
    } else {

      const itemShow: { name: string; code: string } = (HelperManager.isValid(
        deliveryInfo?.deliveryMethod
      ) && deliveryInfo?.deliveryMethod !== 'Tại điểm giao dịch')
        ? cardPickupData?.filter(
            (item: { name: string }) => item?.name === deliveryInfo?.deliveryMethod
          )[0]
        : cardPickupData[0];

      if (!itemShow) {
        return;
      }
      setSelectedValue(itemShow.name);
      dispatch(
        updateDeliveryInfoSuccess({
          ...deliveryInfo,
          deliveryMethod: itemShow.name,
          deliveryMethodCode: itemShow.code,
        })
      );
    }
  }, [props?.isHaveDomesticDebitCard]);

  useEffect(() => {
    let detailAdd = props.address;
    if (selectedValue === 'Nơi ở hiện tại') detailAdd = props.suppplementalAddress;
    if (selectedValue === 'Địa chỉ khác')
      detailAdd = `${additionalInfoRequest?.detailedAddress},${additionalInfoRequest?.communceName},${additionalInfoRequest?.districtName},${additionalInfoRequest?.provinceName}`;
    if (selectedValue === 'Chi nhánh/Phòng giao dịch phát hành thẻ') detailAdd = props.address;
    if (selectedValue === 'Đơn vị công tác') detailAdd = combineWorkingAddress;

    props?.setDeliveryAddress && props?.setDeliveryAddress(detailAdd);
  }, [selectedValue, additionalInfoRequest, props?.additionalAddress]);

  const DebitCardList = (card: Debit_Card_Type, index: number) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <IconBlackLogo height={hp(2)} style={{ marginTop: 7 }} />
        <Text style={Style.text}>
          <Text style={Style.bold_text}>
            {card?.productDescription
              ? `${card.productDescription}:`
              : `${card.brandName} ${card.currency}:`}
          </Text>{' '}
          {card.maskingCardNumber}
        </Text>
      </View>
    );
  };

  const renderBox = (item: ISaveDebitCard) => {
    let tempArrayy: DebitCardType[] = [];
    if (props?.cardList && props?.cardList?.length > 0) {
      tempArrayy = props?.cardList?.filter(
        (items) => items?.id?.toString() === item?.cardProductId
      );
    }

    return (
      <View style={Style.defaultRequestedView}>
        <Text style={Style.bold_text}>{item?.cardProductName}</Text>
        <View style={Style.subRequestView}>
          <View style={{ flex: 0.85 }}>
            <Text style={Style.smallText}>
              •<Text style={{ fontWeight: '600' }}> Card type: </Text>
              {tempArrayy[0]?.feePolicy}
            </Text>
            <Text style={Style.smallText}>
              •<Text style={{ fontWeight: '600' }}> {'Phương thức phát hành'}: </Text>
              {item?.issueType === 'REGULAR' || item?.issueType === 'regular'
                ? 'Thông thường'
                : 'Phát hành nhanh'}
            </Text>
            <Text style={Style.smallText}>
              •<Text style={{ fontWeight: '600' }}> {translate('issue_fee_payment')}: </Text>
              {item?.issueFeePayment === 'auto_debit' || item?.issueFeePayment === 'AUTO_DEBIT'
                ? 'Tự động ghi nợ tài khoản'
                : 'Nộp tiền mặt'}
            </Text>
            {item?.primaryAcctNoRequested &&
            item.primaryAcctNoRequested !== 'Tài khoản đăng ký mở mới' ? (
              <Text style={Style.smallText}>
                •
                <Text style={{ fontWeight: '600' }}>
                  {' '}
                  {translate('main_account_attached_card')}:{' '}
                </Text>
                {item?.primaryOldAcctNoRequested
                  ? item?.primaryOldAcctNoRequested
                  : `${item?.primaryAcctNoRequested} - ${item?.primaryCurrencyRequested ?? ''}`}
              </Text>
            ) : null}
            {!item?.existingPrimaryAcctRequested ? (
              <Text style={Style.smallText}>
                •
                <Text style={{ fontWeight: '600' }}>
                  {' '}
                  {translate('main_account_attached_card')}:{' '}
                </Text>
                Tài khoản đăng ký mở mới
              </Text>
            ) : null}
            {item?.secondaryAcctNoRequested && item?.subAccounts ? (
              <Text style={Style.smallText}>
                •<Text style={{ fontWeight: '600' }}> {translate('sub_account')}: </Text>
                {item?.secondaryOldAcctNoRequested
                  ? item?.secondaryOldAcctNoRequested
                  : `${item?.secondaryAcctNoRequested} - ${item?.secondaryCurrencyRequested ?? ''}`}
              </Text>
            ) : null}
            {!item?.existingSecondaryAcctRequested && item?.subAccounts ? (
              <Text style={Style.smallText}>
                •<Text style={{ fontWeight: '600' }}> {translate('sub_account')}: </Text>
                Tài khoản đăng ký mở mới
              </Text>
            ) : null}
            <Text style={Style.smallText}>
              •<Text style={{ fontWeight: '600' }}> {translate('fee_amount')}: </Text>
              {addCommas(removeNonNumeric(item?.feesReceivable?.toString())) + ' ' + 'VND'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.18,
              justifyContent: 'space-evenly',
            }}
          >
            <TouchableOpacity onPress={() => props.onUpdatePress && props.onUpdatePress(item)}>
              <IconEditGrey />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onDeletePress && props.onDeletePress(item.id ?? '')}
            >
              <IconTrashActive />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  function checkCurrency(accounts: AccountDetails[]) {
    if (accounts && accounts?.length) {
      return accounts.some((obj) => obj.currency === 'VND' || obj.currency === 'USD');
    }
  }

  return (
    <View style={Style.container}>
      <View style={Style.top_view}>
        <View style={Style.title_view}>
          <IconDebitCard height={32} width={32} />
          <Text style={Style.title_text}>{translate('service_physical_debit_card')}</Text>
        </View>

        {checkCurrency(props?.accountlist || []) || checkCurrency(props?.requestedAccount || []) ? (
          <TouchableOpacity style={Style.register_button} disabled={false} onPress={props.addPress}>
            <IconPlusGreen height={hp(2)} width={hp(2)} />
            <Text style={Style.button_text}>{translate('more_card')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={Style.register_button}
            disabled={false}
            // onPress={props.addPress}
          >
            <IconPlusGrey height={hp(2)} width={hp(2)} />
            <Text style={[Style.button_text, { color: Colors.text_grey }]}>
              {translate('more_card')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginVertical: 16, marginLeft: 64 }}>
        {!checkCurrency(props?.accountlist || []) &&
          !checkCurrency(props?.requestedAccount || []) && (
            <Text style={Style.textNormal}>
              {translate('register_valid_account_error_for_physical_card')}
            </Text>
          )}
        {props.debitCardList ? (
          props.debitCardList.map((card, index) => DebitCardList(card, index))
        ) : (
          <></>
        )}
        {props.existingRequestList &&
          props.existingRequestList.map((item) => {
            return renderBox(item);
          })}
      </View>
      {props?.existingRequestList && props?.existingRequestList?.length > 0 && (
        <View>
          <View style={[Style.cardPickView, { borderLeftWidth: 0, marginLeft: 64 }]}>
            <View style={Style.innerView}>
              <IconLocation />
              <Text style={Style.textHeading}>{translate('card_pick_heading')}</Text>
            </View>
            <View style={Style.dropdownView}>
              {props?.isHaveDomesticDebitCard ? (
                <CardPickupDropdown
                  data={cardPickup}
                  onChangeDropdown={(item) => {
                    props?.setDeliveryMethod && props.setDeliveryMethod(item.code);
                  }}
                  dropdown
                  labelField="name"
                  placeholder={cardPickup[0].name}
                  valueField="id"
                />
              ) : (
                <CardPickupDropdown
                  data={cardPickupData}
                  dropdown
                  labelField="name"
                  placeholder={selectedValue}
                  valueField="id"
                  onChangeDropdown={(item) => {
                    if (item?.name === selectedValue) return;
                    props?.setDeliveryMethod && props?.setDeliveryMethod(item.code);
                    setSelectedValue(item.name);
                    // dispatch(resetAdditional());
                    // dispatch(resetAddress());
                    dispatch(
                      updateDeliveryInfoSuccess({
                        ...deliveryInfo,
                        deliveryMethod: item?.name,
                        deliveryMethodCode: item.code,
                      })
                    );
                    // dispatch(getProvinceList());
                    setAdditionalInfoRequest({
                      ...additionalInfoRequest,
                      deliveryMethod: item?.name,
                      detailedAddress: '',
                    });
                  }}
                />
              )}
            </View>
          </View>

          {
            // delivery address
            props?.isHaveDomesticDebitCard ? (
              <View style={Style.cardPickView}>
                <View style={Style.innerView}>
                  <Text style={Style.textHeading}>{translate('branch_address')}</Text>
                </View>
                <View style={Style.dropdownView}>
                  <TextInput
                    style={[Style.textInput, { marginLeft: 55, marginTop: 20 , color: Colors.grey_black}]}
                    multiline={true}
                  >
                    {props?.address ?? ''}
                  </TextInput>
                </View>
              </View>
            ) : selectedValue !== 'Địa chỉ khác' ? (
              <View style={Style.cardPickView}>
                <View style={Style.innerView}>
                  <Text style={Style.textHeading}>
                    {selectedValue === 'Nơi ở hiện tại' && translate('current_address')}
                    {selectedValue === 'Đơn vị công tác' && translate('working_address')}
                    {selectedValue === 'Chi nhánh/Phòng giao dịch phát hành thẻ' && translate('branch_address')}

                  </Text>
                </View>

                <View style={Style.dropdownView}>
                  <TextInput
                    style={[
                      Style.textInput,
                      { marginLeft: 55, marginTop: 20, backgroundColor: Colors.light_grey },
                    ]}
                    multiline={true}
                    editable={false}
                  >
                    {selectedValue === 'Nơi ở hiện tại' && props.suppplementalAddress}
                    {selectedValue === 'Đơn vị công tác' && <Text>{combineWorkingAddress ?? ''}</Text>}
                    {selectedValue === 'Chi nhánh/Phòng giao dịch phát hành thẻ' && props.address}
                  </TextInput>

                  {
                    (selectedValue === 'Đơn vị công tác' &&
                      combineWorkingAddress.trim()?.length === 0 && (
                        <Text
                          style={[Style.error, { marginLeft: wp(7) }]}
                        >{`Vui lòng nhập địa chỉ cơ quan tại phần thông tin bổ sung của thẻ`}</Text>
                      ))}
                </View>
              </View>
            ) : (
          <>
            <View
              style={{
                padding: 16,
                backgroundColor: Colors.white,
                marginVertical: 12,
                borderRadius: 8,
                marginLeft: wp(10),
                marginRight: 10,
                marginTop: -10,
              }}
            >
              <InputField
                styleDropdown={Style.dropdownStyle}
                dropdown
                label={translate('city')}
                data={listProvince ?? []}
                labelField={'name'}
                valueField={'code'}
                placeholder={HelperManager.isValid(deliveryInfo?.provinceCode) ? deliveryInfo?.provinceName ?? '' :  translate('select')}
                mandatory
                onChangeDropdown={(item: ICodes) => handleSelectProvince(item)}
              />
              {props?.provinceErr && <Text style={Style.error}>{props?.provinceErr ?? ''}</Text>}

              <InputField
                disabled={!deliveryInfo?.provinceCode}
                styleDropdown={Style.dropdownStyle}
                dropdown
                label={translate('district')}
                data={listDistrict ?? []}
                labelField={'name'}
                valueField={'code'}
                placeholder={HelperManager.isValid(deliveryInfo?.districtCode) ? deliveryInfo?.districtName ?? '' :translate('select')}
                mandatory
                onChangeDropdown={(item: ICodes) => handleSelectDistrict(item)}
              />
              {props?.districtErr && <Text style={Style.error}>{props?.districtErr ?? ''}</Text>}

              <InputField
                disabled={!deliveryInfo?.districtCode}
                styleDropdown={Style.dropdownStyle}
                dropdown
                label={translate('communce')}
                data={listCommune ?? []}
                labelField={'name'}
                valueField={'code'}
                placeholder={HelperManager.isValid(deliveryInfo?.communceCode) ? deliveryInfo?.communceName ?? '' :translate('select')}
                mandatory
                onChangeDropdown={(item: ICodes) => handleSelectCommune(item)}
              />
              {props?.communceErr && <Text style={Style.error}>{props?.communceErr ?? ''}</Text>}
              <InputField
                textStyling={Style.fontStyle}
                styleDropdown={Style.dropdownStyle}
                label={translate('detailed_address')}
                mandatory
                onChangeText={(e) => {
                  {
                        dispatch(
                          updateDeliveryInfoSuccess({ ...deliveryInfo, detailedAddress: e })
                        );
                  }
                }}
                value={deliveryInfo?.detailedAddress}
                cancel={() =>
                  dispatch(updateDeliveryInfoSuccess({ ...deliveryInfo, detailedAddress: '' }))
                }
              />
              {props?.detailedAddressErr && (
                <Text style={Style.error}>{props?.detailedAddressErr ?? ''}</Text>
              )}
            </View>
          </>
            )
          }
        </View>
      )}
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: 16,
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    borderBottomColor: Colors.border_color,
    padding: 16,
  },
  title_view: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  register_button: {
    flexDirection: 'row',
  },
  button_text: {
    fontSize: hp(1.4),
    fontWeight: '600',
    marginLeft: 5,
    color: Colors.app_green,
  },
  title_text: {
    marginLeft: wp(2),
    color: Colors.black,
    fontSize: hp(1.6),
    fontWeight: '600',
  },
  text: {
    fontSize: hp(1.4),
    padding: 6,
    paddingLeft: 12,
    color: Colors.app_black,
    lineHeight: 24,
  },
  bold_text: {
    fontWeight: '600',
    color: Colors.black,
    lineHeight: 24,
    fontSize: 16,
  },
  smallText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light_black,
    alignItems: 'center',
    lineHeight: 20,
    marginBottom: 4,
  },
  defaultRequestedView: {
    marginTop: 16,
    marginRight: 16,
    backgroundColor: Colors.light_grey,
    paddingVertical: 12,
    paddingStart: 16,
    borderRadius: 8,
  },
  subRequestView: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  cardPickView: {
    margin: 10,
    flex: 1,
    marginLeft: 74,
    flexDirection: 'row',
    borderLeftColor: Colors.border_color,
    borderLeftWidth: 1,
    marginTop: -10,
    paddingTop: 15,
  },
  innerView: { flexDirection: 'row', flex: 0.3, marginTop: 18 },
  textHeading: { fontSize: 16, fontWeight: '600', marginLeft: 10 },
  dropdownView: { flex: 1, marginTop: -15 },
  addressView: { marginLeft: hp(7), flexDirection: 'row', margin: 10, flex: 1 },
  innerAddressView: { flexDirection: 'row', flex: 0.3, marginTop: 10 },
  addressHeading: { fontSize: 18, fontWeight: '600', marginLeft: 10 },
  textInputView: {
    flex: 0.7,
    marginLeft: 12,
    backgroundColor: Colors.border_grey,
    borderRadius: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.border_grey,
    fontSize: 16,
    color: Colors.text_grey_dark,
    paddingHorizontal: 14,
    fontWeight: '400',
    paddingTop: 17,
    paddingBottom: 17,
  },
  error: {
    color: Colors.red,
    fontSize: 16,
    lineHeight: 24,
    flex: 0.7,
    fontWeight: '400',
  },
  addressText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 0.7,
    fontWeight: '400',
    color: Colors.black,
  },
  dropdownStyle: { marginRight: -15 },
  dropdownBackgound: { marginRight: -15, backgroundColor: Colors.light_grey },
  dropdownBackgoundVisiable: { marginRight: -15, backgroundColor: Colors.white },
  fontStyle: { fontWeight: '300', fontSize: 16 },
  textNormal: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.grey_text,
  },
  options_view: {
    padding: 16,
    backgroundColor: Colors.white,
    marginVertical: 12,
    marginRight: 10,
    marginTop: -10,
    marginLeft: wp(9),
    borderLeftColor: Colors.border_color,
    borderLeftWidth: 1,
    paddingLeft: wp(2),
    paddingBottom: 0,
    marginBottom: 20,
  },
});

export default PhysicalCardView;
