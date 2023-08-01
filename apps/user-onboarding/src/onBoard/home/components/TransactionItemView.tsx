import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IPendingTransactionList } from '@interfaces/apis/I_Pending_transaction_list';
import { translate } from '../assets/translations/translate';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StatusChip from '@screens/transactionDetail/components/common/StatusChip';
import { formatFuzzyDate } from 'src/common/utils/fuzzyDateParser';
import Colors from '../assets/Colors';

type Props = {
  item?: IPendingTransactionList;
  stt_id?: string;
  code_id?: string;
  name_id?: string;
  date_id?: string;
  status_id?: string;
  index?: number;
  onPress: () => void;
};

const TransactionItemView = (props: Props) => {
  const { item } = props;
  return (
    <TouchableOpacity onPress={props.onPress} style={Style.outer_view}>
      <Text testID={props?.stt_id} style={Style.stt_style}>
        {item?.id || props?.index}
      </Text>
      <Text testID={props?.code_id} style={Style.gd_style}>
        {item?.idCardNumber ?? ''}
      </Text>
      <Text testID={props?.name_id} style={Style.name_style}>
        {item?.customerFullName}
      </Text>
      <Text testID={props?.date_id} style={Style.date_style}>
        {formatFuzzyDate(item?.updatedAt ?? '', 'DD/MM/yyyy')}
      </Text>
      {item?.transactionStatus !== 'SUCCESS' ? (
        <View style={[{ marginVertical: hp(1) },Style.status_view_style]}>
          <StatusChip status="red" title={translate('status_no_success')} />
        </View>
      ) : (
        <View style={[{ marginVertical: hp(1)},Style.status_view_style]}>
          <StatusChip status="green" title={translate('status_success')} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  status_box: {
    width: wp(15),
  },
  status_style: {
    fontSize: hp(1.2962),
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 8,
    backgroundColor: Color.light_grey,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Color.light_grey,
    overflow: 'hidden',
    color: Color.neutral_grey,
    alignSelf: 'flex-end',
  },
  name_style: {
    flex:0.22,
    fontSize: hp(1.2962),
    fontWeight: '400',
    color: Colors.text_black,

  },
  gd_style: {
    flex:0.2,
    fontSize: hp(1.2962),
    fontWeight: '400',
    color: Colors.text_black,
  },
  stt_style: {
    flex:0.1,
    fontSize: hp(1.2962),
    fontWeight: '400',
    color: Colors.text_black,
    textAlign: 'center',
  },
  date_style: {
    flex:0.18,
    fontSize: hp(1.2962),
    fontWeight: '400',
    color: Colors.text_black,
    textAlign: 'left',
  },
  outer_view: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  status_view_style:{alignItems:'center',flex:0.2}
});

export default TransactionItemView;
