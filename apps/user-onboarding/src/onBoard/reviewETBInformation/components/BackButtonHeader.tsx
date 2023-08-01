import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import CancelModal from '@components/modals/CancelModal';
import { IconBack } from '@assets/images';

type Props = {
  onPress?: () => void;
  testId?: string;
  noHeading?: boolean;
  onPressCancel?: () => void;
  rightHeading?: boolean;
  transactionId?: string;
  rightHeadingText?: string;
  navigation?: any;
};

const BackButtonHeaderForReview = (props: Props) => {
  const [cancel, setCancel] = useState(false);
  return (
    <View style={styles.heading}>
      <TouchableOpacity style={styles.leftHeading} onPress={props.onPress}>
        <IconBack style={styles.backArrow} />
        <Text style={styles.backText}>{translate('come_back')}</Text>
      </TouchableOpacity>

      {!props.noHeading && (
        <View>
          <Text style={styles.centerHeading}>{props?.transactionId}</Text>
        </View>
      )}
      {props.rightHeading && (
        <View style={styles.rightHeading}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setCancel(true);
              props.onPressCancel;
            }}
          >
            <Text style={styles.cancelText}>{props.rightHeadingText}</Text>
          </TouchableOpacity>
        </View>
      )}
      <CancelModal
        visible={cancel}
        closeModal={() => setCancel(false)}
        setVisible={setCancel}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    // borderColor: '#000000',
    // borderWidth: 1,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    color: '#1B1B1B',
  },
  leftHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1B1B1B',
  },
  rightHeading: {},
  cancelButton: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#1B1B1B',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: '#1B1B1B',
  },
});
export default BackButtonHeaderForReview;
