import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { StyleSheet } from 'react-native';
import Colors from '../assets/Colors';
import Color from 'src/common/utils/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark_grey,
  },
  mainView: {
    margin: hp(4),
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: hp(3),
    fontWeight: '500',
    color: Colors.black,
  },
  text: {
    textAlign: 'center',
    marginTop: hp(2),
    color:Colors.grey_medium,
    fontSize:hp(1.5)
  },
  text2: {
    textAlign: 'center',
    marginTop: hp(0.5),
    color:Colors.grey_medium,
    fontSize:hp(1.5)
  },
  resendOtpStyle: {
    color: Colors.green,
    marginTop: hp(3),
  },
  otpView: {
    margin: hp(2),
  },
  error: {
    color: Colors.red,
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: hp(4.8),
    height: hp(4.8),
    lineHeight: 40,
    fontSize: 24,
    textAlign: 'center',
    overflow: 'hidden',
    margin: 8,
    borderRadius: 12,
    backgroundColor: Colors.white,
    color: Colors.black,
    alignItems: 'center',
    padding: hp(0.5),
    justifyContent:'center'
  },
  focusCell: {
    borderColor: Colors.green,
    borderWidth:1,
    color: Colors.green,
    borderRadius:12
  },
  loading: {
    position: 'absolute',
    opacity: 0.3,
    backgroundColor: Colors.app_black,
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: Color.black_transparent,
    flex: 1,
    margin: 0,
  },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: hp(3),
    paddingVertical: hp(2),
    justifyContent: 'center',
  },
  info_text: {
    marginTop: hp(2),
    textAlign: 'center',
    color: Color.black,
    fontSize: 18,
    width: wp(40),
    fontWeight: 'normal',
  },
  image_icon: { height: hp(4.5), width: hp(4.5), alignSelf: 'center' },
  button_box: { justifyContent: 'space-between', width: wp(20) },
});
