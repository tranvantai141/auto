import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '@components/loaders/ActivityIndicator';
import Colors from 'src/common/utils/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP } from '@assets/sizes/Sizes';
import { IconPrintWhite } from '@assets/images';

type Props = {
  buttonText?: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

const GradientButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={{ width: widthPercentageToDP(40), alignSelf: 'center' }}
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#5FB621', '#008047']}
        style={[styles.container]}
      >
        <IconPrintWhite style={styles.iconStyle}/>
        {props?.isLoading ? (
          <Loader color={Colors?.white} style={styles.loaderStyle} />
        ) : (
          <Text style={[styles.btnLogin]}>{props.buttonText}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnLogin: {
    color: 'white',
    fontWeight: '600',
    fontSize: hp(1.8),
  },
  iconStyle: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
    tintColor: 'white',
  },
  loaderStyle: {
    margin: 0,
  },
});
export default GradientButton;
