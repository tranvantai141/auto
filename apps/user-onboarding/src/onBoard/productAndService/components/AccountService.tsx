import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { Account, AccountProduct } from '@screens/productAndService/typings';
import AccountServiceItemView from '@screens/productAndService/components/AccoutServiceItemView';
import { useAppDispatch } from '../../../redux/hooks';
import { defaultProduct } from '@dummy/ListProducts';

import {
  addAccount,
  changeDataAccount,
  removeAccount,
} from '@screens/productAndService/redux/actions/ProductAndServiceAction';
import { IconOpenAccount, IconPlusGreen } from '@assets/images';

type Props = {
  data?: Account[];
  products?: any;
  error?: boolean;
};

const AccountService = (props: Props) => {
  const dispatch = useAppDispatch();

  function onPressAddAccount() {
    const idAccount = Math.floor(Date.now() / 10);

    const productVND = props?.data?.filter(
      (acc) => acc?.product?.productCode === defaultProduct?.productCode
    );

    const accountData: Account = {
      product: (productVND?.length ?? 0) < 3 ? defaultProduct : undefined,
      accountType: '',
      openAccountRequestId: '',
      accountID: idAccount,
      isSelected: false,
    };

    dispatch(addAccount(accountData));
  }

  function onPressDeleteAccount(account: Account | undefined) {
    dispatch(removeAccount(account));
  }

  function onProductSelected(product: AccountProduct, account: Account) {
    // account.product = testProduct;
    const newClonedData = { ...account, product: product };
    dispatch(changeDataAccount(newClonedData));
  }

  const renderItem = (item: number, account: Account) => {
    return (
      <AccountServiceItemView
        productData={props?.products[0]?.subProducts}
        account={account}
        key={item}
        index={item}
        onSelectProduct={(product) => onProductSelected(product, account)}
        onRemoveAccount={(product) => onPressDeleteAccount(product)}
      />
    );
  };

  return (
    <>
      <View
        style={[
          Style.box_style,
          {
            borderColor: props.error ? Colors?.red : Colors.white,
            marginVertical: props.error ? hp(0.5) : hp(0),
          },
        ]}
      >
        <View style={Style.top_view}>
          <IconOpenAccount />
          <Text style={Style.title_text}>{translate('service_deposit_account')}</Text>
          {props.data && props?.data?.length < 6 && (
            <TouchableOpacity style={Style.register_button} onPress={() => onPressAddAccount()}>
              <IconPlusGreen />
              <Text style={Style.button_text}>{translate('more_account')}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={Style.account_area_view}>
          {props.data ? props.data.map((account, index) => renderItem(index + 1, account)) : <></>}
        </View>
      </View>
      {props.error && <Text style={Style.error_text}>{translate('validation_card_msg')}</Text>}
    </>
  );
};

const Style = StyleSheet.create({
  view: {
    marginTop: hp(1),
    height: hp(66),
    width: wp(94),
  },
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border_color,
    padding: 10,
    paddingTop: 0,
    paddingLeft: 0,
  },
  account_area_view: {
    flexDirection: 'column',
    paddingTop: 0,
    width: wp(90),
    marginLeft: wp(2.5),
  },
  box_style: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 12,
    padding: 16,
  },
  register_button: {
    marginTop: hp(0.5),
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },
  button_text: {
    color: Colors.border_green,
    fontSize: hp(1.2),
    fontWeight: '600',
    marginLeft: 5,
  },
  title_text: {
    marginLeft: wp(1),
    color: Colors.grey_black,
    fontSize: hp(1.3),
    fontWeight: '600',
  },
  right_icon_view: {
    right: 10,
    position: 'absolute',
    top: 10,
  },
  check_icon: {
    height: hp(2.2),
    width: hp(2.2),
  },
  error_text: {
    color: Colors.red,
    fontSize: hp(1.3),
    fontWeight: '400',
    padding: 5,
  },
});
export default AccountService;
