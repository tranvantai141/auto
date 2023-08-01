import Color from '../assets/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  isVisible?: boolean;
  onBackDropPress?: () => void;
  notify_text_id?: string;
  indicator_id?: string;
};

const CheckInformation = (props: Props) => {
  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <View style={Styles.modal_view}>
        <ActivityIndicator testID={props?.indicator_id} color={Color.primary} size={'large'} />
          <Text testID={props?.notify_text_id} numberOfLines={2} style={Styles.info_text}>
            {translate('check_information')}
          </Text>
     </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  
 
  modal: {
    backgroundColor: Color.grey_transparent,
    flex: 1,
    margin: 0,
  },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: hp(4.5),
    paddingVertical: hp(2),
    justifyContent: 'center',
  },
  info_text: {
    marginTop: hp(2),
    textAlign: 'center',
    color: Color.app_black,
    fontSize: 20,
    fontWeight: '600',
  },
 
});
export default CheckInformation;
