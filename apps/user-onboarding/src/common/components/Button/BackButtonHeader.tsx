import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../../utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../../utils/translations/translate';
import { TestIds } from '../../utils/TestIds';
import { IconBack } from '@assets/images';

type Props = {
  onPress?: () => void;
  testId?: string;
  noHeading?: boolean;
  onPressCancel?: () => void;
  rightHeading?: boolean;
};

const BackButtonHeader = (props: Props) => {
  return (
    <View style={styles.heading}>
      <TouchableOpacity
        style={styles.leftHeading}
        testID={TestIds.back_button + props?.testId}
        onPress={props.onPress}
      >
        <IconBack style={styles.backArrow} />
        <Text style={styles.backText}>{translate('come_back')}</Text>
      </TouchableOpacity>
      {!props.noHeading && (
        <View>
          <Text style={styles.centerHeading}>{translate('check_for_existence')}</Text>
        </View>
      )}
      {props.rightHeading && (
        <View style={styles.rightHeading}>
          <TouchableOpacity style={styles.cancelButton} onPress={props.onPressCancel}>
            <Text style={styles.cancelText}>{translate('cancel_registration')}</Text>
          </TouchableOpacity>
        </View>
      )}
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
  backTextDisable: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    color: '#B5B5B5',
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
export default BackButtonHeader;
