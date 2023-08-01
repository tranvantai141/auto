import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { IconDocumentBlack } from '@assets/images';
import PrintItemView from './PrintItemView';
import { translate } from '../assets/translations/translate';

interface IPrintFormRow {
  rowTitle: string;
  onPressPrintForm: () => void;
  isPrintDisabled: boolean;
  isProcessingError?: boolean;
  onPressDocIcon: () => void;
  isFormLoading?:boolean
}
const PrintFormRow = (props: IPrintFormRow) => {
  const { isProcessingError, onPressDocIcon } = props;
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomColor: Colors.light_grey,
        borderBottomWidth: 1,
      }}
    >
      <TouchableOpacity
        onPress={onPressDocIcon}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <IconDocumentBlack />
      </TouchableOpacity>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text
          style={{
            color: Colors.black,
            fontSize: hp(1.4),
            fontWeight: '400',
          }}
        >
          {props?.rowTitle}
        </Text>
        {isProcessingError && (
          <Text style={{ color: Colors.error_red, fontSize: hp(1.4), marginTop: 10 }}>
            {translate('processing_error')}
          </Text>
        )}
      </View>
      <View>
        <PrintItemView isFormLoading={props?.isFormLoading} onPress={props.onPressPrintForm} />
      </View>
    </View>
  );
};

export default PrintFormRow;
