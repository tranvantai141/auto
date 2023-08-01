import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TestIds } from 'src/common/utils/TestIds';
import Loader from '@components/loaders/ActivityIndicator';
import Colors from 'src/common/utils/Colors';
import { IconArrowRight, IconHome } from '@assets/images';
import { widthPercentageToDP as wp } from '@assets/sizes/Sizes';

type Props = {
  buttonText?: string;
  onPress?: () => void;
  testIdValue?: string;
  disabled?: boolean;
  toggleView?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  icon?: boolean;
  textStyle?: StyleProp<TextStyle>;
  useDisableColors?: boolean;
  isLoading?: boolean;
  right_icon?: boolean;
  headingStyle?: StyleProp<TextStyle>;
  buttonDisableStyle?:StyleProp<ViewStyle>
};

const GradientButton = (props: Props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      testID={TestIds.gradient_button + props.testIdValue}
      onPress={props.onPress}
    >
      {props?.useDisableColors ? (
        <TouchableOpacity
          activeOpacity={1.0}
          style={[styles.loginBtn, props?.buttonStyle, { backgroundColor: Colors?.border_grey }, props.buttonDisableStyle]}
        >
          <Text style={[styles.btnLogin, props?.textStyle]}>{props.buttonText}</Text>
          {props?.right_icon && <IconArrowRight width={wp('3')} height={wp('3')} />}
        </TouchableOpacity>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={!props.disabled ? ['#5FB621', '#008047'] : ["#B5B5B5", "#B5B5B5"]}
          style={[styles.loginBtn, props?.buttonStyle]}
        >
          {props.icon && <IconHome style={styles.iconStyle} width={wp('3')} height={wp('3')}/>}
          {props?.isLoading ? (
            <Loader color={Colors?.white} style={styles.loaderStyle} />
          ) : (
            <Text style={[styles.btnLogin, props?.textStyle, props?.right_icon && { marginRight: 10 } || {}]}>{props.buttonText}</Text>
          )}

          {props?.right_icon && <IconArrowRight width={wp('3')} height={wp('3')} />}
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  iconStyle: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
  },
  loaderStyle: {
    margin: 0,
  },
});
export default GradientButton;
