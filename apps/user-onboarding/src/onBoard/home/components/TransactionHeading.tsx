import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';

type Props = {
  stt_id?: string;
  code_id?: string;
  name_id?: string;
  date_id?: string;
  status_id?: string;
};

const TransactionHeading = (props: Props) => {
  return (
    <View style={Styles.outer_view}>
      <Text testID={props?.stt_id} style={Styles.stt_style}>
        {translate('stt')}
      </Text>
      <Text testID={props?.code_id} style={Styles.ds_style}>
        {translate('id_number')}
      </Text>
      <Text testID={props?.name_id} style={Styles.name_style}>
        {translate('full_name')}
      </Text>
      <Text testID={props?.date_id} style={Styles.date_style}>
        {translate('status_changed_date')}
      </Text>
      <Text testID={props?.status_id} style={Styles.status_style}>
        {translate('status')}
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  outer_view: {
    flexDirection: 'row',
    backgroundColor: Color.light_grey,
    justifyContent: 'space-between',
    marginVertical: hp(1),
    paddingVertical: hp(1),
    width: '100%',
    alignItems: 'center'
    
    
  },
  stt_style: {
    flex:0.1,
    fontSize: hp(1.1111),
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.text_gray
  },
  ds_style: {
    flex:0.2,
    fontSize: hp(1.1111),
    fontWeight: '400',
    color: Colors.text_gray
  },
  name_style: {
    flex:0.22,
    fontSize: hp(1.1111),
    fontWeight: '400',
    color: Colors.text_gray
  },
  date_style: {
    flex:0.15,
    fontSize: hp(1.1111),
    fontWeight: '400',
    textAlign: 'left',
    color: Colors.text_gray
  },
  status_style: {
    flex:0.2,
    fontSize: hp(1.1111),
    fontWeight: '400',
    textAlign: 'right',
    paddingRight: wp(3),
    color: Colors.text_gray,
  },
});

export default TransactionHeading;
