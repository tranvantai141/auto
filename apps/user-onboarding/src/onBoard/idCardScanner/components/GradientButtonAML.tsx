import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { TestIds } from "src/common/utils/TestIds";
import Loader from "@components/loaders/ActivityIndicator";
import Colors from "src/common/utils/Colors";
import {
  heightPercentageToDP as hp,
} from "@assets/sizes/Sizes";
import { IconArrowRight, IconHome } from '@assets/images';

type Props = {
  buttonText1?: string;
  buttonText2?: string;
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
};

const GradientButtonAML = (props: Props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      testID={TestIds.gradient_button + props.testIdValue}
      onPress={props.onPress}
    >
      {props?.useDisableColors ? (
        <TouchableOpacity
          activeOpacity={1.0}
          style={[
            styles.loginBtn,
            props?.buttonStyle,
            { backgroundColor: Colors?.border_grey },
          ]}
        >
          <Text style={[styles.btnLogin, props?.textStyle]}>
            {props.buttonText1}
          </Text>
        </TouchableOpacity>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#5FB621", "#008047"]}
          style={[styles.loginBtn, props?.buttonStyle]}
        >
          {props.icon && (
            <IconHome  style={styles.iconStyle}/>
          )}
          {props?.isLoading ? (
            <Loader color={Colors?.white} style={styles.loaderStyle} />
          ) : (
            <View style={{ padding: 6, margin: 0 }}>
              <Text style={[styles.btnLogin, props?.textStyle]}>
                {props.buttonText1}
              </Text>
              <Text style={[styles.buttonText2, props?.textStyle]}>
                {props.buttonText2}
              </Text>
            </View>
          )}
          {props?.right_icon && (
            <IconArrowRight style={styles.iconStyle}/>
          )}
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    marginTop: 8,
    padding:5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnLogin: {
    color: "white",
    fontWeight: "500",
    fontSize: hp(1.9),
    textAlign: "center",
  },
  buttonText2: {
    color: "white",
    fontWeight: "normal",
    fontSize: hp(1.3),
    textAlign: "center",
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
export default GradientButtonAML;
