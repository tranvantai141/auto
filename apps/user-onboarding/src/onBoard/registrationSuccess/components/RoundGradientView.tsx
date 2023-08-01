import React from 'react';
import { StyleSheet, Text, StyleProp, ViewStyle, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../assets/Colors';
import Images from '../assets/Images';

type Props = {
  buttonText?: string;
  testIdValue?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  icon?: boolean;
};

const RoundGradientView = (props: Props) => {
  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#5FB621', '#008047']}
        style={[styles.loginBtn, props?.buttonStyle]}
      >
        {props.icon && <Image resizeMode="contain" source={Images.tick} style={styles.iconStyle} />}
        <Text style={styles.btnLogin}>{props.buttonText}</Text>
      </LinearGradient>
    </View>
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
    color: Colors.white,
    fontWeight: 'normal',
    fontSize: 18,
  },
  iconStyle: {
    height: 25,
    width: 25,
  },
});
export default RoundGradientView;
