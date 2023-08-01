import { ITransactionHeading } from '@interfaces/I_Transactions';
import { TestIds } from '../assets/TestIds';
import React from 'react';
import { StyleSheet, FlatList, View, Image, Text } from 'react-native';
import TransactionHeading from './TransactionHeading';
import TransactionItemView from './TransactionItemView';
import { IPendingTransactionList } from '@interfaces/apis/I_Pending_transaction_list';
import Loader from '@components/loaders/ActivityIndicator';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import { heightPercentageToDP, widthPercentageToDP } from '@assets/sizes/Sizes';

type Props = {
  data?: Array<IPendingTransactionList>;
  loading?: boolean;
  onPressItem?: (item: IPendingTransactionList) => void;
};

const TransactionList = (props: Props) => {
  if (props?.loading) {
    return (
      <View style={Styles.list_view}>
        <Loader />
      </View>
    );
  }

  if ((props?.data?.length ?? 0) === 0) {
    return (
      <View style={Styles.list_view}>
        <View
          style={{
            width: '100%',
            height: heightPercentageToDP(40),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image style={{ marginBottom: 20 }} source={Images.empty} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              width: widthPercentageToDP(60),
              textAlign: 'center',
            }}
          >
            {translate('no_data')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={Styles.list_view}>
      {props?.loading ? (
        <Loader />
      ) : (
        <FlatList
          data={props?.data}
          renderItem={({ item, index }) => {
            return (
              <>
                {/* {index === 0 && (
                  <TransactionHeading
                    code_id={ITransactionHeading[index] + index}
                    date_id={ITransactionHeading[index] + index}
                    stt_id={ITransactionHeading[index] + index}
                    status_id={ITransactionHeading[index] + index}
                    name_id={ITransactionHeading[index] + index}
                  />
                )} */}
                <TransactionItemView
                  code_id={ITransactionHeading[index] + index + TestIds.item_name}
                  date_id={ITransactionHeading[index] + index + TestIds.item_name}
                  stt_id={ITransactionHeading[index] + index + TestIds.item_name}
                  status_id={ITransactionHeading[index] + index + TestIds.item_name}
                  name_id={ITransactionHeading[index] + index + TestIds.item_name}
                  item={item}
                  index={index + 1}
                  onPress={() => props.onPressItem?.(item)}
                />
              </>
            );
          }}
        />
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  list_view: {
    width: '100%',
    flex: 1,
  },
});

export default TransactionList;
