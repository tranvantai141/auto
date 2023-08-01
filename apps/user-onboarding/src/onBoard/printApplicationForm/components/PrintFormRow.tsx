import { View, Text } from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import PrintItemView from './PrintItemView';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { IconDocumentBlack } from '@assets/images';

interface IPrintFormRow {
  rowTitle: string;
  printActionTitle: string;
  onPressPrintForm: () => void;
  onPressSeeDetails: () => void;
  isPrintDisabled: boolean;
}
const PrintFormRow = (props: IPrintFormRow) => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        marginBottom: 20,
      }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <IconDocumentBlack />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: hp(1.5), fontWeight: '400', color: Colors.dark_black }}>
          {props.rowTitle}
        </Text>
        <Text
          onPress={!props.isPrintDisabled ? props.onPressSeeDetails : () => {}}
          style={{
            color: props.isPrintDisabled ? Colors.gray_50 : Colors.app_green,
            fontSize: hp(1.5),
            fontWeight: '400',
            marginTop: 2,
          }}
        >
          {translate('see_details')}
        </Text>
      </View>
      <View>
        <PrintItemView
          isDisabled={props.isPrintDisabled}
          onPress={props.onPressPrintForm}
          key={'print-1'}
          title={translate(props.printActionTitle)}
        />
      </View>
    </View>
  );
};

export default PrintFormRow;
