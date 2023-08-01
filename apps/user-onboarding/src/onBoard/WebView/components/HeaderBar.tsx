import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, StyleProp, ViewStyle } from 'react-native';
import CancelModal from '@components/modals/CancelModal';
import { BackIconWhite, GreyIconBack, IconBack } from '@assets/images';
import { TestIds } from 'src/common/utils/TestIds';
import { translate } from 'src/common/utils/translations/translate';

type Props = {
  title?: string;
  testId?: string;
  leftText?: string;
  centerText?: string;
  rightText?: string;
  isDisableLeft?: boolean;
  isDisableRight?: boolean;
  isHiddenLeft?: boolean;
  isHiddenRight?: boolean;
  isBlackBackground?: boolean;
  navigation?: any;
  onPressBack?: () => void;
  onPressCancel?: () => void;
  styles?: StyleProp<ViewStyle>;
};

const HeaderBar = (props: Props) => {
  const [cancel, setCancel] = useState(false);
  return (
    <View style={styles.wrapperHeader}>
      <View
        style={[
          props?.isBlackBackground || (props?.title && props?.title.length > 0)
            ? styles.headingWhite
            : styles.heading,
          props?.styles,
        ]}
      >
        <TouchableOpacity
          style={styles.leftHeading}
          testID={TestIds.back_button + props.testId}
          onPress={props?.onPressBack}
        >
          {props?.isBlackBackground && !props?.isDisableLeft && (
            <BackIconWhite style={styles.backArrow} />
          )}
          {!props?.isBlackBackground && props?.isDisableLeft && (
            <GreyIconBack style={styles.backArrow} />
          )}
          {!props?.isBlackBackground && !props?.isDisableLeft && (
            <IconBack style={styles.backArrow} />
          )}
          {props?.isBlackBackground ? (
            <Text style={styles.backTextWhite}>
              {props?.leftText && props?.leftText.length > 0
                ? props?.leftText
                : translate('come_back')}
            </Text>
          ) : (
            <Text style={props?.isDisableLeft ? styles.backTextDisable : styles.backText}>
              {props?.leftText && props?.leftText.length > 0
                ? props?.leftText
                : translate('come_back')}
            </Text>
          )}
        </TouchableOpacity>
        {props?.centerText && props?.centerText.length > 0 && (
          <View>
            <Text
              style={props?.isBlackBackground ? styles.centerHeadingWhite : styles.centerHeading}
            >
              {props?.centerText}
            </Text>
          </View>
        )}
        {!props?.isHiddenRight && (
          <View style={styles.rightHeading}>
            <TouchableOpacity
              style={props?.isBlackBackground ? styles.cancelButtonWhite : styles.cancelButton}
              onPress={() => {
                setCancel(true);
                props?.onPressCancel;
              }}
            >
              <Text style={props?.isBlackBackground ? styles.cancelTextWhite : styles.cancelText}>
                {props?.rightText && props?.rightText.length > 0
                  ? props?.rightText
                  : translate('cancel_registration')}
              </Text>
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
      {props?.title && props?.title.length > 0 && (
        <View>
          <Text style={styles.title}>{props?.title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperHeader: {
    // width: '100%',
    // position: 'absolute',
    // top: 0,
  },
  heading: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    // borderColor: '#000000',
    // borderColor: '#FFFFFF',
    // borderWidth: 1,
  },
  headingWhite: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1B1B1B',
    paddingHorizontal: 24,
    marginBottom: 16,
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
  backTextWhite: {
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
    fontSize: 16,
    fontWeight: '400',
    color: '#1B1B1B',
  },
  centerHeadingWhite: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  rightHeading: {},
  cancelButton: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#1B1B1B',
  },
  cancelButtonWhite: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FFFFFF',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: '#1B1B1B',
  },
  cancelTextWhite: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: '#FFFFFF',
  },
});

export default HeaderBar;
