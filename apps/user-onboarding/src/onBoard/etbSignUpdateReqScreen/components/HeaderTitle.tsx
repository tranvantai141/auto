import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, StyleProp, ViewStyle } from 'react-native';
import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
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
  backButtonTitle: string;
  navigation?: any;
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
        <Text style={styles.backText}>{props?.backButtonTitle}</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.centerHeading}>{props?.title}</Text>
      </View>
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
export default HeaderTitle;
