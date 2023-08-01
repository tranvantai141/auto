import { IconDropdown, IconGreenCheck } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Colors from 'src/common/utils/Colors';
import { ListItemAccounts } from 'src/typings/global';
import Color from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { AccountList } from '@screens/productServices/typings';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { DigiInterface } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import { updateDigiBankAccount } from '@screens/productServices/redux/slices/GetDigibankRegisteredInfoSlice';

type Props = {
  leftHeading?: boolean;
  isRequired?: boolean;
  dropdownHeading?: string;
  placeholderText?: string;
  onpressDropdownIcon?: () => void;
  isVisible?: boolean;
  onBackdropPress?: () => void;
  isBlueBackground?: boolean;
  errorMessage?: string;
  data?: Array<ListItemAccounts>;
  placeholder?: string;
  onChangeText: (item: ListItemAccounts) => void;
  value?: string | null;
  currency?: string | null;
  view?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
};

const AllAccountsDropdown = (props: Props) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const getDigibankDetail = useAppSelector((state) => state.getRegDigibankInfo.response);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeDefaultValues();
  }, [props?.data]);

  const selectedItem = (item: any) => {
    setOpenDropdown(false);
    const value: string = item?.item?.currency
      ? item?.item?.oldAccountNumber
        ? `${item?.item?.oldAccountNumber ?? ''} (Số tài khoản mới: ${
            item?.item?.accountNumber ?? ''
          }) - ${item?.item?.currency ?? ''}`
        : `${item?.item?.accountNumber ?? ''}  - ${item?.item?.currency ?? ''}`
      : item?.item?.accountNumber ?? '';

    const digiBank: DigiInterface = {
      electronicBanking: {
        accountCurrencyRequested: item?.item?.currency ?? '',
        accountNumberRequested: item?.item?.accountNumber ?? '',
        oldAccountNumberRequested : item?.item?.oldAccountNumber ?? '',
        existingAccountRequested: (item?.item?.currency ?? '').trim().length > 0 ? true : false,
      },
    };
    dispatch(updateDigiBankAccount(digiBank));

    setSelectedValue(value);
  };

  function initializeDefaultValues() {
    if (props?.data?.length) {
      const hasNewOpenAccount = props.data?.some((acc: AccountList) => !acc?.acctStatus);

      // console.log(hasNewOpenAccount)
      // console.log(selectedValue)
      // console.log(hasNewOpenAccount && selectedValue)

      if (
        (hasNewOpenAccount && selectedValue) ||
        (selectedValue && selectedValue !== 'Tài khoản đăng ký mở mới')
      )
        return;

      const vndAccountList: AccountList[] = props.data?.filter((acc) => acc.currency === 'VND');
      const usdAccountList: AccountList[] = props.data?.filter((acc) => acc.currency === 'USD');

      const account = vndAccountList?.length > 0  ? vndAccountList[0] : (usdAccountList?.length > 0 ? usdAccountList[0] : props?.data[0]);

      const value: string = account.oldAccountNumber
        ? `${account.oldAccountNumber} (Số tài khoản mới: ${account.accountNumber}) - ${account.currency}`
        : `${account.accountNumber} - ${account.currency}`;

      const digiBank: DigiInterface = {
        electronicBanking: {
          accountCurrencyRequested: account?.currency ?? '',
          accountNumberRequested: account?.accountNumber ?? '',
          oldAccountNumberRequested : account?.oldAccountNumber ?? '',
          existingAccountRequested: (account?.currency ?? '').trim().length > 0 ? true : false,
        },
      };

      dispatch(updateDigiBankAccount(digiBank));


      if (!selectedValue) {
        // const account = account;
        const accCurrency = account?.currency ? ('-' + account.currency) : ''
        const value = account.oldAccountNumber
          ? `${account.oldAccountNumber} (Số tài khoản mới: ${account.accountNumber})${accCurrency}`
          : `${account.accountNumber}${accCurrency}`;
        setSelectedValue(value);

      }
      else setSelectedValue(value);


    }
  }

  const renderItem = (item: ListRenderItemInfo<ListItemAccounts>) => {
    const account = item.item;

    return (
      <TouchableOpacity style={Style.itemStyle} onPress={() => selectedItem(item)}>
        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            color: selectedValue?.includes(account?.accountNumber ?? '')
              ? Color.border_green
              : Color.grey_black,
          }}
        >
          {account?.oldAccountNumber
            ? `${account?.oldAccountNumber} (${translate('new_account_no')}: ${
                account?.accountNumber
              }) - ${account?.currency}`
            : `${account?.accountNumber} ${account?.currency ? '-' : ''} ${account?.currency}`}
        </Text>
        {selectedValue?.includes(account?.accountNumber ?? '') && (
          <IconGreenCheck style={Style.iconStyle} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={[Style.topView, props?.view]}>
        <View style={Style.rightTextInputView}>
          <Text style={Style.dropdownPlaceholder}>{props.dropdownHeading}</Text>
        </View>
        <TouchableOpacity onPress={() => setOpenDropdown(!openDropdown)} style={Style.onTouchPress}>
          <Text style={{ flex: 0.8 }}>
            {selectedValue || (props.value ?? '') + '-' + (props?.currency ?? '')}
          </Text>
          <IconDropdown style={{ alignSelf: 'flex-end' }} />
        </TouchableOpacity>
        {openDropdown && (
          <View
            style={[
              Style.flatlistView,
              { height: (props?.data?.length ?? 0) > 3 ? hp(15) : undefined },
            ]}
          >
            <FlatList
              data={props?.data ?? []}
              renderItem={(item) => renderItem(item)}
              nestedScrollEnabled
            />
          </View>
        )}
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  rightTextInputView: { flexDirection: 'column' },
  dropdownPlaceholder: {
    fontSize: hp(1.5),
    fontWeight: '600',
    color: Color.black,
    textAlignVertical: 'bottom',
  },
  placeholder: { fontSize: wp(2), color: Color.grey_black },
  topView: { flexDirection: 'column', marginLeft: wp(2.5) },
  error: { color: Color.error_red },
  flatlistView: { 
    backgroundColor: Color.white, 
    marginTop: 40, 
    position:'absolute',
    top:50,
    borderWidth:0.5,
    borderRadius:8,
    borderColor:Colors.border_grey, 
    width:hp(51)
  },
  iconStyle: { alignSelf: 'center', marginRight: 20, marginTop: 20 },
  itemStyle: { flexDirection: 'row', justifyContent: 'space-between', margin: 5, marginBottom: 15 },
  onTouchPress: {
    justifyContent: 'space-between',
    backgroundColor: Color.white,
    flex: 1,
    flexDirection: 'row',
    padding: hp(1.5),
    borderColor: Colors.border_grey,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
  },
});
export default AllAccountsDropdown;
