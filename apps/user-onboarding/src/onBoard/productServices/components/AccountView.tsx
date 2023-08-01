import { IconBlackLogo, IconOpenAccount, IconPlusGreen, IconTrashActive } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { AccountDetails } from '@screens/transactionDetailETB/types/ProductServicesRegistrationInterface';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { Pending_Account_List } from '../typings';
import DropDownField from './DropDownField';

type Props = {
  data: Array<AccountDetails>;
  products?: any;
  error?: boolean;
  loading?: boolean;
  addAccount: (item: any) => void;
  requestedAccount: Array<AccountDetails>;
  deleteAccount: (e: number) => void;
  onSelectProduct: (e: any, index: number) => void;
  existingRequestAccount?: Pending_Account_List[];
  deleteExistingRequest?: (e: string) => void;
  onSelectProductUpdate?: (id: string, e: any) => void;
};

const AccountView = (props: Props) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  //  Update filteredProducts whenever props.data changes
  useEffect(() => {
    const countCurrencyOccurrences = (currency: string) => {
      return (
        props?.data?.filter((account) => account?.currency === currency).length +
        props?.requestedAccount?.filter((item) => item?.currency === currency).length
      );
    };
    const filtered = props?.products?.products?.content
      .filter((product: any) => {
        const currencyOccurrences = countCurrencyOccurrences(product?.currencyName);
        return !(currencyOccurrences >= 3);
      })
      .map((item: any) => ({
        ...item,
        productName: `${item?.productCode} - ${item?.productName}`,
      }));
    setFilteredProducts(filtered);
  }, [props.requestedAccount, props.addAccount]);

  // Account get from backend
  const renderAccountList = (account: AccountDetails, index: number) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconBlackLogo height={hp(2)} />
        <Text style={Style.text}>
          <Text style={Style.bold_text}>
            {translate('account')} {props?.data?.length > 1 ? index + 1 : ''}
          </Text>
          :{' '}
          {account?.oldAccountNumber
            ? `${account?.oldAccountNumber} (${translate('new_account_no')}: ${
                account?.accountNumber
              }) - ${account?.currency}`
            : `${account?.accountNumber} - ${account?.currency}`}
        </Text>
      </View>
    );
  };

  const disableAddAccount = !filteredProducts || !filteredProducts.length;

  return (
    <>
      <View
        style={[
          Style.box_style,
          {
            borderColor: props.error ? Colors?.red : Colors.white,
          },
        ]}
      >
        <View style={Style.top_view}>
          <View style={Style.title_view}>
            <IconOpenAccount height={hp(3)} width={hp(3)} />
            <Text style={Style.title_text}>{translate('service_deposit_account')}</Text>
          </View>
          <TouchableOpacity
            disabled={disableAddAccount || props?.loading}
            style={{
              ...Style.register_button,
              opacity: disableAddAccount || props?.loading ? 0.5 : 1,
            }}
            onPress={() => props?.addAccount(filteredProducts[0])}
          >
            <IconPlusGreen height={hp(2)} width={hp(2)} />
            <Text
              style={{
                ...Style.button_text,
                color: disableAddAccount || props?.loading ? Colors.grey : Colors.border_green,
              }}
            >
              {translate('more_account')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={Style.account_area_view}>
          <>
            {props?.data ? (
              props?.data?.map((account, index) => renderAccountList(account, index))
            ) : (
              <></>
            )}
            {(props?.requestedAccount?.length !== 0 ||
              props?.existingRequestAccount?.length !== (0 || undefined)) && (
              <View style={Style.bottom_view}>
                {props?.requestedAccount?.map((item, index) => {
                  const accountNumber =
                    (props?.data?.length ?? 0) +
                    (props?.existingRequestAccount?.length ?? 0) +
                    index +
                    1;

                  return (
                    <View style={Style.dropdown_view} key={index}>
                      <Text style={Style.bold_text}>
                        {translate('account')}
                        {accountNumber}
                      </Text>
                      <DropDownField
                        data={filteredProducts}
                        labelField="productName"
                        onSelectProduct={(selectedItem) =>
                          props?.onSelectProduct(selectedItem, index)
                        }
                        placeholder={item.productName}
                      />
                      <TouchableOpacity onPress={() => props?.deleteAccount(index)}>
                        <IconTrashActive style={Style.trash_icon_style} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}
          </>
        </View>
      </View>
    </>
  );
};

const Style = StyleSheet.create({
  top_view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    borderBottomColor: Colors.border_color,
    padding: 16,
  },
  account_area_view: {
    marginLeft: wp(8.5),
    marginVertical: 16,
  },
  box_style: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  title_view: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  register_button: {
    flexDirection: 'row',
  },
  button_text: {
    color: Colors.border_green,
    fontSize: hp(1.4),
    fontWeight: '600',
    marginLeft: 5,
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
  },
  dropdown_view: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  bold_text: {
    fontWeight: '600',
    color: Colors.black,
    fontSize: hp(1.5),
    lineHeight: 24,
  },
  trash_icon_style: { marginLeft: 16 },
  bottom_view: {
    borderColor: Colors.app_background,
    borderTopWidth: 1,
    marginTop: 15,
    marginRight: 16,
  },
});
export default AccountView;
