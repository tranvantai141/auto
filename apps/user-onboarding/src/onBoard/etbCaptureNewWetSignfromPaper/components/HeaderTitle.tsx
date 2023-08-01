import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, StyleProp, ViewStyle } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/translations/translate';
import CancelModal from '@components/modals/CancelModal';
import { BackIconWhite, IconBack } from '@assets/images';

type Props = {
  onPress?: () => void;
  title?: string;
  testId?: string;
  color?: string;
  header_style?: StyleProp<ViewStyle>;
  onPressCancel?: () => void;
  rightHeading?: boolean;
  navigation?: any;
  transaction_id?: string;
};

const HeaderTitle = (props: Props) => {
  const [cancel, setCancel] = useState(false);
  return (
    <View style={styles.heading}>
      <TouchableOpacity
        style={styles.leftHeading}
        testID={TestIds.back_button + props.testId}
        onPress={props?.onPress}
      >
        {props?.color ? (
          <BackIconWhite style={styles.backArrow} />
        ) : (
          <IconBack style={styles.backArrow} />
        )}
        <Text style={props?.color ? styles.backTextDisable : styles.backText}>{props?.title}</Text>
      </TouchableOpacity>
      {props.transaction_id && (
        <View>
          <Text style={styles.centerHeading}>{props?.transaction_id}</Text>
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
            <Text style={styles.cancelText}>{translate('cancel_registration')}</Text>
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
    // borderColor: '#FFFFFF',
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
    color: '#FFFFFF',
  },
  leftHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerHeading: {
    fontSize: hp(1.35),
    fontWeight: '400',
    color: Color.white,
  },
  rightHeading: {},
  cancelButton: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FFFFFF',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: '#FFFFFF',
  },
});
export default HeaderTitle;
