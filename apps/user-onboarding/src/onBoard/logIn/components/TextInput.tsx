import { IconEyeHide, IconEyeShow, IconPassword } from '@assets/images';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  ImageSourcePropType,
} from 'react-native';
import Color from '../assets/Colors';

type Props = {
  secureTextEntry?: any;
  // sourceUser?: ImageSourcePropType;
  placeholder: string;
  onChangeText?: (text: string) => void;
  textInputProps?: any;
  onPress?: () => void;
  source?: ImageSourcePropType;
  errorMessage?: string;
  testIdValue: string;
  value?: string;
  sourceCross?:ImageSourcePropType
  onPressCrossPassword?:()=>void
};

const TextInputCustom = (props: Props) => {
  return (
    <View>
      <View style={props.errorMessage ? styles.errorView : styles.mainView}>
        <View style={styles.pwdView}>
          {/* <Image source={props.sourceUser} resizeMode={'contain'} style={styles.user} /> */}
          <IconPassword style={styles.user}/>
          <TextInput
            value={props.value}
            autoCapitalize="none"
            testID={'textInputLogin' + props.testIdValue}
            secureTextEntry={props.secureTextEntry}
            placeholder={props.placeholder}
            placeholderTextColor={Color.placeholder_grey}
            style={{ ...styles.inputs, flex: 1, color: Color.app_black }}
            onChangeText={props.onChangeText}
            returnKeyType={
              props.textInputProps?.returnKeyType ? props.textInputProps.returnKeyType : 'done'
            }
          />
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={styles.backEyeView}
            onPress={props.onPressCrossPassword}
          >
            <Image source={props.sourceCross} resizeMode={'contain'} style={styles.imgEye} />
          </TouchableOpacity>
          <TouchableOpacity
            testID={'inputIcon' + props.testIdValue}
            style={styles.backEyeView}
            onPress={props.onPress}
          >
             {props.secureTextEntry? <IconEyeShow style={styles.imgEye} /> :  <IconEyeHide style={styles.imgEye}/>}
          </TouchableOpacity>
          </View>
         
        </View>
      </View>
      {props.errorMessage !== undefined && props.errorMessage.trim().length > 0 && (
        <Text style={styles.error}>{props.errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    fontSize: 16,
    marginLeft: 5,
  },
  backEyeView: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginRight: 10,
    height: 30,
    width: 30,
  },
  imgEye: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  pwdView: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
  },
  mainView: {
    borderColor: Color.light_grey,
    borderWidth: 1,
    marginTop: '5%',
    borderRadius: 12,
    backgroundColor: Color.light_grey,
    height: hp(6.3),
  },
  errorView: {
    borderColor: Color.error_red,
    borderWidth: 1,
    marginTop: '5%',
    borderRadius: 12,
    backgroundColor: Color.light_grey,
    height: hp(6.3),
  },
  user: {
    height: hp(4),
    width: hp(4),
    alignSelf: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  error: {
    fontSize: hp(1.8),
    color: Color.error_red,
    marginLeft: 5,
    marginTop: hp(1),
  },
});
export default TextInputCustom;