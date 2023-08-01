import { IconEmpty } from '@assets/images';
import { translate } from '@screens/transactionDetailETB/assets/translations/translate';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from 'src/common/utils/Colors';


export function EmptyDebitCardSubSection() {
  
  return (
    <View style={Styles.subSectionStyle}>
      <IconEmpty style={Styles.emptyIcon}/>
        <Text style={Styles.textEmpty}>{translate('no_physical_debit_card')}</Text>
      </View> 
  );
}

const Styles = StyleSheet.create({

  subSectionStyle: {alignSelf:'center',padding:10},
  emptyIcon:{alignSelf:'center',margin:5},
  textEmpty: {color:Colors.dark_grey_border,fontSize:18},
});
