import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Account, AccountProduct } from '@screens/productAndService/typings';
import Colors from '@screens/productAndService/assets/Colors';
import Images from '@screens/productAndService/assets/Images';
import InputTextBox from '@screens/productAndService/components/InputTextBox';
import { translate } from '@screens/productAndService/assets/translations/translate';
import { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux/hooks';

type Props = {
  account?: Account;
  accounts?: Account[];
  productData?: any[];
  onRemoveAccount?: (data: Account | undefined) => void;
  onSelectProduct?: (index: AccountProduct) => void;
  index?: number;
};

const AccountServiceItemView = (props: Props) => {
  const { productData, onSelectProduct, account } = props;

  const accountVND = useAppSelector((state: RootState) => state.productService?.isCountVNDAccount);
  const accountUSD = useAppSelector((state: RootState) => state.productService?.isCountUSDAccount);

  const [accountTypeList, setAccountTypeList] = useState<any | undefined>(undefined);

  //call when list request chage
  useEffect(() => {
    // Check there is at least 1 DOMESTIC debit card request

    const listData = new Array<any>();

    if (account?.product === undefined) {
      if (accountUSD < 3) {
        listData.push(props?.productData?.filter((type) => type.currencyName === 'USD')[0]);
      }
      if (accountVND < 3) {
        listData.push(props?.productData?.filter((type) => type.currencyName === 'VND')[0]);
      }
    } else {
      if (accountUSD >= 3 && account?.product?.currencyName === 'USD') {
        listData.push(props?.productData?.filter((type) => type.currencyName === 'USD')[0]);
      }
      if (accountVND >= 3 && account?.product?.currencyName === 'VND') {
        listData.push(props?.productData?.filter((type) => type.currencyName === 'VND')[0]);
      }
      if (accountUSD < 3) {
        listData.push(props?.productData?.filter((type) => type.currencyName === 'USD')[0]);
      }
      if (accountVND < 3) {
        listData.push(props?.productData?.filter((type) => type.currencyName === 'VND')[0]);
      }
    }

    setAccountTypeList(listData);
  }, [accountVND, accountUSD]);

  return (
    <>
      <View style={Style.item_view}>
        <View style={Style.infor_box}>
          <Text style={Style.accountName}>
            {translate('account')} {props?.index ?? 0 + 1}
          </Text>
        </View>

        <View style={Style.infor_box}>
          <InputTextBox
            // TODO: Fix typecheck for below line, cast to any hides the error
            value={account?.product as any}
            dropdown
            disabled={false}
            dropdownWidth={wp(71)}
            products={
              accountTypeList === undefined || accountTypeList[0] === undefined
                ? productData
                : accountTypeList
            }
            onSelectProduct={(productSelect) => onSelectProduct?.(productSelect)}
            viewStyle={Style.drop_down}
            styleTextInput={Style.dropdown_view}
          />
        </View>

        <TouchableOpacity
          style={Style.button_box}
          onPress={() => props?.onRemoveAccount?.(account)}
        >
          <Image resizeMode="cover" source={Images.trash} style={Style.button_box} />
        </TouchableOpacity>
      </View>
      {account?.product === undefined && (
        <Text style={Style.warn}>{translate('warn_for_open_account')}</Text>
      )}
    </>
  );
};

const Style = StyleSheet.create({
  status_box: {
    width: wp(15),
  },
  infor_box: {
    flexDirection: 'row',
    marginTop: wp(1),
    alignItems: 'flex-start',
    marginLeft: wp(1.8),
  },
  accountName: {
    fontSize: hp(1.2),
    fontWeight: '600',
    marginBottom: hp(0.5),
  },
  name_style: {
    width: wp(22),
    fontSize: hp(1.5),
    fontWeight: '400',
  },
  title_style: {
    fontSize: hp(1.5),
    fontWeight: '400',
    marginRight: 10,
  },
  value_style: {
    width: wp(12),
    fontSize: hp(1.5),
    fontWeight: '800',
  },
  date_style: {
    width: wp(13),
    fontSize: hp(1.5),
    fontWeight: '400',
    textAlign: 'left',
  },
  outer_view: {
    flexDirection: 'row',
    marginVertical: hp(1),
  },
  item_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot_view: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.black,
    marginRight: wp(2),
  },
  button_box: {
    alignSelf: 'center',
    height: hp(2),
    width: hp(2),
    marginTop: hp(0.2),
    right: wp(0.5),
    position: 'absolute',
  },
  update_view: {
    position: 'absolute',
    right: 0,
    top: hp(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: hp(2),
    width: '18%',
  },
  drop_down: { width: wp(71), marginRight: wp(2), padding: 0 },
  warn: {
    marginLeft: wp(17),
    marginTop: hp(1),
    width: wp(28),
    color: Color.error_red,
    fontSize: hp(1.2),
  },
  dropdown_view: { borderColor: Colors.border_grey, height: hp(4) },
});

export default AccountServiceItemView;
