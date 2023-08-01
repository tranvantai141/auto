import React, { useState } from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Color from '../../utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../../utils/translations/translate';
import { TestIds } from 'src/common/utils/TestIds';
import { GreyIconBack, IconArrowRight, IconBack } from '@assets/images';
import CancelModal from '@components/modals/CancelModal';

type Props = {
  onPress?: () => void;
  percentage?: string;
  onclickRightIcon?: () => void;
  testId?: string;
  cancel_registration?: boolean;
  title?: string;
  right_heading?: string;
  rightViewStyle?: StyleProp<ViewStyle>;
  mainViewStyle?: StyleProp<ViewStyle>;
  transaction_id?: string;
  onPressCancel?: (e: string) => void;
  navigation?: any;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const OnboardingProgressbar = (props: Props) => {
  const [cancel, setCancel] = useState(false);
  return (
    <View style={[styles.heading, props?.style]}>
      {props.onPress ? (
        <View>
          <TouchableOpacity
            style={styles.leftHeading}
            testID={TestIds.back_button + props?.testId}
            onPress={props.onPress}
            disabled={props?.disabled ?? false}
          >
            {/* <Image source={Images.back_arrow} style={styles.backArrowStyle} resizeMode={'contain'}  /> */}
            <IconBack style={styles.backArrow} />
            <Text style={styles.backText}>{translate('come_back')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.leftHeading}>
          <TouchableOpacity
            style={styles.backBtnView}
            testID={TestIds.back_button + props?.testId}
            onPress={props.onPress}
            disabled={props?.disabled ?? false}
          >
            <GreyIconBack style={styles.backArrow} />
            <Text style={styles.backTextDisable}>{translate('come_back')}</Text>
          </TouchableOpacity>
        </View>
      )}
      {props.transaction_id && (
        <View>
          <Text style={styles.centerHeading}>{props?.transaction_id}</Text>
        </View>
      )}
      {!props?.cancel_registration && (
        <View style={styles.barStyle}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                width: props?.percentage || '10%',
              },
              styles.filledBar,
            ]}
          />
        </View>
      )}
      {props?.title && <Text style={styles.titleStyle}>{props.title}</Text>}
      {props?.onclickRightIcon && (
        <TouchableOpacity
          style={[styles.cancelButton]}
          onPress={() => {
            setCancel(true);
          }}
        >
          {props?.cancel_registration ? (
            <Text style={styles.cancelText}>
              {props?.right_heading ? props.right_heading : translate('cancel_registration')}
            </Text>
          ) : (
            <IconArrowRight style={styles.rightArrowStyle} />
          )}
        </TouchableOpacity>
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
  viewTop: {
    padding: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.light_grey,
    height: hp(8),
    backgroundColor: Color.white,
    justifyContent: 'space-between',
  },
  // heading: { alignSelf: 'center', color: Color.header_black, fontSize: hp(1.5), fontWeight: '500' },

  headingView: {
    alignSelf: 'center',
  },
  backBtnView: { alignItems: 'center', flexDirection: 'row' },
  backArrowStyle: {
    height: hp(2),
    width: hp(2),
  },
  back_view: { flexDirection: 'row', alignItems: 'center' },
  // backText: {
  //   fontSize: hp(1.8),
  //   marginLeft: wp(0.5),
  // },
  disableBackText: {
    fontSize: hp(1.8),
    marginLeft: wp(0.5),
    color: Color.shaded_grey,
  },
  barStyle: {
    backgroundColor: Color.light_grey,
    width: wp(55),
    alignSelf: 'center',
    height: 7,
    marginLeft: wp(4),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filledBar: {
    backgroundColor: Color.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  rightArrowStyle: {
    height: hp(4.5),
    width: hp(4.5),
  },
  rightView: {
    // right: wp(3),
    // position: 'absolute',
    alignSelf: 'center',
  },
  right_text: {
    borderWidth: 1,
    fontWeight: '600',
    borderColor: Color.header_black,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: hp(1.5),
  },
  titleStyle: {
    color: Color.neutral_gray,
    fontSize: hp(1.5),
    textAlign: 'center',
    // marginLeft: wp(5),
  },
  heading: {
    height: 64,
    marginTop: 12,
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
export default OnboardingProgressbar;

